'use strict';
/*
 * Author: Woshikuzzaman Anik
 * Purpose:
 *  1. Server bootstart file. Server configuration start from here.
 * File Create: 16-07-2020
 * Last Modified: 16-07-2020
 * Edit Permission: Don't edit this file without author permission.
 */

const { resolve } = require('path');

// load production env file
const path = resolve(process.cwd(), `.env.${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}`);

require('dotenv').config({ path });

const http = require('http');
const https = require('https');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { fileLogger, consoleLogger } = require('./utils/serverErrorLogger');
const { connectWithMogodb } = require('./database/connection');

const app = express();

// node js process error handle
process.on('uncaughtException', (error) => {
  consoleLogger(error);

  fileLogger.error({
    server: 'global',
    label: 'uncaughtException',
    message: error,
  });

  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  consoleLogger(error);

  fileLogger.error({
    server: 'global',
    label: 'unhandledRejection',
    message: error,
  });
});

// enable cors for server, Access-Control-Allow-Origin: *
app.use(cors());

// important express middleware
app.use(helmet());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// api routing
app.use('/api', require('./routes/api')(require('./url_conf/apiRule'), __dirname));

// 404 route not found
app.use((req, res) => res.sendStatus(404));

// error handle
app.use((error, req, res) => {
  consoleLogger(error);

  fileLogger.error({ server: 'global', label: error.label, message: error.info });

  res.sendStatus(500);
});

// connect with database client and start server
connectWithMogodb()
  .then(() => {
    if (process.env.NODE_ENV === 'production') {
      https
        .createServer(
          {
            key: readFileSync(process.env.SSL_PRIVATE_KEY, 'utf8'),
            cert: readFileSync(process.env.SSL_CERT_LOCATION, 'utf8'),
            ca: readFileSync(process.env.SSL_CHAIN, 'utf8'),
          },
          app
        )
        .listen(process.env.PORT, () => console.log(`app is runing https server on port ${process.env.PORT}`));
    } else {
      http
        .createServer(app)
        .listen(process.env.PORT, () => console.log(`app is runing http server on port ${process.env.PORT}`));
    }
  })
  .catch((error) => {
    consoleLogger(error);

    fileLogger.error({
      server: 'global',
      label: 'database error',
      message: error,
    });
  });

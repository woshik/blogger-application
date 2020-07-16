'use strict';

const winstonDailyRotateFile = require('winston-daily-rotate-file');
const { createLogger, format } = require('winston');
const { resolve } = require('path');

// use for production
exports.fileLogger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.align(),
    format.prettyPrint(),
    format.printf((info) => `${info.timestamp} ${info.level} ${info.server} [${info.label}] : ${info.message}`)
  ),
  transports: [
    new winstonDailyRotateFile({
      filename: resolve(__dirname, '../log/error-%DATE%.log'),
      datePattern: 'DD-MM-YYYY',
    }),
  ],
});

// use only for development server
exports.consoleLogger = (error) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(error);
  }
};

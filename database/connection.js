'use strict';

/*
 * Author: Woshikuzzaman Anik
 * Purpose:
 *  1. Server Database connection file.
 * File Create: 16-07-2020
 * Last Modified: 16-07-2020
 * Edit Permission: Don't edit this file without author permission.
 */

const MongoClient = require('mongodb').MongoClient;
const { fileLogger } = require('../utils/serverErrorLogger');

let _db = null,
  _client = null;

exports.connectWithMogodb = async () => {
  try {
    _client = await MongoClient.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      poolSize: 100,
    });
    
    _db = _client.db(process.env.DB_NAME);
  } catch (error) {
    fileLogger.error({
      server: 'global',
      label: 'connectWithMogodb',
      message: error.message,
    });
  }
};

exports.getDBClient = () => {
  if (_client) {
    return _client;
  }

  fileLogger.error({
    server: 'global',
    label: 'getDBClient',
    message: 'database client not found',
  });
};

exports.getDB = () => {
  if (_db) {
    return _db;
  }
  fileLogger.error({
    server: 'global',
    label: 'getDB',
    message: 'database found',
  });
};

'use strict';
/*
 * Author: Woshikuzzaman Anik
 * Purpose:
 *  1. Server entry point.
 *  2. Here we clustering our server.
 *  3. Call our backend service from here, which path is ./bootstrap.js
 * File Create: 16-07-2020
 * Last Modified: 16-07-2020
 * Edit Permission: Don't edit this file without author permission.
 */

const cluster = require('cluster');

if (cluster.isMaster && process.env.NODE_ENV === 'production') {
  let cpu_num = require('os').cpus().length;
  for (let i = 0; i < cpu_num; i++) {
    cluster.fork();
  }

  cluster.on('exit', () => {
    cluster.fork();
  });
} else {
  require('./bootstrap.js');
}

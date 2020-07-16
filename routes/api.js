'use strict';
/*
 * Author: Woshikuzzaman Anik
 * Purpose:
 *  1. API rount method.
 * File Create: 29-04-2020
 * Last Modified: 29-04-2020
 * Edit Permission: Extremely Prohibited.
 */

const express = require('express');
const router = express.Router();

module.exports = (api, appDIR) => {
  Object.entries(api).forEach(([routeName, routeInfo]) => {
    Object.entries(routeInfo.methods).forEach(([method, httpVerb]) => {
      let middleware = routeInfo.middleware || [];
      let path = routeInfo.path || '';
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ///											                                Route Debug Method 													 			                                  //
      ///console.log( routeName, routeInfo.url, middleware, require(`${appDIR}/application/controller/${path}/${routeInfo.controller}`)[method] )//
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      router[httpVerb](
        routeInfo.url,
        middleware,
        require(`${appDIR}/application/controller/${path}/${routeInfo.controller}`)[method]
      );
    });
  });

  return router;
};

'use strict';
/*
 * Author: Woshikuzzaman Anik
 * Purpose:
 *  1. API route configuration file.
 * File Create: 16-07-2020
 * Last Modified: 16-07-2020
 * Edit Permission: permission to add or remove urls.
 */

module.exports = {
  bloggerRegistration: {
    url: '/blogger/registration',
    controller: 'registration',
    methods: {
      registration: 'post',
    },
    path: 'blogger',
  },

  commenterRegistration: {
    url: '/commenter/registration',
    controller: 'registration',
    methods: {
      registration: 'post',
    },
    path: 'commenter',
  },
};

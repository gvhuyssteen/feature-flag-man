'use strict';

const boom = require('boom');
const nano = require('nano')('http://192.168.99.100:5984');
const db = nano.db.use('flags');

module.exports = function (request, reply) {

  // TODO: list out all the flags for authenticated user
  
};
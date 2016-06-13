'use strict';

const joi = require('joi');

module.exports = {
  auth: 'api',
  handler: require('./handler')
};
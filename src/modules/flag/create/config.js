'use strict';

const joi = require('joi');

module.exports = {
  auth: 'api',
  handler: require('./handler'),
  validate: {
    payload: {
      flag_name: joi.string().required(),
      flag_description: joi.string().required()
    }
  }
};
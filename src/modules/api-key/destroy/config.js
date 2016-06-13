'use strict';

const joi = require('joi');

module.exports = {
  auth: 'jwt',
  handler: require('./handler'),
  validate: {
    payload: {
      api_key: joi.string().required()
    }
  }
};
'use strict';

const joi = require('joi');

module.exports = {
  auth: 'jwt',
  handler: require('./handler'),
  validate: {
    payload: {
      key_name: joi.string().required()
    }
  }
};
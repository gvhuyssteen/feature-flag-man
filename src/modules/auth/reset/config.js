'use strict';

const joi = require('joi');

module.exports = {
  auth: false,
  handler: require('./handler'),
  validate: {
    payload: {
      email: joi.string().email().required()
    }
  }
};
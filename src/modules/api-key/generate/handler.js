'use strict';

const boom = require('boom');
const hat = require('hat');
const nano = require('nano')('http://192.168.99.100:5984');
const db = nano.db.use('api_keys');

module.exports = function (request, reply) {

  var key_name = request.payload.key_name;
  var apiKey = hat();

  var newApiKey = {
    "_id": apiKey,
    "api_key": apiKey,
    "name": key_name,
    "user_id": request.auth.credentials._id
  };

  db.insert(newApiKey, function(err, body) {
    if(!err)
      return reply({
        'statusCode': 201,
        'message': 'Api key have been created.',
        'data': {
          'api-key': body.id
        }
      });
    else
      return reply(boom.badRequest('Could not create api key.'));
  });

};
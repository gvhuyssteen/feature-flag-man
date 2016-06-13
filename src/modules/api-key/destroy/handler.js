'use strict';

const boom = require('boom');
const nano = require('nano')('http://192.168.99.100:5984');
const db = nano.db.use('api_keys');

module.exports = function (request, reply) {

  var api_key = request.payload.api_key;

  db.get(api_key, null, function (err, body) {

    if(!err) {

      db.destroy(body._id, body._rev, function(err, body) {
        if (!err)
          return reply({
            'statusCode': 200,
            'message': 'Api key have been deleted.'
          });
        else
          return reply(boom.badRequest('Could not delete api key.'));
      });

    } else {
      return reply(boom.badRequest('Could not delete api key.'));
    }

  });

};
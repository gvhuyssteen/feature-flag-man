'use strict';

const boom = require('boom');
const nano = require('nano')('http://192.168.99.100:5984');
const db = nano.db.use('_users');

module.exports = function (request, reply) {
  var email = request.payload.email;
  var password = request.payload.password;

  db.get('org.couchdb.user:' + email, null, function (err, body) {

    if (err) {

      var newUser = {
        "_id": 'org.couchdb.user:' + email,
        "name": email,
        "type": "user",
        "roles": [],
        "password": password
      };

      db.insert(newUser, function(err, body) {
        if(!err)
          return reply({'statusCode': 201, 'message': 'User have been created.'});
        else
          return reply(boom.badRequest('Could not create user.'));
      });

    } else {

      return reply(boom.conflict('That email address have already been registered.'));

    }

  });

};
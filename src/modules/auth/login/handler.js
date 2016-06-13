'use strict';

const jwt = require('jsonwebtoken');
const boom = require('boom');
const nano = require('nano')('http://192.168.99.100:5984');
const db = nano.db.use('_users');

module.exports = function (request, reply) {
  var email = request.payload.email;
  var password = request.payload.password;

  db.get('org.couchdb.user:' + email, null, function (err, body) {

    if (err) {

      reply(boom.notFound('Email address or password is incorrect'));

    } else {

      var object = {
        '_id': body._id,
        'name': body.name,
        'type': body.type,
        'roles': body.roles
      };

      var token = jwt.sign(object, 'secretkey');

      return reply({'token': token});

    }

  });

};
'use strict';

const boom = require('boom');
const mailer = require('../../../services/mailer');
const nano = require('nano')('http://192.168.99.100:5984');
const db = nano.db.use('_users');

module.exports = function (request, reply) {
  var email = request.payload.email;

  db.get('org.couchdb.user:' + email, null, function (err, body) {

    if (!err) {

      mailer.send('john@doe.com', 'Reset link', 'Please click on the link to reset your password.');
      // TODO: Include reset link
      // TODO: Create endpoint where the user can set new password
      return reply({'statusCode': 201, 'message': 'A reset link have been sent to your email address.'});

    } else {

      return reply(boom.notFound('Your email address could not be found.'));

    }

  });

};
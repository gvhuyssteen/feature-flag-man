'use strict';

const boom = require('boom');
const nano = require('nano')('http://192.168.99.100:5984');
const db = nano.db.use('flags');

module.exports = function (request, reply) {
  var flag_name = request.payload.flag_name.replace(/[&\/\\#,+()!@$~%.'":*?<>{}]/g, '')
    .trim()
    .replace(/ /g,"_")
    .toLowerCase();
  var flag_description = request.payload.flag_description;

  db.get(request.auth.credentials.name + '_' + flag_name, null, function (err, body) {

    if (err) {

      var newFlag = {
        "_id": request.auth.credentials.name + '_' + flag_name,
        "name": flag_name,
        "description": flag_description,
        "user_id": request.auth.credentials.id,
        "status": {
          "production": false,
          "development": false,
          "staging": false
        }
      };

      db.insert(newFlag, function(err, body) {
        if(!err)
          return reply({'statusCode': 201, 'message': 'Flag have been created.'});
        else
          return reply(boom.badRequest('Could not create flag.'));
      });

    } else {

      return reply(boom.conflict('That flag already exists.'));

    }

  });

};
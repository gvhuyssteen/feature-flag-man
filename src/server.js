'use strict';

const hapi = require('hapi');
const boom = require('boom');
const routes = require('./routes');
const nano = require('nano')('http://192.168.99.100:5984');
const db = nano.db.use('_users');
const db_api = nano.db.use('api_keys');

function validateJWT (decoded, request, callback) {

  db.get('org.couchdb.user:' + decoded.name, null, function (err, body) {
    if(err)
      return callback(null, false);
    else
      return callback(null, true, body);
  });

}

function createServer() {

  var server = new hapi.Server();

  server.connection({
    port: 8080
  });

  server.register(require('hapi-auth-jwt2'), function (err) {
  
    if(err){
      console.log(err);
    }
  
    server.auth.strategy('jwt', 'jwt',
      // TODO: Set key environment variable
      { key: 'secretkey',
        validateFunc: validateJWT,
        verifyOptions: { algorithms: [ 'HS256' ] }
      });

    server.auth.scheme("api", function (server, options) {
      return {
        authenticate: function (request, reply) {

          if(typeof request.headers.authorization === 'undefined') {
            reply(boom.unauthorized('Authorization header is not found.'));
          }

          db_api.get(request.headers.authorization, null, function (err, body) {

            if(!err) {

              db.get(body.user_id, null, function (err, body) {
                reply.continue({ credentials: body });
              });

            } else {
              reply(boom.unauthorized('Authorization header is incorrect.'));
            }

          });

        }
      };
    });

    server.auth.strategy('api', 'api', { validateFunc: function() {} });

    server.auth.default('jwt');
  
    server.route(routes);

  });

  return server;

}

module.exports = {
  createServer: createServer
};
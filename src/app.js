'use strict';

const server = require('./server.js').createServer();

server.start(function (error) {
  if (error) {
    throw error;
  }
  console.log('Server running at:', server.info.uri);
});
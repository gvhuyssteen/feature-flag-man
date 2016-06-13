'use strict';

var Server = require('./../../src/server.js').createServer();

// var HomeHandler = require("../../src/modules/home/handler");

describe("Home Route", function () {

  describe('Health Check', function () {
    it("responds with status code 200",
      function(done) {
        var options = { method: "GET", url: "/" };
        Server.inject(options, function(response) {
          expect(response.statusCode).toBe(200);
          done();
        });
      });
  });

});
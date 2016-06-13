'use strict';

var Server = require('./../../src/server.js').createServer();

// var RegisterHandler = require("../../src/modules/auth/register/handler");

describe("Register Route", function () {

  describe('Health Check', function () {
    it("responds with status code 200",
      function(done) {
        var options = { method: "POST", url: "/register" };
        Server.inject(options, function(response) {
          expect(response.statusCode).toBe(200);
          done();
        });
      });
  });

});



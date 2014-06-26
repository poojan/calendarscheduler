'use strict';

var request = require('supertest');
var server = require('../../app');

describe('Teacher API: ', function () {
  describe('GET', function () {
    it('should list teachers', function (done) {
      request(server)
        .get('/api/teacher')
        .expect(200)
        .end(done);
    });
  });
});

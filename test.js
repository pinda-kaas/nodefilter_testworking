"use strict";

var request = require('supertest');
var assert = require('assert');
var express = require('express');
var app = express();

describe('testing filter', function() {
    it('should return an error', function (done) {
        request(app)
            .post('/')
            .send({partA: 'Hello', partB: 'World'})
            .expect(400, {"error": "Could not decode request: JSON parsing failed"})
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    done();
                }
            });
    });
});
"use strict";

var request = require('supertest');
var assert = require('assert');
var app = require('./server');
var agent = request.agent(app);

describe('testing filter', function() {
    it('should return a valid response', function (done) {
        var testJson = require('./testPayload.json');
        agent.post('/')
            .send(testJson)
            .expect(200, {
                "response": [
                    {
                        "image": "http://catchup.ninemsn.com.au/img/jump-in/shows/16KidsandCounting1280.jpg",
                        "slug": "show/16kidsandcounting",
                        "title": "16 Kids and Counting"
                    }
                ]
            })
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    done();
                }
            });
    });

    it('should return an error', function (done) {
        request(app)
            .post('/')
            .send({"hh":"ss"})
            .expect(400,{"error": "Could not decode request: JSON parsing failed"})
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    done();
                }
            });
    });
});
// set up ======================================================================
var express = require('express');
var app = express();                               // create our app w/ express
var port = process.env.PORT || 8080;                // set the port
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use (function (error, req, res, next){
    res.setHeader('content-type', 'application/json');
    res.status(400);
    res.json({
        "error": "Could not decode request: JSON parsing failed"
    });

    console.log('--------------body parser error, error body/type/statuscode/arg:-----------');
    console.log(error.body);
    console.log(error.type);
    console.log(error.statusCode);
    console.log(error.arguments[0]);
    console.log('--------------end body parser error-----------');

});

// routes ======================================================================
require('./routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);

var request = require('supertest');
var assert = require('assert');

describe('testing filter', function() {

    it('should return a valid response', function (done) {
        var testJson = require('./testPayload.json');
        request(app)
            .post('/')
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
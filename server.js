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

    console.log('--------------Body parser error, error body/type/statuscode/arg:-----------');
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
console.log("App listening on porty " + port);

module.exports =app;



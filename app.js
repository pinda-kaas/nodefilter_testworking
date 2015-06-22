var app = require('./app');
var port = process.env.port || 8000;

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
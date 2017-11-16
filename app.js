var os = require('os'),
    util = require('util');

var express = require('express'),
    app = express(),
    router = express.Router(),
    server = require('http').createServer(app),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 10021;

// Database
var mongo = require('mongodb'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/qw-monitor', {
    useMongoClient: true,
});

var db = mongoose.connection;

// Routers
var route_api = require('./routes/api');
var route_html = require('./routes/api');

// Config
app.set('port', port);

app.use('/', express.static(__dirname + '/www'))
app.use('/api/gm/', route_api);

app.use(bodyParser.json())

server.listen(port, function () {
    console.log('Server started at ' + port);
})

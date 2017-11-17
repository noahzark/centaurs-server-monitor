
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

// db connection test, ref: http://mongoosejs.com/docs/api.html#connection_Connection-readyState
var db_state = ['disconnected', 'connected', 'connecting', 'disconnecting'];
console.log(`MongoDB state: ${db_state[mongoose.connection.readyState]}`);

// Routers
var route_api = require('./routes/api');
var route_html = require('./routes/api');

// Config
app.set('port', port);

app.use(bodyParser.json())

app.use('/', express.static(__dirname + '/www'));
app.use('/api/gm/', route_api);



server.listen(port, function () {
    console.log('Server started at ' + port);
})

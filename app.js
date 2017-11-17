/**
 * @file centaurs-server-monitor: main functions
 * @copyright Centaurs Technologies Co. 2017
 * @author Feliciano.Long & Zhang, Yuancheng
 * @license Unlicense
 * @module app
 */

var express = require('express'),
    app = express(),
    router = express.Router(),
    server = require('http').createServer(app),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 10021;

// database
var db = require('./services/db'),
    db_config = {
        server: 'localhost',
        port: 27017,
        db: 'qw-monitor'
    };

db.connect(db_config);

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

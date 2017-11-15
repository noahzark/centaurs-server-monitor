var os = require('os'),
    util = require('util')

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 10021

var mongo = require('mongodb'),
    mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/monitor', {
    useMongoClient: true,
});
var db = mongoose.connection;

app.set('port', port);

app.use('/', express.static(__dirname + '/www'))

app.use(bodyParser.json())

app.get('/api/gm/server', function (req, res) {

    var memUsage = util.inspect(process.memoryUsage()) + ''

    var memStrs = memUsage.split(',')

    var info = {}

    var str = memStrs[0];
    info.srv_alc = (parseInt(str.substring(str.indexOf(":") + 1)) / 1024).toFixed()
    info.srv_free = (info.srv_alc - parseInt(memStrs[2].substring(memStrs[2].indexOf(':') + 1)) / 1024).toFixed()

    info.sys_free = (os.freemem() / 1024).toFixed()
    info.sys_sum = (os.totalmem() / 1024).toFixed()

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Type", "application/json;charset=UTF-8");

    res.send(JSON.stringify(info))
})

app.post('/api/gm/server-info/', function (req, res, err) {
    try {
        if (!req.body) return res.sendStatus(400)

        var info = req.body;
        console.log(info);
        res_obj = {};
        res_obj.retcode = 0;
        res_obj.msg = "success"
        res.send(JSON.stringify(res_obj));
    } catch (err) {
        console.error(err);
        res_obj = {};
        res_obj.retcode = 1;
        res_obj.msg = "request error"
        res.send(JSON.stringify(res_obj));
    }
});

app.post('/api/gm/test-info/', function (req, res, err) {
    try {
        if (!req.body) return res.sendStatus(400)

        var info = req.body;
        console.log(info);
        res_obj = {};
        res_obj.retcode = 0;
        res_obj.msg = "success"
        res.send(JSON.stringify(res_obj));
    } catch (err) {
        console.error(err);
        res_obj = {};
        res_obj.retcode = 1;
        res_obj.msg = "request error"
        res.send(JSON.stringify(res_obj));
    }
});

server.listen(port, function () {
    console.log('Server started at ' + port);
})

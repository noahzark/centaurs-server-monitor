var os = require('os'),
    util = require('util')

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    bodyParser = require('body-parser')

app.use('/', express.static(__dirname + '/www'))

app.use(bodyParser.json())

app.get('/api/gm/server', function(req, res) {
    var memUsage = util.inspect(process.memoryUsage()) + ''
    
    var memStrs = memUsage.split(',')

    var info = {}

    var str = memStrs[0];
    info.srv_alc = (parseInt(str.substring(str.indexOf(":")+1)) / 1024).toFixed()
    info.srv_free = (info.srv_alc - parseInt(memStrs[2].substring(memStrs[2].indexOf(':')+1)) / 1024).toFixed()
    
    info.sys_free = (os.freemem()/1024).toFixed()
    info.sys_sum = (os.totalmem()/1024).toFixed()

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Type", "application/json;charset=UTF-8");

    res.send(JSON.stringify(info))
})

server.listen(80, '0.0.0.0')

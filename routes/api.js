var express = require('express');
var router = express.Router();
var LogService = require('../services/log');

router.get('/server', function (req, res) {
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

router.post('/server-info/', function (req, res, err) {
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

router.post('/test-info/', function (req, res, err) {
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

module.exports = router;

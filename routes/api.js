/**
 * @file centaurs-server-monitor: API routes
 * @copyright Centaurs Technologies Co. 2017
 * @author Feliciano.Long & Zhang, Yuancheng
 * @license Unlicense
 * @module routes/api
 */

var express = require('express'),
	router = express.Router(),
	LogService = require('../services/log'),
	os = require('os'),
	util = require('util'),
	app_check_time_list = {},	// app_name : next_time
	TIME_INTERVAL_LIMIT = 10 * 1000;		// ms


var sysCheckTime = function (time) {
	setInterval(() => {
		var now = Date.now();
		for (const app_name in app_check_time_list) {
			if (app_name && now - app_check_time_list[app_name] > TIME_INTERVAL_LIMIT) {
				console.log(`${app_name} is offline at ${app_check_time_list[app_name]}`);
			}
		}
	}, 1000);
}

sysCheckTime();

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

router.post('/server-info', function (req, res, err) {
	try {
		if (!req.body) {
			return res.sendStatus(400);
		}
		var info = req.body;
		console.log(`[Receive][Sys] ${JSON.stringify(info)}`);
		
		LogService.addSysLog(info, (err) => {
			app_check_time_list[info.app_name] = info.next_time;

			res_obj = {};
			if (err) {
				console.log(`[MongoDB][ERR] ${err}`);
			} else {
				res_obj.retcode = 0;
				res_obj.msg = "success";
				res.send(JSON.stringify(res_obj));
			}
		});

	} catch (err) {
		console.error(err);
		res_obj = {};
		res_obj.retcode = 1;
		res_obj.msg = "request error"
		res.send(JSON.stringify(res_obj));
	}
});



router.post('/test-info', function (req, res, err) {
	try {
		if (!req.body) {
			return res.sendStatus(400);
		}
		var info = req.body;
		console.log(`[Receive][Test] ${JSON.stringify(info)}`);
		LogService.addTestLog(info, (err) => {
			res_obj = {};
			if (err) {
				console.log(`[MongoDB][ERR] ${err}`);
			} else {
				res_obj.retcode = 0;
				res_obj.msg = "success";
				res.send(JSON.stringify(res_obj));
			}
		})
	} catch (err) {
		console.error(err);
		res_obj = {};
		res_obj.retcode = 1;
		res_obj.msg = "request error"
		res.send(JSON.stringify(res_obj));
	}
});

router.post('/catch-err', function (req, res, err) {
	try {
		if (!req.body) {
			return res.sendStatus(400);
		}
		var info = req.body;
		console.log(`[Receive][Err] ${JSON.stringify(info)}`);
		LogService.addErrLog(info, (err) => {
			res_obj = {};
			if (err) {
				console.log(`[MongoDB][ERR] ${err}`);
			} else {
				res_obj.retcode = 0;
				res_obj.msg = "success";
				res.send(JSON.stringify(res_obj));
			}
		});
	} catch (err) {
		console.error(err);
		res_obj = {};
		res_obj.retcode = 1;
		res_obj.msg = "request error"
		res.send(JSON.stringify(res_obj));
	}
});

module.exports = router;

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
	config = require('config'),
	app_list = [],
	app_check_time_list = {},	// app_name : next_time
	app_check_interval = 1 * 1000,			// 1 ms dev default
	time_interval_limit = 10 * 1000;		// 10 ms dev default

var EmailClient = require('../services/email'),
	mode = process.env.NODE_ENV,
	emailClient = new EmailClient(mode);

if (config.has('app_check_interval')) {
	app_check_interval = config.get('app_check_interval');
}
if (config.has('time_interval_limit')) {
	time_interval_limit = config.get('time_interval_limit');
}

var sysCheckTime = function (app_check_interval) {
	setInterval(() => {
		var now = Date.now();
		for (const app_name in app_check_time_list) {
			if (app_name && now - app_check_time_list[app_name] > time_interval_limit) {
				var time = new Date(app_check_time_list[app_name]);
				console.log(`[Send][Alert][Email] ${app_name} is offline at ${time.toString()}(${app_check_time_list[app_name]})`);
				emailClient.emailLog(`[API Server Error] ${app_name}`, `${app_name} is offline at ${time.toString()}`);
				delete app_check_time_list[app_name];
			}
		}
	}, app_check_interval);
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

router.get('/server/applist', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Content-Type", "application/json;charset=UTF-8");
	var res_obj = {};
	if (app_list.length < 1) {
		res_obj.retcode = 2;
		res_obj.msg = "app list is empty"
	} else {
		res_obj.retcode = 0;
		res_obj.msg = "success";
		res_obj.data = app_list;
	}
	res.send(JSON.stringify(res_obj));
})

router.get('/server2', (req, res) => {
	var res_obj = {},
		app_name = req.query.app_name,
		limit = req.query.limit * 1 || 10;

		console.log(app_name);
		console.log(limit);
		console.log(app_list);
	if (!app_name) {
		res_obj.retcode = 2;
		res_obj.msg = "no app name"
		res.send(JSON.stringify(res_obj));
	} else if (app_list.indexOf(app_name) < 0) {
		res_obj.retcode = 3;
		res_obj.msg = `${app_name} is not running right now`
		res.send(JSON.stringify(res_obj));
	} else {
		if (app_list.length < 1) {
			res_obj.retcode = 4;
			res_obj.msg = "app list is empty"
			res.send(JSON.stringify(res_obj));
		} else {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			res.header("Content-Type", "application/json;charset=UTF-8");
			try {
				LogService.getSysLog(app_name, limit, (err, logs) => {
					var data = []
					if (err) {
						console.log(`[MongoDB][ERR] ${err}`);
					} else {
						for (var i = 0; i < logs.length; i++) {
							var tmp = {};
							tmp.time = logs[i].createdAt;
							tmp.srv_alc = logs[i].srv_alc;
							tmp.srv_free = logs[i].srv_free;
							tmp.sys_free = logs[i].sys_free;
							tmp.sys_sum = logs[i].sys_sum;
							data.push(tmp);
						}
						res_obj.retcode = 0;
						res_obj.msg = "success";
						res_obj.data = data;
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
		}
	}
});

router.post('/server-info', function (req, res, err) {
	try {
		if (!req.body) {
			return res.sendStatus(400);
		}
		var info = req.body;
		console.log(`[Receive][Sys] ${JSON.stringify(info)}`);
		if (info.app_name && app_list.indexOf(info.app_name) < 0) {
			app_list.push(info.app_name);
		}
		LogService.addSysLog(info, (err) => {
			app_check_time_list[info.app_name] = info.next_time;
			var res_obj = {};
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
		var res_obj = {};
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
		if (info.app_name && app_list.indexOf(info.app_name) < 0) {
			app_list.push(info.app_name);
		}
		LogService.addTestLog(info, (err) => {
			var res_obj = {};
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
		var res_obj = {};
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
		if (info.app_name && app_list.indexOf(info.app_name) < 0) {
			app_list.push(info.app_name);
		}
		LogService.addErrLog(info, (err) => {
			var res_obj = {};
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
		var res_obj = {};
		res_obj.retcode = 1;
		res_obj.msg = "request error"
		res.send(JSON.stringify(res_obj));
	}
});

router.post('/api-time', function (req, res, err) {
	try {
		if (!req.body) {
			return res.sendStatus(400);
		}
		var info = req.body;
		console.log(`[Receive][Time] ${JSON.stringify(info)}`);
		if (info.app_name && app_list.indexOf(info.app_name) < 0) {
			app_list.push(info.app_name);
		}
		LogService.addUsageLog(info, (err) => {
			var res_obj = {};
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
		var res_obj = {};
		res_obj.retcode = 1;
		res_obj.msg = "request error"
		res.send(JSON.stringify(res_obj));
	}
});

module.exports = router;

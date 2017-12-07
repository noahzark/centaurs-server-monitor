/**
 * @file centaurs-server-monitor: Log services
 * @copyright Centaurs Technologies Co. 2017
 * @author Zhang, Yuancheng
 * @license Unlicense
 * @module services/log
 */

var SysLog = require('../models/syslog'),
	TestLog = require('../models/testlog'),
    ErrLog = require('../models/errlog'),
    UsageLog = require('../models/usagelog');

/**
 * add system info log into db
 * @param {Object} log - system log from route
 * @param {Function} callback 
 */
module.exports.addSysLog = function (log, callback) {
	var log_ins = new SysLog(log);	
	log_ins.save(callback);
}

/**
 * get app sys log from db
 * @param {string} app_name 
 * @param {number} limit 
 * @param {function} callback 
 */
module.exports.getSysLog = (app_name, limit, callback) => {
	if (app_name) {
		var query = { 'app_name': app_name };
		var sort = { 'createdAt': -1 };
		SysLog.find(query).sort(sort).limit(limit).exec(callback);
	}
}

/**
 * add test result log into db
 * @param {Object} log - test log from route
 * @param {Function} callback 
 */
module.exports.addTestLog = function (log, callback) {
	var log_ins = new TestLog(log);
	log_ins.save(callback);
}

/**
 * get app test log from db
 * @param {string} app_name 
 * @param {number} limit 
 * @param {function} callback 
 */
module.exports.getTestLog = (app_name, limit, callback) => {
	if (app_name) {
		var query = { 'app_name': app_name };
		var sort = { 'createdAt': -1 };
		TestLog.find(query).sort(sort).limit(limit).exec(callback);
	}
}

/**
 * add test result log into db
 * @param {Object} log - test log from route
 * @param {Function} callback 
 */
module.exports.addErrLog = function (log, callback) {
	var log_ins = new ErrLog(log);
	log_ins.save(callback);
}

/**
 * get app err log from db
 * @param {string} app_name 
 * @param {number} limit 
 * @param {function} callback 
 */
module.exports.getErrLog = (app_name, limit, callback) => {
	if (app_name) {
		var query = { 'app_name': app_name };
		var sort = { 'createdAt': -1 };
		ErrLog.find(query).sort(sort).limit(limit).exec(callback);
	}
}

/**
 * add api time usage log into db
 * @param {Object} log - test log from route
 * @param {Function} callback 
 */
module.exports.addUsageLog = function (log, callback) {
	var log_ins = new UsageLog(log);
	log_ins.save(callback);
}

/**
 * get app time usage log from db
 * @param {string} app_name 
 * @param {number} limit 
 * @param {function} callback 
 */
module.exports.getUsageLog = (app_name, limit, callback) => {
	if (app_name) {
		var query = { 'app_name': app_name };
		var sort = { 'createdAt': -1 };
		UsageLog.find(query).sort(sort).limit(limit).exec(callback);
	}
}

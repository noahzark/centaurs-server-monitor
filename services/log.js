/**
 * @file centaurs-server-monitor: Log services
 * @copyright Centaurs Technologies Co. 2017
 * @author Zhang, Yuancheng
 * @license Unlicense
 * @module services/log
 */

var SysLog = require('../models/syslog'),
	TestLog = require('../models/testlog');

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
 * add test result log into db
 * @param {Object} log - test log from route
 * @param {Function} callback 
 */
module.exports.addTestLog = function (log, callback) {
	var log_ins = new TestLog(log);
	log_ins.save(callback);
}

/**
 * @file centaurs-server-monitor: System Log Schema
 * @copyright Centaurs Technologies Co. 2017
 * @author Zhang, Yuancheng
 * @license Unlicense
 * @module models/syslog
 */

var mongoose = require('mongoose');

var SysLogSchema = mongoose.Schema({
	app_name: {
        type: String,
    },
    srv_alc: {
        type: Number
    },
    srv_free: {
        type: Number
    },
    sys_free: {
        type: Number
    },
    sys_sum: {
        type: Number
    }
}, {
    timestamps: true
});

var SysLog = module.exports = mongoose.model('SysLog', SysLogSchema);

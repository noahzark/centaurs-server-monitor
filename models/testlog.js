/**
 * @file centaurs-server-monitor: Test Log Schema
 * @copyright Centaurs Technologies Co. 2017
 * @author Zhang, Yuancheng
 * @license Unlicense
 * @module models/syslog
 */

var mongoose = require('mongoose');

var TestLogSchema = mongoose.Schema({
	app_name: {
        type: String,
    },
    retcode: {
        type: Number
    },
    msg: {
        type: String
    }
}, {
    timestamps: true
});

var TestLog = module.exports = mongoose.model('TestLog', TestLogSchema);

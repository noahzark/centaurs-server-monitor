/**
 * @file centaurs-server-monitor: Api Time Usage Log Schema
 * @copyright Centaurs Technologies Co. 2017
 * @author Zhang, Yuancheng
 * @license Unlicense
 * @module models/usagelog
 */

var mongoose = require('mongoose');

var UsageLogSchema = mongoose.Schema({
	app_name: {
        type: String
    },
    api_path: {
        type: String
    },
    time: {
        type: Number
    },
    start: {
        type: Number
    },
    stop: {
        type: Number
    }
}, {
    timestamps: true
});

var UsageLog = module.exports = mongoose.model('UsageLog', UsageLogSchema);

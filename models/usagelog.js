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
    func_name: {
        type: String
    },
    time: {
        type: String
    }
}, {
    timestamps: true
});

var UsageLog = module.exports = mongoose.model('UsageLog', UsageLogSchema);

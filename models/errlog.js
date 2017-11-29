/**
 * @file centaurs-server-monitor: Uncaught Exception Log Schema
 * @copyright Centaurs Technologies Co. 2017
 * @author Zhang, Yuancheng
 * @license Unlicense
 * @module models/syslog
 */

var mongoose = require('mongoose');

var ErrLogSchema = mongoose.Schema({
	app_name: {
        type: String,
    },
    time: {
		type: String,
	},
	err: {
		type: String,
	}
}, {
    timestamps: true
});

var ErrLog = module.exports = mongoose.model('ErrLog', ErrLogSchema);

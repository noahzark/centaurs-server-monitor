/**
 * @file centaurs-server-monitor: Uncaught Exception Log Schema
 * @copyright Centaurs Technologies Co. 2017
 * @author Zhang, Yuancheng
 * @license Unlicense
 * @module models/applist
 */

var mongoose = require('mongoose');

var ApplistSchema = mongoose.Schema({
	name: {
        type: String,
    },
    status: {
		type: String,
	}
}, {
    timestamps: true
});

var Applist = module.exports = mongoose.model('Applist', ApplistSchema);

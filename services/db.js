/**
 * @file centaurs-server-monitor: database services
 * @copyright Centaurs Technologies Co. 2017
 * @author Zhang, Yuancheng
 * @license Unlicense
 * @module services/db
 */

var mongo = require('mongodb'),
	mongoose = require('mongoose');

/**
 * connect to db
 * @param {Object} opts - db config
 */
module.exports.connect = function (opts) {
	if (!opts) {
		console.log(`[MongoDB][ERR] These is no database config opts. Connect failed.`);
		return;
	};

	mongoose.Promise = global.Promise;
	mongoose.connect(`mongodb://${opts.server}:${opts.port}/${opts.db}`, {
		useMongoClient: true,
	});

	var db = mongoose.connection;

	// db connection test, ref: http://mongoosejs.com/docs/api.html#connection_Connection-readyState
	var db_state = ['disconnected', 'connected', 'connecting', 'disconnecting'];
	console.log(`MongoDB state: ${db_state[mongoose.connection.readyState]}`);

	//Bind connection to error event (to get notification of connection errors)
	db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}
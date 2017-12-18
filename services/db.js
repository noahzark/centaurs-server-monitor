/**
 * @file centaurs-server-monitor: database services
 * @copyright Centaurs Technologies Co. 2017
 * @author Zhang, Yuancheng
 * @license Unlicense
 * @module services/db
 */

var mongo = require('mongodb'),
	mongoose = require('mongoose'),
	config = require('config'),
	opts = {
		server: 'localhost',
		port: 27018,
		db: 'qw-monitor'
	};

if (config.has('email')) {
	opts = config.get('db');
	console.log(`[MongoDB][MSG] Use customized connection.`);
} else {
	console.log(`[MongoDB][MSG] No config file. Use default connection.`);
}

/**
 * connect to db
 * @param {Object} opts - db config
 */
module.exports.connect = function () {
	if (!opts) {
		console.log(`[MongoDB][ERR] These is no database config opts. Connect failed.`);
		return;
	} else {
		if (opts.user && opts.pwd) {
			console.log(`[MongoDB][MSG] Connecting... mongodb://${opts.user}:${opts.pwd}@${opts.server}:${opts.port}/${opts.db}`);
		} else {
			console.log(`[MongoDB][MSG] Connecting... mongodb://${opts.server}:${opts.port}/${opts.db}`);
		}
	}

	mongoose.Promise = global.Promise;
	if (opts.user && opts.pwd) {
		mongoose.connect(`mongodb://${opts.user}:${opts.pwd}@${opts.server}:${opts.port}/${opts.db}`, {
			useMongoClient: true,
		});
	} else {
		mongoose.connect(`mongodb://${opts.server}:${opts.port}/${opts.db}`, {
			useMongoClient: true,
		}).then(
			() => {
				/** ready to use. The `mongoose.connect()` promise resolves to undefined. */
				console.log(`[MongoDB][MSG] Connect successful. mongodb://${opts.server}:${opts.port}/${opts.db}`);
			},
			err => { 
				/** handle initial connection error */ 
				console.log(`[MongoDB][ERR] ${err}`);				
			}
		);
	}

	var db = mongoose.connection;

	// db connection test, ref: http://mongoosejs.com/docs/api.html#connection_Connection-readyState
	var db_state = ['disconnected', 'connected', 'connecting', 'disconnecting'];
	console.log(`MongoDB state: ${db_state[mongoose.connection.readyState]}`);

	//Bind connection to error event (to get notification of connection errors)
	db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}
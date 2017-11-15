var mongoose = require('mongoose');

// System Log Schema
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

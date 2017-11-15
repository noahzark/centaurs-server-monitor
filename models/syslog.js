var mongoose = require('mongoose');

// System Log Schema
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

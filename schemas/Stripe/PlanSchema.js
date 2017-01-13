var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

module.exports = new Schema({
	name : {
		type : String,
		required : true
	},
	id : {
		type : String,
		required : true
	},
	interval : {
		type : String,
		required : true
	},
	currency : {
		type : String,
		required : true
	},
	amount : {
		type : Number,
		required : true
	},
	interval_count : {
		type : Number
	},
	metadata : {
		type : Schema.Types.Mixed
	},
	statement_descriptor : {
		type : String
	},
	trial_period_days : {
		type : Number
	},
});
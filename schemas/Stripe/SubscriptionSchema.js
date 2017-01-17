var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

module.exports = new Schema({
	Customer : {
		type : String,
		required : true
	},
	application_fee_percent : {
		type : Number,
		required : false
	},
	cupon : {
		type : String,
		required : false
	},
	metadata : {
		type : Schema.Types.Mixed,
		required : false
	},
	plan : {
		type : String,
		required : false
	},
	prorate : {
		type : String,
		required : false
	},
	quantity : {
		type : Number,
		required : false
	},
	source : {
		type : Schema.Types.Mixed,
		required : false
	},
	tax_percent : {
		type : Number,
		required : false
	},
	trial_end : {
		type : Number,
		required : false
	},
	trial_period_days : {
		type : Number,
		required : false
	}
},
// Delete _id property from Subscription model
{
	_id : false
});
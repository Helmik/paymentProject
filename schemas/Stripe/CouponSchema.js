var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

module.exports = new Schema({
	duration : {
		type : String,
		required : true
	},
	id : {
		type : String,
		required : false
	},
	amount_off : {
		type : String,
		required : false
	},
	currency : {
		type : String,
		required : false
	},
	duration_in_months : {
		type : Number,
		required : false
	},
	max_redemptions : {
		type : Number,
		required : false
	},
	metadata : {
		type : Schema.Types.Mixed
	},
	percent_off : {
		type : Number,
		required : false
	},
	redeem_by : {
		type : Number,
		required : false
	}
},
// Delete _id property from Plan model
{
	_id : false
});
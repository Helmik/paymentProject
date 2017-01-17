var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

module.exports = new Schema({
	account_balance : {
		type : Number,
		required : false
	},
	business_vat_id : {
		type : Number,
		required : false
	},
	coupon : {
		type : String,
		required : false
	},
	description : {
		type : String,
		required : false
	},
	email : {
		type : String,
		required : false
	},
	metadata : {
		type : Schema.Types.Mixed,
		required : false
	},
	shipping : {
		type : Schema.Types.Mixed,
		required : false
	},
	source : {
		type : Schema.Types.Mixed,
		required : false
	}
},
// Delete _id property from Customer model
{
	_id : false
});
var mongoose = require("mongoose"),
	Schema = mongoose.Schema;


module.exports = new Schema({
	firstName : {
		type : String,
		required : true
	},
	middleName : {
		type : String,
		required : false
	},
	lastName : {
		type : String,
		required : true
	},
	secondLastName : {
		type : String,
		required : false
	},
	userName : {
		type : String,
		required : true
	},
	password : {
		type : String,
		required : true
	},
	email : {
		type : String,
		required : true
	},
	active : {
		type : Boolean,
		required : true
	}
});
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var self = this;

self.User = new Schema({
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
		// validate: {
  //         validator: ,
  //         message: "userOnCreateBadJSON"
  //       },
		required : true
	},
	password : {
		type : String,
		required : true
	},
	email : {
		type : String,
		required : true
	}
});
self.User.set("autoIndex",true);

module.exports = self;
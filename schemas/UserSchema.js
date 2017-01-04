var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var errors = require("../dictionary/errorCodes");

var self = this;

var emailValidator = function(email){
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
	// console.log("----------",email); 
	// return true;
};

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
		required : true
	},
	password : {
		type : String,
		required : true
	},
	email : {
		type : String,
		required : true,
		validate: {
			validator : emailValidator,
			message : JSON.stringify(errors.invalidEmail)
		}//[emailValidator,JSON.stringify(errors.invalidEmail)]
	}
});
self.User.set("autoIndex",true);

module.exports = self;
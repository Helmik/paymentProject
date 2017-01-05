var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

	errors = require("../dictionary/errorCodes");
	userCtrl = require("../controllers/UserCtrl");

	self = this;

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
		required : true
		// validate: {
		// 	validator : emailValidator,
		// 	message : JSON.stringify(errors.invalidEmail)
		// }
	}
});

function emailValidator(email){
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

self.User.path('email').validate(emailValidator, JSON.stringify(errors.invalidEmail));

self.User.set("autoIndex",true);

module.exports = self;
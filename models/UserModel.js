var mongoose = require("mongoose"),
		User = require("../schemas/UserSchema"),
		errors = require("../dictionary/errorCodes");


var self = this;

self.model = mongoose.model("user",User);

function emailValidator(email){
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

User.set("autoIndex",true);

User.path('email').validate(emailValidator, JSON.stringify(errors.invalidEmail));

User.pre('validate', function(next) {
  console.log('this gets printed third',this);
  this.active = true;
  this.email = this.email.toLowerCase()
  next();
});

self.buildUser = function(user){
	return new self.model(user);
};


module.exports = self;
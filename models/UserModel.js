var mongoose = require("mongoose");
var User = require("../schemas/UserSchema");


var self = this;

self.UserModel = mongoose.model("user",User.User);

self.buildUser = function(user){
	return new self.UserModel(user);
};

module.exports = self;
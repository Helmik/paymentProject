var mongoose = require("mongoose");
var User = require("../schemas/UserSchema");

var UserModel = mongoose.model("user",User.User);

var self = this;

self.buildUser = function(user){
	return new UserModel(user);
};

module.exports = self;
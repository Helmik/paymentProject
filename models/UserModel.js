var mongoose = require("mongoose");
var User = require("../schemas/UserSchema");

var UserModel = mongoose.model("User",User.User);

var self = this;

self.buildUser(user) = function{
	return new UserModel(user);
};
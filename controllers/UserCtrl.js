var UserModel = require("../models/UserModel");

var self = this;

self.getAll = function(req,res,next){
	console.log("Function to get all user");
};

self.create = function(req,res,next){
	// res.send(req.fields);
	var newUser = UserModel.buildUser(req.fields);
	newUser.save(function (err,user){
		if(err){
			res.send("The user has not been created :( "+err);
			return false;
		}
		res.send("The user has been created successfully! :)");
		return true;
	});
};

self.update = function(req,res,next){
	console.log("Function to update an user");
};

self.getById = function(req,res,next){
	console.log("Function to getById an user");
};

module.exports = self;
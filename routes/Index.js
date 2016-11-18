var Users = require("../controllers/UserCtrl");
var formidable = require("express-formidable");
var self = this;

self.init = function(globalV){

	self.global = globalV;
	// Parse request data with formidable
	globalV.app.use(formidable());

	/*  Routes for users  */
	Users.init(globalV);
	globalV.app.get("/users",Users.getAll);
	globalV.app.post("/users/create",Users.create);
	globalV.app.put("/users/update/:id",Users.update);
	globalV.app.get("/users/:id",Users.getAll);

};

module.exports = self;
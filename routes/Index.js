var Users = require("../controllers/UserCtrl");
var formidable = require("express-formidable");
var self = this;

function errorHandler(err, req, res, next) {
  err.error.message = err.message;
  res.status(err.statusCode).send(err);
}

self.init = function(globalConfiguration){

	self.global = globalConfiguration;
	// Parse request data with formidable
	globalConfiguration.app.use(formidable());

	/*  Routes for users  */
	Users.init(globalConfiguration);
	globalConfiguration.app.get("/users",Users.getAll);
	globalConfiguration.app.post("/users/create",Users.create);
	globalConfiguration.app.put("/users/update/:id",Users.update);
	globalConfiguration.app.get("/users/:id",Users.getUserById);

	/* Catch errors */
	globalConfiguration.app.use(errorHandler);

};

module.exports = self;
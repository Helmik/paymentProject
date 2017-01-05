var Users = require("../controllers/UserCtrl");
var formidable = require("express-formidable");
var self = this;

// function logErrors(err, req, res, next) {
//   console.error("\n\n\n\n\nLog errors",err.stack);
//   next(err);
// }

// function clientErrorHandler(err, req, res, next) {
// 	console.log("\n\n\n\n\nclientErrorHandler");
// 	if (req.xhr) {
// 		res.status(500).send({ error: 'Something failed!' });
// 	} else {
// 	  next(err);
// 	}
// }

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
	globalConfiguration.app.get("/users/:id",Users.getAll);


	/* Catch errors */
	globalConfiguration.app.use(errorHandler);

};

module.exports = self;
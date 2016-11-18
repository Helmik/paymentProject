var Users = require("../controllers/UserCtrl");
var formidable = require("express-formidable");
var self = this;

self.initRoutes = function(app){

	app.use(formidable());

	/*Routes for users*/
	app.get("/users",Users.getAll);
	app.post("/users/create",Users.create);
	app.put("/users/update/:id",Users.update);
	app.get("/users/:id",Users.getAll);

};

module.exports = self;
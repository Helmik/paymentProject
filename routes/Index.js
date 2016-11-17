var self = this;

self.initRoutes = function(app){
	/*Routes for users*/
	app.route("/users",Users.getAll);
	app.route("/users/create",Users.create);
	app.route("/users/update/:id",Users.update);
	app.route("/users/:id",Users.getAll);

};

module.exports = self;
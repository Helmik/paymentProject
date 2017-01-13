var Users = require("../controllers/User/UserCtrl"),
	bodyParser = require('body-parser')
	jsonParser = bodyParser.json(),
	// var cors = require("cors"),
	self = this;

function errorHandler(err, req, res, next) {
  // err.error.message = err.message;
  res.status(err.statusCode).send({message: err.message, code: err.code});
}

self.init = function(globalConfiguration){

	// Parse request data with formidable

	// Add headers
	globalConfiguration.app.use(function (req, res, next) {
	    // Website you wish to allow to connect
	    res.setHeader('Access-Control-Allow-Origin', '*');

	    // Request methods you wish to allow
	    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	    // Request headers you wish to allow
	    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	    // Set to true if you need the website to include cookies in the requests sent
	    // to the API (e.g. in case you use sessions)
	    res.setHeader('Access-Control-Allow-Credentials', true);

	    // Pass to next layer of middleware
	    next();
	});

	// globalConfiguration.app.use(cors())

	/*  Routes for users  */
	Users.init(globalConfiguration);
	globalConfiguration.app.get("/users",jsonParser,Users.getAll);
	globalConfiguration.app.post("/users/create",jsonParser,Users.create);
	globalConfiguration.app.put("/users/update/:id",jsonParser,Users.update);
	globalConfiguration.app.get("/users/:id",jsonParser,Users.getUserById);

	/* Catch errors */
	globalConfiguration.app.use(errorHandler);

};

module.exports = self;
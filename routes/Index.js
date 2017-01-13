var Users = require("../controllers/User/UserCtrl"),
	StripePlan = require("../controllers/Stripe/PlanCtrl"),
	bodyParser = require('body-parser'),
	jsonParser = bodyParser.json(),
	// var cors = require("cors"),
	self = this;

function errorHandler(err, req, res, next) {
  // err.error.message = err.message;
  res.status(err.statusCode).send({message: err.message, code: err.code});
}

self.init = function(conf){

	// Parse request data with formidable

	// Add headers
	conf.app.use(function (req, res, next) {
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

	conf.app.use(bodyParser.json());
	conf.app.use(bodyParser.urlencoded({
	  extended: true
	}));
	// conf.app.use(cors())

	/*  Routes for users  */
	Users.init(conf);
	conf.app.get("/api/users",Users.getAll);
	conf.app.post("/api/users/create",Users.create);
	conf.app.put("/api/users/update/:id",Users.update);
	conf.app.get("/api/users/:id",Users.getUserById);


	/* Routes for Stripe */
	StripePlan.init(conf);
	conf.app.post("/api/stripe/create",StripePlan.create);

	/* Catch errors */
	conf.app.use(errorHandler);

};

module.exports = self;
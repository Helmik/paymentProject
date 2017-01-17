var Users = require("../controllers/User/UserCtrl"),
	// StripePlan = require("../controllers/Stripe/PlanCtrl"),
	// StripeCustomer = require("../controllers/Stripe/CustomerCtrl"),
	StripeCRUD = require("../controllers/Stripe/StripeCRUDCtrl");
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
	conf.app.get("/api/user",Users.getAll);
	conf.app.post("/api/user/create",Users.create);
	conf.app.put("/api/user/update/:id",Users.update);
	conf.app.get("/api/user/:id",Users.getUserById);


	/* Routes for Stripe */
	StripeCRUD.init(conf);
	conf.app.post("/api/stripe/:type/create",StripeCRUD.validate,StripeCRUD.create);
	conf.app.get("/api/stripe/:type/:id",StripeCRUD.validate,StripeCRUD.retrieve);
	conf.app.put("/api/stripe/:type/update/:id",StripeCRUD.validate,StripeCRUD.update);
	conf.app.delete("/api/stripe/:type/delete/:id",StripeCRUD.validate,StripeCRUD.del);
	conf.app.get("/api/stripe/:type",StripeCRUD.validate,StripeCRUD.list);

	// StripePlan.init(conf);
	// StripeCustomer.init(conf);
	// conf.app.post("/api/stripe/plan/create",StripePlan.create);
	// conf.app.get("/api/stripe/plan/:id",StripePlan.retrive);
	// conf.app.put("/api/stripe/plan/update/:id",StripePlan.update);
	// conf.app.delete("/api/stripe/plan/delete/:id",StripePlan.remove);
	// conf.app.get("/api/stripe/plan",StripePlan.getAll);

	// conf.app.post("/api/stripe/customer/create",StripeCustomer.create);
	// conf.app.get("/api/stripe/customer/:id",StripeCustomer.retrive);
	// conf.app.put("/api/stripe/customer/update/:id",StripeCustomer.update);
	// conf.app.delete("/api/stripe/customer/delete/:id",StripeCustomer.remove);
	// conf.app.get("/api/stripe/customer",StripeCustomer.getAll);

	/* Catch errors */
	conf.app.use(errorHandler);

};

module.exports = self;
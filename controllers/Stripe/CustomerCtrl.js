var PlanModel = require("../../models/Stripe/CustomerModel"),
    HandleResponse = require("../../shared/HandleResponse"),
    stripe,

    self = this;

self.init = function(conf){
  self.conf = conf;
  HandleResponse.init(self.conf);
  stripe = require("stripe")(self.conf.stripe_secret_key);
}

// Create a new user
self.create = function(req,res,next){
  // Get data from petition
	let customer = JSON.stringify(PlanModel(req.body));

	let newCustomer = JSON.parse(customer);

	stripe.customers.create(newCustomer, function(err,plan){
		if(err){
			console.log(err);
      return next(HandleResponse.error(err,"stripeCustomerCreate"));
    }
    let response = HandleResponse.success(plan,"stripeCustomerCreate");
    res.status(response.statusCode).send(response.response);
	});
	
};

self.retrive = function(req,res,next){
  stripe.customers.retrieve(req.params.id,function(err,plan){
    if(err){
      return next(HandleResponse.error(err,"stripeCustomerRetrive"));
    }
    let response = HandleResponse.success(plan,"stripeCustomerRetrive");
    res.status(response.statusCode).send(response.response);
  });
};

self.update = function(req,res,next){
  // Get data from petition
  let customer = JSON.stringify(PlanModel(req.body));
  let updateCustomer = JSON.parse(customer);
  stripe.customers.update(req.params.id,updateCustomer,function(err,customer){
    if(err){
      return next(HandleResponse.error(err,"stripeCustomerUpdated"));
    }
    let response = HandleResponse.success(customer,"stripeCustomerUpdated");
    res.status(response.statusCode).send(response.response);
  })
};

self.remove = function(req,res,next){
  stripe.customers.del(req.params.id,function(err, confirmation) {
      if(err){
        return next(HandleResponse.error(err,"stripeCustomerDelete"));
      }
      let response = HandleResponse.success(confirmation,"stripeCustomerDelete");
      res.status(response.statusCode).send(response.response);
    }
  );
};

self.getAll = function(req,res,next){
  stripe.customers.list(req.body,function(err,plans){
    if(err){
      return next(HandleResponse.error(err,"stripeCustomerGetAll"));
    }
    let response = HandleResponse.success(plans,"stripeCustomerGetAll");
    res.status(response.statusCode).send(response.response);
  })
};

module.exports = self;
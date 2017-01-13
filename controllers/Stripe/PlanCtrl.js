var PlanModel = require("../../models/Stripe/PlanModel"),
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
  console.log(req.body);
	let newPlan = PlanModel(req.body);
let a = { amount: '5000',
  interval: 'month',
  name: 'First plan',
  currency: 'mxn',
  id: 'first-plan' };

	stripe.plans.create(a, function(err,plan){
		if(err){
			console.log(err);
      return next(HandleResponse.error(err,"stripePlanCreate"))
    }
    console.log(plan);
    let response = HandleResponse.success(plan,"stripePlanCreate");
    res.status(response.statusCode).send(response.response);
	});
	
};

module.exports = self;
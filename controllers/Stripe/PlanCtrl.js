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
	let plan = JSON.stringify(PlanModel(req.body));

	let newPlan = JSON.parse(plan);

	stripe.plans.create(newPlan, function(err,plan){
		if(err){
			console.log(err);
      return next(HandleResponse.error(err,"stripePlanCreate"))
    }
    let response = HandleResponse.success(plan,"stripePlanCreate");
    res.status(response.statusCode).send(response.response);
	});
	
};

self.retrive = function(req,res,next){
  stripe.plans.retrieve(req.params.id,function(err,plan){
    if(err){
      return next(HandleResponse.error(err,"stripePlanRetrive"));
    }
    let response = HandleResponse.success(plan,"stripePlanRetrive");
    res.status(response.statusCode).send(response.response);
  });
};

self.update = function(req,res,next){
  // Get data from petition
  let plan = JSON.stringify(PlanModel(req.body));
  let updatePlan = JSON.parse(plan);
  stripe.plans.update(req.params.id,updatePlan,function(err,plan){
    if(err){
      return next(HandleResponse.error(err,"stripePlanUpdated"));
    }
    let response = HandleResponse.success(plan,"stripePlanUpdated");
    res.status(response.statusCode).send(response.response);
  })
};

self.remove = function(req,res,next){
  stripe.plans.del(req.params.id,function(err, confirmation) {
      if(err){
        return next(HandleResponse.error(err,"stripePlanDelete"));
      }
      let response = HandleResponse.success(confirmation,"stripePlanDelete");
      res.status(response.statusCode).send(response.response);
    }
  );
};

self.getAll = function(req,res,next){
  stripe.plans.list(req.body,function(err,plans){
    if(err){
      return next(HandleResponse.error(err,"stripePlanGetAll"));
    }
    let response = HandleResponse.success(plans,"stripePlanGetAll");
    res.status(response.statusCode).send(response.response);
  })
};

module.exports = self;
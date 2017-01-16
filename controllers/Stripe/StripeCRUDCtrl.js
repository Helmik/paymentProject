var CustomerModel = require("../../models/Stripe/CustomerModel"),
    PlanModel = require("../../models/Stripe/PlanModel"),
    CuponModel = require("../../models/Stripe/CuponModel"),
    HandleResponse = require("../../shared/HandleResponse"),
    stripe,

    self = this;


const objects = {
  plan : {
    model : PlanModel,
    stripeObject : "plans",
    messages : {
      create : "stripePlanCreate",
      retrieve : "stripePlanRetrieve",
      update : "stripePlanUpdated",
      del : "stripePlanDelete",
      list : "stripePlanList"
    }
  },
  customer : {
    model : CustomerModel,
    stripeObject : "customers",
    messages : {
      create : "stripeCustomerCreate",
      retrieve : "stripeCustomerRetrieve",
      update : "stripeCustomerUpdated",
      del : "stripeCustomerDelete",
      list : "stripeCustomerList"
    }
  },
  cupon : {
    model : CuponModel,
    stripeObject : "coupons",
    messages : {
      create : "stripeCuponCreate",
      retrieve : "stripeCuponRetrieve",
      update : "stripeCuponUpdated",
      del : "stripeCuponDelete",
      list : "stripeCuponList"
    }
  }
};

self.init = function(conf){
  self.conf = conf;
  HandleResponse.init(self.conf);
  stripe = require("stripe")(self.conf.stripe_secret_key);
}

// Create a new user
self.create = function(req,res,next){
  let type = objects[req.params.type];

  // Get data from petition
	let object = JSON.stringify(type.model(req.body));

	let newObject = JSON.parse(object);

	stripe[type.stripeObject].create(newObject, function(err,resp){
		if(err){
			console.log(err);
      return next(HandleResponse.error(err,type.messages.create));
    }
    let response = HandleResponse.success(resp,type.messages.create);
    res.status(response.statusCode).send(response.response);
	});
	
};

self.retrieve = function(req,res,next){
  let type = objects[req.params.type];

  stripe[type.stripeObject].retrieve(req.params.id,function(err,resp){
    if(err){
      return next(HandleResponse.error(err,type.messages.retrieve));
    }
    let response = HandleResponse.success(resp,type.messages.retrieve);
    res.status(response.statusCode).send(response.response);
  });
};

self.update = function(req,res,next){
  let type = objects[req.params.type];

  // Get data from petition
  let object = JSON.stringify(type.model(req.body));
  let updateObject = JSON.parse(object);
  stripe[type.stripeObject].update(req.params.id,updateObject,function(err,resp){
    if(err){
      return next(HandleResponse.error(err,type.messages.update));
    }
    let response = HandleResponse.success(resp,type.messages.update);
    res.status(response.statusCode).send(response.response);
  })
};

self.del = function(req,res,next){
  let type = objects[req.params.type];

  stripe[type.stripeObject].del(req.params.id,function(err, confirmation) {
      if(err){
        return next(HandleResponse.error(err,type.messages.remove));
      }
      let response = HandleResponse.success(confirmation,type.messages.remove);
      res.status(response.statusCode).send(response.response);
    }
  );
};

self.list = function(req,res,next){
  let type = objects[req.params.type];

  stripe[type.stripeObject].list(req.body,function(err,resp){
    if(err){
      return next(HandleResponse.error(err,type.messages.list));
    }
    let response = HandleResponse.success(resp,type.messages.list);
    res.status(response.statusCode).send(response.response);
  })
};

module.exports = self;
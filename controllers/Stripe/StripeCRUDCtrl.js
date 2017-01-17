var CustomerModel = require("../../models/Stripe/CustomerModel"),
    PlanModel = require("../../models/Stripe/PlanModel"),
    CouponModel = require("../../models/Stripe/CouponModel"),
    SubscriptionModel = require("../../models/Stripe/SubscriptionModel"),
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
  coupon : {
    model : CouponModel,
    stripeObject : "coupons",
    messages : {
      create : "stripeCouponCreate",
      retrieve : "stripeCouponRetrieve",
      update : "stripeCouponUpdated",
      del : "stripeCouponDelete",
      list : "stripeCouponList"
    }
  },
  subscription : {
    model : SubscriptionModel,
    stripeObject : "subscriptions",
    messages : {
      create : "stripeSubscriptionCreate",
      retrieve : "stripeSubscriptionRetrieve",
      update : "stripeSubscriptionUpdated",
      del : "stripeSubscriptionDelete",
      list : "stripeSubscriptionList"
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

self.validate = function(req,res,next){
  let type = objects[req.params.type];
  if(type){
    next();
  }else{
    let response = HandleResponse.error({},"invalidType");
    res.status(response.statusCode).send({message : response.message , code : response.code});
  }
};

module.exports = self;
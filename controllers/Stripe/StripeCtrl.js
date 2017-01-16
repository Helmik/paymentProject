// var PlanModel = require("../../models/Stripe/PlanModel"),
//     HandleResponse = require("../../shared/HandleResponse"),
//     stripe,

//     self = this;

// self.init = function(conf){
//   self.conf = conf;
//   HandleResponse.init(self.conf);
//   stripe = require("stripe")(self.conf.stripe_secret_key);
// }

// // Create a new user
// self.create = function(req,res,next){

//   if(!req.body.type){
//     return next(HandleResponse.error({},"undefinedType"))
//   }

//   // Get data from petition
// 	let plan = JSON.stringify(PlanModel(req.body));

// 	let newPlan = JSON.parse(plan);

// 	stripe.plans.create(newPlan, function(err,plan){
// 		if(err){
// 			console.log(err);
//       return next(HandleResponse.error(err,"stripePlanCreate"))
//     }
//     let response = HandleResponse.success(plan,"stripePlanCreate");
//     res.status(response.statusCode).send(response.response);
// 	});
	
// };

// module.exports = self;
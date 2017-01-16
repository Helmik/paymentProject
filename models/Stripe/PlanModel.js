var mongoose = require("mongoose"),
	Plan = require("../../schemas/Stripe/PlanSchema");

Plan.set("autoIndex",true);

module.exports = mongoose.model("plan",Plan);
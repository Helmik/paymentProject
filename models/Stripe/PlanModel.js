var mongoose = require("mongoose"),
	User = require("../../schemas/Stripe/PlanSchema"),
	errors = require("../../dictionary/errorCodes");

User.set("autoIndex",true);

module.exports = mongoose.model("plan",User);
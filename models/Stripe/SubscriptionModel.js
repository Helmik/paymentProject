var mongoose = require("mongoose"),
	Subscription = require("../../schemas/Stripe/SubscriptionSchema");

Subscription.set("autoIndex",true);

module.exports = mongoose.model("subscription",Subscription);
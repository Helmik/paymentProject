var mongoose = require("mongoose"),
	Customer = require("../../schemas/Stripe/CustomerSchema");

Customer.set("autoIndex",true);

module.exports = mongoose.model("customer",Customer);
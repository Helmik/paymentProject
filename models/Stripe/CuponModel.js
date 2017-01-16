var mongoose = require("mongoose"),
	Plan = require("../../schemas/Stripe/CuponSchema");

Plan.set("autoIndex",true);

module.exports = mongoose.model("cupon",Plan);
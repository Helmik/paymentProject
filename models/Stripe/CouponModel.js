var mongoose = require("mongoose"),
	Cupon = require("../../schemas/Stripe/CouponSchema");

Cupon.set("autoIndex",true);

module.exports = mongoose.model("cupon",Cupon);
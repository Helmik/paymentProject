var PlanModel = require("../../models/Stripe/PlanModel"),
    handleResponse = require("../../shared/HandleResponse"),

    Promise = require('bluebird'),

    self = this;

// Create a new user
self.create = function(req,res,next){
    // Get data from petition
  let newUser = UserModel(req.body);
  // Verify if the email and user doesn't exist
  Promise.all([searchUserByEmail(newUser.email),searchUserByUserName(newUser.userName)]).then(function(results){
    if(results[0]){
      return next(handleResponse.error({},"emailExistAlready"));
    }
    if(results[1]){
      return next(handleResponse.error({},"userNameExistAlready"));
    }
    // Create user
    newUser.save(function(err,user){
      if(err){
        return next(handleResponse.error(err,"userOnCreated"));
      }
      let response = handleResponse.success(user,"userOnCreated");
      
      res.status(response.statusCode).send(response.response);
    });
  }).catch(function(errors){
    next(handleResponse.error(errors,"errorDataBaseConnection"));
  });
};

module.exports = self;
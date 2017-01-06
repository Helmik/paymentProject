var UserModel = require("../models/UserModel"),
    handleResponse = require("../shared/HandleResponse"),

    Promise = require('bluebird'),

    self = this;

self.init = function(globalConfiguration){
  self.global = globalConfiguration;
  handleResponse.init(self.global);
}

// Return all users registered
self.getAll = function(req,res,next){
  UserModel.find({}, function(err, users) {
    if(err){
      next(handleResponse.error(err,"userOnGet"));
    }else{
      var response = handleResponse.success(users,"usersOnGet");
      res.statusCode = response.statusCode;
      res.send(response.response);
    }
  });
};

// Create a new user
self.create = function(req,res,next){
    // Get data from petition
  let newUser = UserModel.buildUser(req.fields);

    // Verify if the email and user doesn't exist
  Promise.all([searchUserByEmail(newUser.email),searchUserByUserName(newUser.userName)]).then(function(results){
    if(results[0]){
      next(handleResponse.error({},"emailExistAlready"));
      return 0;
    }
    if(results[1]){
      next(handleResponse.error({},"userNameExistAlready"));
      return 0;
    }

    // Create user
    newUser.save(function(err,user){
      if(err){
        next(handleResponse.error(err,"userOnCreated"));
      }else{
        let response = handleResponse.success(user,"userOnCreated");
        res.statusCode = response.statusCode;
        res.send(response.response);
      }
    });
  }).catch(function(errors){
    next(handleResponse.error(errors,"errorDataBaseConnection"));
  });
};

self.update = function(req,res,next){
  let query = { _id : req.params.id };

  searchUserByEmail(req.fields.email).then(function(result){
    if(result && result._id != req.params.id){
      next(handleResponse.error({},"emailExistAlready"));
      return 0;
    }

    // Updated user
    UserModel.findOneAndUpdate(query, { $set: req.fields}, function(err,doc,updated){
      if(err){
        next(handleResponse.error({},"updateUser"))
      }else{
        let response = handleResponse.success({},"updateUser");
        res.statusCode = response.statusCode;
        res.send(response.response);
      }
    });
  }).catch(function(error){
    next(handleResponse.error(error,"errorDataBaseConnection"));
  });
};

self.getUserById = function(req,res,next){
  UserModel.find({_id : req.params.id}, function(err, users) {
    if(err){
      next(handleResponse.error(err,"getUserById"));
    }else{
      let response = handleResponse.success(users,"getUserById");
      res.statusCode = response.statusCode;
      res.send(response.response);
    }
  });
};

function searchUserByEmail(email){
  return new Promise(function(resolve,reject){
    UserModel.findOne({'email' : email},function(err, user) {
      if(err){
        reject(err);
      }else{
        resolve(user);
      }
    });
  })
}

function searchUserByUserName(userName){
  return new Promise(function(resolve,reject){
    UserModel.findOne({'userName' : userName},function(err, user) {
      if(err){
        reject(err);
      }else{
        resolve(user);
      }
    });
  })
}

module.exports = self;
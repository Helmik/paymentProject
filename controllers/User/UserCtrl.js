var UserModel = require("../../models/User/UserModel"),
    HandleResponse = require("../../shared/HandleResponse"),

    Promise = require('bluebird'),

    self = this;

self.init = function(conf){
  self.conf = conf;
  HandleResponse.init(self.conf);
}

// Return all users registered
self.getAll = function(req,res,next){
  UserModel.find({}, function(err, users) {
    if(err){
      next(HandleResponse.error(err,"userOnGet"));
    }else{
      let response = HandleResponse.success(users,"usersOnGet");
      res.status(response.statusCode).send(response.response);
    }
  });
};

// Create a new user
self.create = function(req,res,next){
    // Get data from petition
  let newUser = UserModel(req.body);
  // Verify if the email and user doesn't exist
  Promise.all([searchUserByEmail(newUser.email),searchUserByUserName(newUser.userName)]).then(function(results){
    if(results[0]){
      return next(HandleResponse.error({},"emailExistAlready"));
    }
    if(results[1]){
      return next(HandleResponse.error({},"userNameExistAlready"));
    }
    // Create user
    newUser.save(function(err,user){
      if(err){
        return next(HandleResponse.error(err,"userOnCreated"));
      }
      let response = HandleResponse.success(user,"userOnCreated");
      res.status(response.statusCode).send(response.response);
    });
  }).catch(function(errors){
    next(HandleResponse.error(errors,"errorDataBaseConnection"));
  });
};

self.update = function(req,res,next){
  let query = { _id : req.params.id };

  searchUserByEmail(req.body.email).then(function(result){
    if(result && result._id != req.params.id){
      return next(HandleResponse.error({},"emailExistAlready"));
    }

    // Updated user
    UserModel.findOneAndUpdate(query, { $set: req.body}, function(err,doc,updated){
      if(err){
        return next(HandleResponse.error({},"updateUser"))
      }
      let response = HandleResponse.success(req.body,"updateUser");
      res.status(response.statusCode).send(response.response);
    });
  }).catch(function(error){
    next(HandleResponse.error(error,"errorDataBaseConnection"));
  });
};

self.getUserById = function(req,res,next){
  UserModel.find({_id : req.params.id}, function(err, users) {
    if(err){
      return next(HandleResponse.error(err,"getUserById"));
    }
    let response = HandleResponse.success(user,"getUserById");
    res.status(response.statusCode).send(response.response);
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
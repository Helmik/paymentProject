var UserModel = require("../models/UserModel"),
    messages = require("../dictionary/messages"),
    errors = require("../dictionary/errorCodes"),
    Promise = require('bluebird'),

    self = this;

self.init = function(globalConfiguration){
    self.global = globalConfiguration;
}


// Function to parse response
function success(data,type){
    let response = {};
    // Define what kind of message goes to show
    response.data = data;

    // Build message to response
    response.code = messages[type].code;
    response.status = messages[type].statusCode;
    response.message = messages[type].message[self.global.language];

    if(!response.code){
        delete response.code;
    }

    return {
        response : response,
        statusCode : messages[type].statusCode
    };
}

// Function to handle errors
function fail(err,type){
    return {
        error : err,
        message : errors[type].message[self.global.language],
        code : errors[type].code,
        statusCode : errors[type].statusCode,
    }

}

// Return all users registered
self.getAll = function(req,res,next){
    function getAllUsers(err, users) {
        if(err){
            next(fail(err,"userOnGet"));
        }else{
            var response = success(users,"usersOnGet");
            res.statusCode = response.statusCode;
            res.send(response.response);
        }
    }

    UserModel.UserModel.find({},getAllUsers);
};

// Create a new user
self.create = function(req,res,next){

    function saveUser(err,user){
        if(err){
            next(fail(err,"userOnCreated"));
        }else{
            var response = success(user,"userOnCreated");
            res.statusCode = response.statusCode;
            res.send(response.response);
        }
    }

    // Get data from petition
    var newUser = UserModel.buildUser(req.fields);

    // Verify if the email and user doesn't exist
    Promise.all([searchUserByEmail(newUser.email),searchUserByUserName(newUser.userName)]).then(function(results){
        if(results[0]){
            next(fail({},"emailExistAlready"));
            return 0;
        }
        if(results[1]){
            next(fail({},"userNameExistAlready"));
            return 0;
        }

        // Create user
        newUser.save(saveUser);
    }).catch(function(errors){
        next(fail(errors,"errorDataBaseConnection"));
    });
};

self.update = function(req,res,next){

    // let user = UserModel.buildUser(req.fields);
    // "586e804c5e042803d2e64033"
    let query = { _id : req.params.id };

    function userUpdated(err,doc,updated){
        if(err){
            next(fail({},"updateUser"))
        }else{
            var response = success({},"updateUser");
            res.statusCode = response.statusCode;
            res.send(response.response);
        }
    }

    searchUserByEmail(req.fields.email).then(function(result){
        if(result && result._id != req.params.id){
            next(fail({},"emailExistAlready"));
            return 0;
        }

        // Updated user
        UserModel.UserModel.findOneAndUpdate(query, { $set: req.fields}, userUpdated);
    }).catch(function(error){
        next(fail(error,"errorDataBaseConnection"));
    });

};

self.getUserById = function(req,res,next){
    function getUserById(err, users) {
        if(err){
            next(fail(err,"getUserById"));
        }else{
            var response = success(users,"getUserById");
            res.statusCode = response.statusCode;
            res.send(response.response);
        }
    }

    UserModel.UserModel.find({_id : req.params.id},getUserById);
};

function searchUserByEmail(email){
    return new Promise(function(resolve,reject){
        function getUserByEmail(err, user) {
            if(err){
                reject(err);
            }else{
                resolve(user);
            }
        }
        UserModel.UserModel.findOne({'email' : email},getUserByEmail);
    })
}

function searchUserByUserName(userName){
    return new Promise(function(resolve,reject){
        function getUserByUserName(err, user) {
            if(err){
                reject(err);
            }else{
                resolve(user);
            }
        }
        UserModel.UserModel.findOne({'userName' : userName},getUserByUserName);
    })
}

module.exports = self;
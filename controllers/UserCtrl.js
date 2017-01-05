var UserModel = require("../models/UserModel"),
    messages = require("../dictionary/messages"),
    errors = require("../dictionary/errorCodes"),
    Promise = require('bluebird'),

    self = this;

self.init = function(globalConfiguration){
    self.global = globalConfiguration;
}


// Function to parse response
function success(err,data,type){
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
            var response = success(err,users,"usersOnGet");
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
            var response = success(err,user,"userOnCreated");
            res.statusCode = response.statusCode;
            res.send(response.response);
        }
    }

    var newUser = UserModel.buildUser(req.fields);
    console.log("------",newUser);
    Promise.all([searchUserByEmail(newUser.email),searchUserByUserName(newUser.userName)]).then(function(results){
        console.log("validar usuario\n",results);
        if(results[0]){
            next(fail({},"emailExistAlready"));
            return 0;
        }
        if(results[1]){
            next(fail({},"userNameExistAlready"));
            return 0;
        }

        newUser.save(saveUser);
    }).catch(function(errors){
        console.log(errors);
        next(fail(errors,"errorDataBaseConnection"));
    });
};

self.update = function(req,res,next){
    console.log("Function to update an user");
};

self.getById = function(req,res,next){
    console.log("Function to getById an user");
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
                console.log("search user by name",user)
                resolve(user);
            }
        }

        UserModel.UserModel.findOne({'userName' : userName},getUserByUserName);
    })
}

module.exports = self;
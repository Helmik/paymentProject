var UserModel = require("../models/UserModel");
var messages = require("../dictionary/messages");
var errors = require("../dictionary/errorCodes");

var self = this;

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
    newUser.save(saveUser);
};

self.update = function(req,res,next){
    console.log("Function to update an user");
};

self.getById = function(req,res,next){
    console.log("Function to getById an user");
};

self.searchUserByEmail = function(userName){
    function getUser(err, users) {
        if(err){

        }
        res.send(users);  
        return true;
    }

    UserModel.UserModel.find({userName : userName},getUser);
};

module.exports = self;
var UserModel = require("../models/UserModel");
var messages = require("../dictionary/messages");
var errors = require("../dictionary/errorCodes");

var self = this;

self.init = function(globalV){
    self.global = globalV;
}


// Function to parse response
function result(err,data,type){
    var response = {};
    // Define what kind of message goes to show
    if(err){
        var stackMessage = errors;
        response.error = err;

        if(err.name){
            type = err.name;
        }
    }else{
        var stackMessage = messages;
        response.data = data;
    }

    // Define HTTP code
    var statusCode = stackMessage[type].statusCode;
    // Build message to response
    response.code = stackMessage[type].code;
    response.status = stackMessage[type].statusCode;
    response.message = stackMessage[type].message[self.global.language];

    if(!response.code){
        delete response.code;
    }

    return {
        response : response,
        statusCode : statusCode
    };
}

// Return all users registered
self.getAll = function(req,res,next){
    function getAllUsers(err, users) {
        var response = result(err,users,"usersOnGet");
        res.statusCode = response.statusCode;
        res.send(response.response);
    }

    UserModel.UserModel.find({},getAllUsers);
};

self.create = function(req,res,next){

    function saveUser(err,user){
        var response = result(err,user,"userOnCreated");
        res.statusCode = response.statusCode;
        res.send(response.response);
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

self.userNameExistAlready = function(userName){
    function getUser(err, users) {
        if(err){

        }
        res.send(users);  
        return true;
    }

    UserModel.UserModel.find({userName : userName},getUser);
};

module.exports = self;
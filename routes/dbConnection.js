var MongoClient = require("mongodb").MongoClient;
var express = require("express");
var router = express.Router();
var Q = require("q");

var database = this;

// Create a user
function createUser(req,res,next){
    console.log(req.body);
    var user = req.user;
    if(user.firstName && user.lastName && user.userName && user.password){
        database.db.User.insert(user);
        res.send({
            user : user,
            message : "User " + user.userName + " has been created successfully."
        });
    }else{
        res.send({message:"You most include first name, last name, username and password at less"});
    }
};

function showUsers(req,res,next){
    res.send("It is the users list");
}


router.get("/",showUsers);

router.post("/createUser", createUser);

// Method to get connection with mongo db
database.connection = function(url="mongodb://admin:4dm1n@localhost:27017/payment"){
    var deferred = Q.defer();
    MongoClient.connect(url,function(err,db){
        if(err){
            console.log("Error has been occurred: "+err);
            deferred.reject(false);
        }else{
            deferred.resolve(true);
            console.log("The connection with database has been success.");
            database.db = db;
        }
    });

    return deferred.promise;
};

module.exports = {
    database : database,
    router : router
};
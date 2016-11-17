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


module.exports = {
    database : database,
    router : router
};
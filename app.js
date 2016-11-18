// Import modules
var express = require("express");
var dbConnection = require("./controllers/DBConnectionCtrl");
var index = require("./routes/Index");

// Global variable to config application
var globalV  = {
    app : express(),
    language : "spanish"
};

// Function to initialize application
function initApp(){
    // Initialize index resource
    index.init(globalV);

    // Stat server on port 3000
    globalV.app.listen(3000,function(){
        console.log("Payment app is listening on port 3000!");
    });
}

// Execute when data base connection fails
function appFail(){
    console.log("It doesn't work");
    throw "Error!";
}

// Try connect with database
var db = dbConnection.connection();
db.then(initApp).catch(appFail);
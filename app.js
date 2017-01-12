// Import modules
var express = require("express"),
    dbConnection = require("./config/DBConnection"),
    index = require("./routes/Index");

// Global variable to config application
var globalConfiguration  = {
    app : express(),
    language : "spanish"
};

// Function to initialize application
function initApp(){
    // Initialize index resource
    index.init(globalConfiguration);

    // Stat server on port 3000
    globalConfiguration.app.listen(3000,function(){
        console.log("Payment app is listening on port 3000!\n\n\n\n\n\n\n");
    });
}

// Execute when data base connection fails
function appFail(){
    console.log("It doesn't work");
    throw "Error!";
}

// Try to connect to database
var db = dbConnection.connection();
db.then(initApp).catch(appFail);
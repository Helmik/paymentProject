var express = require("express");
var app = express();
var dbConnection = require("./controllers/DBConnectionCtrl");
var routes = require("./rutes/Index");

function initApp(){

    routes.initRoutes(app);

    app.listen(3000,function(){
        console.log("Payment app is listening on port 3000!");
    });
}

function initAppFails(){
    console.log("It doesn't work");
    throw "Error!";
}



dbConnection.connection().then(initApp).catch(initAppFails);
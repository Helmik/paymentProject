var mongoose = require("mongoose");

var self = this;

self.connection = function(url="mongodb://admin:4dm1n@localhost:27017/payment"){

    function conect(resolve,reject){
        mongoose.connect(url);
        var db = mongoose.connection;

        db.on("error",function(err){
            console.log("Error has been occurred: "+err);
            reject(err);
        });

        db.once("open",function(err){
            console.log("The connection with database has been success.");
            resolve(db);
        });
    }

    return new Promise(conect);
};

module.exports = self;
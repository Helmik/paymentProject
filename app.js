var express = require('express');
var app = express();

var db = require('./routes/dbConnection');

app.use('/users', db.router);

// Try make connection with mongo db
db.database.connection().then(function(success){
	// If success, throw the server
	app.listen(3000,function(){
		console.log("Payment app listening on port 3000!");
	});
},function(error){
	// If error, all kill
	console.log("It doesn't work");
	throw "Error!";
});
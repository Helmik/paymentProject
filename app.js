// Import modules
var dbConnection = require("./config/DBConnection"),
    index = require("./routes/Index"),
    conf = require("./config/configurations");

// Function to initialize application
function initApp(){
    // Initialize index resource
    index.init(conf);

    // Stat server on port 3000
    conf.app.listen(3000,function(){
        console.log("Payment app is listening on port 3000!\n\n\n\n\n\n\n");
    });
}

// Execute when data base connection fails
function appFail(error){
    console.log("It doesn't work");
    throw error;
}

// Try to connect to database
var db = dbConnection.connection();
db.then(initApp).catch(appFail);
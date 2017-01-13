var messages = require("../dictionary/messages"),
  errors = require("../dictionary/errorCodes"),

  self = this;

self.init = function(conf){
  self.conf = conf;
}

// Function to parse response
self.success = function(data,type){
  let response = {};
  // Define what kind of message goes to show
  response.data = data;

  // Build message to response
  response.code = messages[type].code;
  // response.status = messages[type].statusCode;
  response.message = messages[type].message[self.conf.language];

  if(!response.code){
    delete response.code;
  }

  return {
    response : response,
    statusCode : messages[type].statusCode
  };
}

// Function to handle errors
self.error = function(err,type){
  return {
    error : err,
    message : errors[type].message[self.conf.language],
    code : errors[type].code,
    statusCode : errors[type].statusCode,
  }

}

module.exports = self;
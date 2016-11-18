var self = this;

self.userOnCreated = {
	code : "001",
	statusCode : "500",
	message : {
		spanish : "No se ha podido crear el usuario.",
		english : "Did not has been create user."
	}
};

self.usersOnGet = {
	code : "002",
	statusCode : "500",
	message : {
		spanish : "Se ha producido un error al tratar de consultar todos los usuarios.",
		english : "An error has occurred trying consult all users."
	}
};
self.userOnCreateBadJSON = {
	code : "003",
	statusCode : "400",
	message : {
		spanish : "El JSON enviado no es válido.",
		english : "The JSON sent is not valid."
	}
};

self.ValidationError = {
	code : "003",
	statusCode : "400",
	message : {
		spanish : "El JSON enviado no es válido.",
		english : "The JSON sent is not valid."
	}
};

module.exports = self;
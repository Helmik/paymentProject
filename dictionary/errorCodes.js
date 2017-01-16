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

self.validationError = {
	code : "003",
	statusCode : "400",
	message : {
		spanish : "El JSON enviado no es válido.",
		english : "The JSON sent is not valid."
	}
};

self.invalidEmail = {
	code : "004",
	statusCode : "400",
	message : {
		spanish : "El formato del correo es inválido.",
		english : "Email format is invalid."
	}
};

self.emailExistAlready = {
	code : "005",
	statusCode : "500",
	message : {
		spanish : "El correo electrónico ya existe",
		english : "The email exists already"
	}
};

self.userNameExistAlready = {
	code : "006",
	statusCode : "500",
	message : {
		spanish : "El usuario ya existe",
		english : "The user name exists already"
	}
};

self.errorDataBaseConnection = {
	code : "007",
	statusCode : "500",
	message : {
		spanish : "No se ha podido establecer conexión con la base de datos.",
		english : "Could not connection to database."
	}
};

self.updateUser = {
	code : "008",
	statusCode : "500",
	message : {
		spanish : "El usuario no se ha podido actualizar.",
		english : "The user has not been update."
	}
};

self.getUserById = {
	code : "009",
	statusCode : "500",
	message : {
		spanish : "El usuario no se ha encontrado.",
		english : "The user has not been find."
	}
};

self.stripePlanCreate = {
	code : "010",
	statusCode : "500",
	message : {
		spanish : "El plan no se ha podido crear.",
		english : "The plan has not been create."
	}
};

self.stripeCustomerCreate = {
	code : "011",
	statusCode : "500",
	message : {
		spanish : "El cliente no se ha podido crear.",
		english : "The customer has not been create."
	}
};

self.stripePlanRetrive = {
	code : "012",
	statusCode : "500",
	message : {
		spanish : "No se ha podido recuperar el plan.",
		english : "The plan has not been retrived."
	}
};

self.stripePlanUpdated = {
	code : "013",
	statusCode : "500",
	message : {
		spanish : "No se ha podido actualizar el plan.",
		english : "The plan has not been updated."
	}
};

self.stripePlanDelete = {
	code : "014",
	statusCode : "500",
	message : {
		spanish : "El plan no se ha eliminado correctamente.",
		english : "The plan has not been eliminado successfully."
	}
};

self.stripePlanGetAll = {
	code : "015",
	statusCode : "500",
	message : {
		spanish : "No se han podido recuperar todos los planes.",
		english : "Cannot retrive all the plans."
	}
};

self.stripCustomerRetrive = {
	code : "016",
	statusCode : "500",
	message : {
		spanish : "No se ha podido recuperar el cliente.",
		english : "The client has not been retrived."
	}
};

self.stripCustomerUpdated = {
	code : "017",
	statusCode : "500",
	message : {
		spanish : "No se ha podido actualizar el cliente.",
		english : "The client has not been updated."
	}
};

self.stripCustomerDelete = {
	code : "018",
	statusCode : "500",
	message : {
		spanish : "El cliente no se ha eliminado correctamente.",
		english : "The client has not been eliminado successfully."
	}
};

self.stripCustomerGetAll = {
	code : "019",
	statusCode : "500",
	message : {
		spanish : "No se han podido recuperar todos los clientes.",
		english : "Cannot retrive all the clients."
	}
};

module.exports = self;
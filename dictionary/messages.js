var self = this;

self.userOnCreated = {
	statusCode : "201",
	message : {
		spanish : "El usuario se ha creado con éxito.",
		english : "The user has been created successfully."
	}
};

self.usersOnGet = {
	statusCode : "200",
	message : {
		spanish : "La consulta para obtener todos los usuarios se ha realizado con éxito.",
		english : "The consult to get all users has been successfully."
	}
};

self.updateUser = {
	statusCode : "200",
	message : {
		spanish : "El usuario se ha actualizado con éxito.",
		english : "The user has been updated successfully."
	}
};

self.getUserById = {
	statusCode : "200",
	message : {
		spanish : "Usuario encontrado.",
		english : "User fnded."
	}
};

self.stripePlanCreate = {
	statusCode : "200",
	message : {
		spanish : "El plan ha sido creado correctamente.",
		english : "The plan has been create successfully."
	}
};

module.exports = self;
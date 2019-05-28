const validator	= require('./validator');
const ERR = require('./validation-errors');

const userValidator = (data) => {
	const errors = {};

	// get form data
	const { 
		name = '',
		email = '',
	} = data;
	

	// User name validations
	if(validator.isEmpty(name)){
		errors.name = ERR.NAME_REQUIRED;
	}

	// Email validations
	if(!validator.isEmail(email)){
		errors.email = ERR.EMAIL_FORMAT;
	}

	if(validator.isEmpty(email)){
		errors.email = ERR.EMAIL_REQUIRED;
	}

	return {
		errors,
		isValid: validator.isEmpty(errors),
	};
}

module.exports = userValidator;
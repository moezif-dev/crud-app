const validator	= require('./validator');
const ERR = require('./validation-errors');
const userValidator = require('./userValidator');

module.exports = {
	ERR,
	userValidator,
	validator,
}
const userValidator = require('./userValidator');
const ERR = require('./validation-errors');

test('Should return a valid user', () => {
	expect( userValidator({ name: "John doe", email: "john.doe@hotmail.com", age: 56}) ).toEqual({
		errors: {},
		isValid: true,
	});
});

test('Should return invalid, with name error', () => {
	expect( userValidator({ email: "john.doe@hotmail.com", age: 56}) ).toEqual({
		errors: { name: ERR.NAME_REQUIRED },
		isValid: false,
	});
});

test('Should return invalid, with name error', () => {
	expect( userValidator({ name: "John doe", age: 56}) ).toEqual({
		errors: { email: ERR.EMAIL_REQUIRED },
		isValid: false,
	});
});
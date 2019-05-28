const validator = require('./validator');

test('isEmpty Should return true for ""', () => {
	expect( validator.isEmpty("") ).toBeTruthy();
});

test('isEmpty Should return true for null', () => {
	expect( validator.isEmpty(null) ).toBeTruthy();
});

test('isEmpty Should return true for {}', () => {
	expect( validator.isEmpty({}) ).toBeTruthy();
});

test('isEmpty Should return false for "not an empty string"', () => {
	expect( validator.isEmpty("not an empty string") ).toBeFalsy();
});

test('isEmail Should return true for "myEmail@test.co"', () => {
	expect( validator.isEmail("myEmail@test.co") ).toBeTruthy();
});

test('isEmail Should return false for "myEmail"', () => {
	expect( validator.isEmail("myEmail") ).toBeFalsy();
});
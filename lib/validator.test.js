const validator = require('./validator');

  // isEmpty: (value) => {
  //   return (
  //     value === undefined ||
  //     value === null ||
  //     (typeof value === 'object' && Object.keys(value).length === 0) ||
  //     (typeof value === 'string' && value.trim().length === 0)
  //   )
  // },

  // isEmail: (value) => {
  // 	const emailRegEx =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // 	return emailRegEx.test(value);
  // }

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
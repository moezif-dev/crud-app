import { isString } from './type-checker';

test("isString for \"String\" to return true", () => {
	expect(isString("String")).toBeTruthy();
});

test("isString for 100 to return false", () => {
	expect(isString(100)).toBeFalsy();
});

test("isString for null to return false", () => {
	expect(isString(null)).toBeFalsy();
});
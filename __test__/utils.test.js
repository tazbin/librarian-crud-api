const {
    isValidObjectId,
    trimAllObjValue
} = require('../utils');

describe('utils test suit', () => {

    test('checks for valid objectId', () => {
        result = isValidObjectId("633c29b0d9c8c94d9a654738");
        expect(result).toBeTruthy();
    });

    test('checks for invalid objectId', () => {
        result = isValidObjectId("633c29b0d9c8c94d9a6547383");
        expect(result).not.toBeTruthy();
    });

    test('trimmed values', () => {
        testObj = {
            name: " Tazbinur",
            address: "Jashore   ",
            age: 50
        };
        expectedObj = {
            name: "Tazbinur",
            address: "Jashore",
            age: 50
        };
        trimAllObjValue(testObj);
        expect(testObj).toEqual(expectedObj);
    });

});
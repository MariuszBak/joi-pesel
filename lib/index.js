"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiPesel = void 0;
var isValidPesel = function (pesel) {
    // checking length and structure
    if (/^[\d]{11}$/.test(pesel) == false)
        return false;
    // checking month (from 2000 year month = month + 20) and day
    var month = parseInt(pesel.substring(2, 4));
    if (month < 1 || month > 32 || (month > 12 && month < 20))
        return false;
    var day = parseInt(pesel.substring(4, 6));
    if (day < 1 || day > 31)
        return false;
    // checking checksum
    var weight = [1, 3, 7, 9];
    var digits = pesel.split('').map(function (digit) { return parseInt(digit, 10); });
    var control = digits.splice(-1)[0];
    var checksum = digits.reduce(function (prev, curr, index) { return prev + curr * weight[index % 4]; }) % 10;
    return 10 - (checksum === 0 ? 10 : checksum) === control;
};
var JoiPesel = function (joi) {
    return {
        type: 'string',
        base: joi.string(),
        messages: {
            'string.pesel': '{{#label}} is incorrect',
        },
        rules: {
            pesel: {
                validate: function (value, _a) {
                    var error = _a.error;
                    if (!isValidPesel(value)) {
                        return error('string.pesel', { value: value });
                    }
                    return value;
                },
            },
        },
    };
};
exports.JoiPesel = JoiPesel;
exports.default = exports.JoiPesel;

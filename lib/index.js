"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiPesel = void 0;
var isValidPesel = function (pesel) {
    // checking length and structure
    if (/^[\d]{11}$/.test(pesel) == false)
        return false;
    // checking month and day
    if ((parseInt(pesel.substring(2, 4)) > 12) || (parseInt(pesel.substring(4, 6)) > 31))
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

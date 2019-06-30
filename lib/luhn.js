"use strict";
/**
 * Luhn algorithm
 *
 * - https://en.wikipedia.org/wiki/Luhn_algorithm
 * - https://zh.wikipedia.org/wiki/Luhn%E7%AE%97%E6%B3%95
 */
Object.defineProperty(exports, "__esModule", { value: true });
var FORMAT_ISVALID = /^[0-9]{2,}$/;
var FORMAT_GENERATE = /^[0-9]{1,}$/;
var CHARCODE_0 = "0".charCodeAt(0);
var MAPPING_EVEN = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
var getLuhnRemainder = function (value) {
    var length = value.length;
    var bit = 0;
    var accumulator = 0;
    while (length > 0) {
        length -= 1;
        bit ^= 1;
        accumulator += bit
            ? value.charCodeAt(length) - CHARCODE_0
            : MAPPING_EVEN[value.charCodeAt(length) - CHARCODE_0];
    }
    return accumulator % 10;
};
var stringifyInput = function (value) {
    if (value !== null && value !== undefined) {
        if (typeof value === "string") {
            return value;
        }
        throw new Error("Expecting value of type 'string', found: '" + typeof value + "'");
    }
    throw new Error("Expecting value of type 'string', found: '" + value + "'");
};
var generate = function (rawValue) {
    var value = stringifyInput(rawValue);
    if (!value.match(FORMAT_GENERATE)) {
        throw new Error("Exception value of format '" + FORMAT_GENERATE + "', found: '" + value + "'");
    }
    return "" + value + (10 - (getLuhnRemainder(value + "0") % 10)).toString();
};
exports.generate = generate;
var validate = function (rawValue) {
    var value = stringifyInput(rawValue);
    if (!value.match(FORMAT_ISVALID)) {
        throw new Error("Exception value of format '" + FORMAT_GENERATE + "', found: '" + value + "'");
    }
    return getLuhnRemainder(value) === 0;
};
exports.validate = validate;
exports.default = {
    validate: validate,
    generate: generate
};

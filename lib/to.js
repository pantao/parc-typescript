"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = require("./is");
exports.integer = function (input) {
    try {
        return parseInt(input);
    }
    catch (_) {
        return input;
    }
};
exports.decimal = function (input) {
    try {
        return parseFloat(input);
    }
    catch (_) {
        return input;
    }
};
exports.date = function (input) {
    if (input instanceof Date) {
        return input;
    }
    if (!isNaN(input) || is_1.digit(input)) {
        var unix = exports.integer(input) * (input.length === 10 ? 1000 : 1);
        return new Date(unix);
    }
    var time = (input || "")
        .trim()
        .replace(/\.\d+/, "") // remove milliseconds
        .replace(/-/, "/")
        .replace(/-/, "/")
        .replace(/(\d)T(\d)/, "$1 $2")
        .replace(/Z/, " UTC") // 2017-2-5T3:57:52Z -> 2017-2-5 3:57:52UTC
        .replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // -04:00 -> -0400
    return new Date(time);
};

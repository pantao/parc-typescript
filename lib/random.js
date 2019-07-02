"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodeCrypto = require("crypto");
exports.getRandomValues = function (buffer) {
    if (typeof window !== "undefined") {
        if (window.crypto && window.crypto.getRandomValues) {
            return window.crypto.getRandomValues(buffer);
        }
    }
    if (nodeCrypto.randomBytes) {
        if (!(buffer instanceof Uint8Array)) {
            throw new TypeError("expected Uint8Array");
        }
        if (buffer.length > 65536) {
            var e = new Error();
            e.message = "Failed to execute 'getRandomValues' on 'Crypto': The ArrayBufferView's byte length (" + buffer.length + ") exceeds the number of bytes of entropy available via this API (65536).";
            e.name = "QuotaExceededError";
            throw e;
        }
        var bytes = nodeCrypto.randomBytes(buffer.length);
        buffer.set(bytes);
        return buffer;
    }
    else {
        throw new Error("No secure random number generator available.");
    }
};
exports.shuffle = function (array) {
    var items = array.slice();
    var length = items.length; // The number of items left to shuffle (loop invariant)
    var randomValues = exports.getRandomValues(new Uint8Array(length)); // Some random values
    var k;
    var t;
    while (length > 1) {
        k = randomValues[length - 1] % length; // 0 <= k < length
        t = items[length]; // swap elements length and k
        length -= 1;
        items[length] = items[k];
        items[k] = t;
    }
    return items;
};
/**
 * 生成指定长度的随机 Pin 码
 *
 * @param length Pin 长度
 */
exports.generatePinNumber = function (length) {
    if (length === void 0) { length = 4; }
    var pinCodeArray = [];
    var seed = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (!length) {
        throw new Error("Missing required param: length");
    }
    if (typeof length !== "number" || length < 1) {
        throw new Error("length is not a whole number");
    }
    for (var i = 0; i < length; i++) {
        var random = exports.shuffle(seed.slice(0));
        pinCodeArray.push(random[0]);
    }
    return pinCodeArray.join("");
};
/**
 * 在区间中生成随机值
 *
 * @param min 最小值
 * @param max 最大值
 */
exports.generateRandomNumberBetween = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

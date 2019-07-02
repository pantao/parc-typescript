"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base64_1 = require("./base64");
exports.removeNonChars = function (variableName) {
    return variableName.replace(/^\W+|\W+$/g, "").split(/,/);
};
/**
 * 清除字符串前后的空白字符
 *
 * @param value string
 */
exports.trim = function (value) {
    return value.replace(/^\s*/, "").replace(/\s*$/, "");
};
/**
 * 解析 url 地址中的变量名称
 *
 * @param {String} url URL地址
 */
exports.extractUrlVariableNames = function (url) {
    var matches = url.match(/\{[^}]+\}/g);
    if (!matches) {
        return [];
    }
    return matches.map(exports.removeNonChars).reduce(function (a, b) { return a.concat(b); }, []);
};
/**
 * 向URL地址中添加查询参数
 *
 * @param {String} url URL 地址
 * @param {Object} parameters 查询对数对象
 */
exports.addQueryParameters = function (url, parameters) {
    if (parameters === void 0) { parameters = {}; }
    var separator = /\?/.test(url) ? "&" : "?";
    var names = Object.keys(parameters);
    if (names.length === 0) {
        return url;
    }
    var query = names
        .map(function (name) { return name + "=" + encodeURIComponent(parameters[name]); })
        .join("&");
    return "" + url + separator + query;
};
/**
 * 模拟 UUID 生成随机伪UUID
 *
 * 这真的只是一个模拟 UUID 的格式生成的随机字符串，并不能保证每一次结果真的都是唯一的，但是在同一个系统中
 * 使用，生成同样值的概率还是足够小了，请谨慎使用。
 *
 * @param length number
 * @param radix number
 */
exports.uniqueId = function (length, radix) {
    if (radix === void 0) { radix = 16; }
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    var segments = [];
    if (length === undefined) {
        segments[8] = segments[13] = segments[18] = segments[23] = "-";
        segments[14] = "4";
        for (var i = 0; i < 36; i += 1) {
            if (segments[i] === undefined) {
                var r = 0 | (Math.random() * 16);
                segments[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    else {
        for (var i = 0; i < length; i += 1) {
            segments[i] = chars[0 | (Math.random() * radix)];
        }
    }
    return segments.join("");
};
/**
 * 为 authorization token 添加类型前缀
 *
 * @param authorization token
 */
exports.withAuthorizationPrefix = function (authorization) {
    if (/^(basic|bearer|token) /i.test(authorization)) {
        return authorization;
    }
    // TODO: 还需要增加对 basic authorization 的支持，判断方法是尝试将 authorization 按 base64 decode，若有结果则为 basic
    try {
        if (/^[\w-]+:/.test(base64_1.decode(authorization))) {
            return "basic " + authorization;
        }
    }
    catch (_) { }
    if (authorization.split(/\./).length === 3) {
        return "bearer " + authorization;
    }
    return "token " + authorization;
};
exports.getBytes = function (str) {
    var bytes = [];
    for (var i = 0; i < str.length; i++) {
        bytes.push(str.charCodeAt(i));
    }
    return bytes;
};
exports.getPRCCitizenIDCheckCode = function (value) {
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
    if (/[\d]{17}/.test(value)) {
        var parityIndex = value
            .substring(0, 17)
            .split("")
            .map(function (number, index) { return parseInt(number) * factor[index]; })
            .reduce(function (a, b) { return a + b; }, 0) % 11;
        return "" + parity[parityIndex];
    }
    return "";
};
/**
 * 遍历数组或者对象，将其元素或者所有属性的值都传递给 `fn` 并执行
 *
 * @param object any
 * @param fn Function
 */
exports.eachCall = function (object, fn) {
    if (object === null || typeof object === "undefined") {
        return;
    }
    var reassigned = typeof object !== "object" ? [object] : object;
    if (Array.isArray(reassigned)) {
        for (var i = 0, l = object.length; i < l; i += 1) {
            fn.call(null, reassigned[i], i, reassigned);
        }
    }
    else {
        for (var key in reassigned) {
            if (Object.prototype.hasOwnProperty.call(reassigned, key)) {
                fn.call(null, reassigned[key], key, reassigned);
            }
        }
    }
};

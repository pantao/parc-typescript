"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var func_1 = require("./func");
var is_1 = require("./is");
exports.deepEqual = function (a, b) {
    if (a === b) {
        return true;
    }
    if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
    }
    if (a !== Object(a) || b !== Object(b)) {
        return false;
    }
    var props = Object.keys(a);
    if (props.length !== Object.keys(b).length) {
        return false;
    }
    return props.every(function (prop) { return exports.deepEqual(a[prop], b[prop]); });
};
/**
 * 将对象的所有 key 转为纯小写的 key
 *
 * @param {Object} object 待转换的对象
 */
exports.lowercaseKeys = function (object) {
    return !object
        ? {}
        : Object.keys(object).reduce(function (newObj, key) {
            var _a;
            return (__assign({}, newObj, (_a = {}, _a[key.toLowerCase()] = object[key], _a)));
        }, {});
};
exports.omit = function (object, keysToOmit) {
    return Object.keys(object)
        .filter(function (option) { return !keysToOmit.includes(option); })
        .reduce(function (obj, key) {
        var _a;
        return (__assign({}, obj, (_a = {}, _a[key] = object[key], _a)));
    }, {});
};
/**
 * 将值转换成为类型名称（小写字母）
 *
 * @param {any} object 待转换的值
 */
exports.classToType = function (object) {
    return "Boolean Number String Function Array Date RegExp Object"
        .split(" ")
        .map(function (c) { return ["[object " + c + "]", c.toLowerCase()]; })
        .reduce(function (a, b) {
        var _a;
        return (__assign({}, a, (_a = {}, _a[b[0]] = b[1], _a)));
    }, {})[Object.prototype.toString.call(object)];
};
/**
 * 将多个对象合并成一个对象
 *
 * @param objects object[]
 */
exports.merge = function () {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    var merged = {};
    var assignValue = function (value, key) {
        if (typeof merged[key] === "object" && typeof value === "object") {
            merged[key] = exports.merge(merged[key], value);
        }
        else {
            merged[key] = value;
        }
    };
    for (var i = 0, l = objects.length; i < l; i += 1) {
        utils_1.eachCall(objects[i], assignValue);
    }
    return merged;
};
/**
 * 深合并
 *
 * @param objects object[]
 */
exports.deepMerge = function () {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    var merged = {};
    var assignValue = function (value, key) {
        if (typeof merged[key] === "object" && typeof value === "object") {
            merged[key] = exports.deepMerge(merged[key], value);
        }
        else if (typeof value === "object") {
            merged[key] = exports.deepMerge({}, value);
        }
        else {
            merged[key] = value;
        }
    };
    for (var i = 0, l = objects.length; i < l; i += 1) {
        utils_1.eachCall(objects[i], assignValue);
    }
    return merged;
};
/**
 * Extend object
 *
 * @param a Object
 * @param b Object
 * @param self bind object
 */
exports.extend = function (a, b, self) {
    utils_1.eachCall(b, function assignValue(value, key) {
        if (self && typeof value === "function") {
            a[key] = func_1.bind(value, self);
        }
        else {
            a[key] = value;
        }
    });
    return a;
};
exports.deepExtend = function deepExtend() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var options;
    var name;
    var src;
    var copy;
    var copyIsArray;
    var clone;
    var target = self;
    var i = 1;
    var length = args.length;
    var deep = false;
    if (typeof target === "boolean") {
        deep = target;
        target = args[1] || {};
        i = 2;
    }
    if (Object(target) !== target && exports.classToType(target) !== "function") {
        target = {};
    }
    if (length === i) {
        target = this;
        i -= 1;
    }
    for (; i < length; i += 1) {
        options = args[i];
        if (options !== null) {
            var keys = Object.keys(options);
            for (i = 0; i < keys.length; i += 1) {
                name = keys[i];
                src = target[name];
                copy = options[name];
                if (target !== copy) {
                    copyIsArray = is_1.array(copy);
                    if (deep && copy && (is_1.plainObject(copy) || copyIsArray)) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && is_1.array(src) ? src : [];
                        }
                        else {
                            clone = src && is_1.plainObject(src) ? src : {};
                        }
                        target[name] = deepExtend(deep, clone, copy);
                    }
                    else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
    }
    return target;
};

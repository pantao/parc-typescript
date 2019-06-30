"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bind = function (fn, self) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return fn.apply(self, args);
    };
};
/**
 * 包装函数为单次执行函数
 *
 * ```js
 * const fn = (a, b) => a + b
 * const ofn = once(fn)
 *
 * console.log(ofn(1, 2)) // => 3
 * console.log(ofn(2, 5)) // => 3
 *
 * const ofns = once(fn, true)
 *
 * console.log(ofns(1, 2)) // => 3
 * console.log(ofns(2, 5)) // => Uncaught Error: fn shouldn't be called more than once
 * ```
 *
 * @param {Function} fn 该包装的函数
 * @param {Boolean} strict 是否严格模式
 */
exports.once = function (fn, strict) {
    if (strict === void 0) { strict = false; }
    var value;
    var called = false;
    function fun() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (called) {
            if (strict) {
                throw new Error(fun.onceError);
            }
            return value;
        }
        called = true;
        if (typeof this === "object") {
            value = fn.apply(this, args);
        }
        else {
            value = fn.apply(void 0, args);
        }
        return value;
    }
    var name = fn.name || 'Function wrapped with "once"';
    fun.onceError = name + " shouldn't be called more than once";
    fun.called = false;
    return fun;
};
/**
 * 节流
 *
 * @param {Function} fn 需要节流的函数
 * @param {Number} wait 阈值
 */
exports.throttle = function (fn, wait) {
    if (wait === void 0) { wait = 250; }
    var pending = false;
    var result;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (pending) {
            return result;
        }
        pending = true;
        if (typeof this === "object") {
            result = fn.call(this, args);
        }
        else {
            result = fn.apply(void 0, args);
        }
        setTimeout(function () {
            pending = false;
        }, wait);
        return result;
    };
};
/**
 * 防抖
 *
 * @param {Function} fn 需要防抖的函数
 * @param {Number} wait 阈值
 */
exports.debounce = function (fn, wait) {
    if (wait === void 0) { wait = 250; }
    var timerId;
    return function (args) {
        var _this = this;
        if (timerId) {
            clearTimeout(timerId);
            timerId = null;
        }
        timerId = setTimeout(function () {
            fn.call.apply(fn, [_this].concat(args));
        }, wait);
    };
};

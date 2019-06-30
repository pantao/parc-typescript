"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
/**
 * 将数字或者数字字符格式化为货币数字
 *
 * @param value any
 * @param strict 是否严格模式
 * @param options 格式化选项
 */
exports.currency = function (value, strict, options) {
    if (strict === void 0) { strict = true; }
    if (options === void 0) { options = { maximumFractionDigits: 1, useGrouping: true }; }
    try {
        return parseFloat(value).toLocaleString("zh-CN", options);
    }
    catch (_) {
        if (strict) {
            throw new TypeError(Object.prototype.toString.call(value) + " is not a number.");
        }
    }
    return value;
};
/**
 * 存储容量转换
 *
 * @param bytes 字节数
 * @param rounding 是否四舍五入
 * @param separator 不同类型的单位值之间的分隔符
 * @param rateOfExchange 换算率
 * @param strict 是否严格模式
 */
exports.storageSize = function (bytes, rounding, separator, rateOfExchange, strict) {
    if (rounding === void 0) { rounding = true; }
    if (separator === void 0) { separator = ","; }
    if (rateOfExchange === void 0) { rateOfExchange = 1024; }
    if (strict === void 0) { strict = true; }
    try {
        var value = typeof bytes === "string" ? parseInt(bytes, 10) : bytes;
        var loop = 0;
        var values = [];
        var units_1 = [];
        while (value > 0 && loop < constants_1.STORAGE_SIZE_UNITS.length) {
            var v = value % Math.pow(rateOfExchange, loop + 1);
            if (v / Math.pow(rateOfExchange, loop)) {
                values.push(v / Math.pow(rateOfExchange, loop));
                units_1.push(constants_1.STORAGE_SIZE_UNITS[loop]);
            }
            value -= v;
            loop += 1;
            if (loop === constants_1.STORAGE_SIZE_UNITS.length && value > 0) {
                values.push(value);
                units_1.push(constants_1.STORAGE_SIZE_UNITS[loop]);
                value = 0;
            }
        }
        Array.prototype.reverse.call(values);
        Array.prototype.reverse.call(units_1);
        var tuples = values
            .map(function (v, i) { return ({ v: v, i: i }); })
            .map(function (_a) {
            var v = _a.v, i = _a.i;
            return ({ v: v, u: units_1[i] });
        });
        if (tuples.length === 1) {
            return [tuples[0].v, tuples[0].u].join("");
        }
        if (rounding) {
            return [
                (tuples[0].v + tuples[1].v / rateOfExchange).toFixed(2),
                tuples[0].u
            ].join("");
        }
        return tuples
            .filter(function (_a) {
            var v = _a.v;
            return v;
        })
            .map(function (_a) {
            var v = _a.v, u = _a.u;
            return "" + v + u;
        })
            .join(separator);
    }
    catch (error) {
        if (strict) {
            throw error;
        }
    }
    return bytes;
};

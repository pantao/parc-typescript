"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var to_1 = require("./to");
var constants_1 = require("./constants");
var DURATION_AGO = "ago";
var DURATION_IN = "in";
/**
 * 得到时间区间的间隔描述
 *
 * @param comparison datetime
 * @param datum datetime
 */
exports.duration = function (comparison, datum, format) {
    // 比较时间点
    var comparisonDate = to_1.date(comparison);
    // 基准时间点
    var datumDate = to_1.date(datum || new Date());
    // 间隔毫秒数
    var milliseconds = comparisonDate.valueOf() - datumDate.valueOf();
    // Ago or In
    var agoOrIn = milliseconds < 0 ? DURATION_AGO : DURATION_IN;
    var uncalculatedUnits = constants_1.DATETIME_UNITS.slice();
    var result = {
        kind: agoOrIn,
        milliseconds: 0,
        seconds: 0,
        minutes: 0,
        hours: 0,
        days: 0,
        weeks: 0,
        months: 0,
        years: 0,
        formatted: ""
    };
    var uncalculatedMilliseconds = Math.abs(milliseconds);
    var maxUnit;
    while (uncalculatedMilliseconds > 0 && uncalculatedUnits.length > 0) {
        var rates = uncalculatedUnits
            .map(function (unit) { return unit[1]; })
            .reduce(function (a, b) { return a * b; }, 1);
        var unit = uncalculatedUnits.pop();
        if (unit === undefined) {
            break;
        }
        var value = Math.floor(uncalculatedMilliseconds / rates);
        if (value > 0) {
            result[unit[0].toLowerCase()] = value;
            if (!maxUnit) {
                maxUnit = [value, unit[0].toLowerCase()];
            }
        }
        uncalculatedMilliseconds -= rates * value;
    }
    var resultFormat = format || agoOrIn === "ago" ? "%v %u %a" : "%a %v %u";
    if (resultFormat !== undefined && Array.isArray(maxUnit)) {
        result.formatted = resultFormat
            .replace("%v", maxUnit[0].toString())
            .replace("%u", maxUnit[1])
            .replace("%a", agoOrIn);
        result.magic = [agoOrIn, maxUnit[1], maxUnit[0]];
    }
    return result;
};

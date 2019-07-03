"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 地球半径（单位：米(m)）
 */
exports.EARTH_RADIUS = 6378137;
/**
 * 度到弧度转换
 *
 * @param {Number} degrees
 */
exports.degreesToRadians = function (degrees) {
    return (degrees * Math.PI) / 180;
};
/**
 * 根据经纬度计算指定半径的球体上两点间的距离
 *
 * @param {Number} radius 球体半径
 * @param {Number} lat1 坐标1经度
 * @param {Number} lon1 坐标1纬度
 * @param {Number} lat2 坐标2经度
 * @param {Number} lon2 坐标2纬度
 */
exports.calculateDistanceBetweenCoordinates = function (radius, lat1, lon1, lat2, lon2) {
    var dLat = exports.degreesToRadians(lat2 - lat1);
    var dLon = exports.degreesToRadians(lon2 - lon1);
    var lat1Radions = exports.degreesToRadians(lat1);
    var lat2Radions = exports.degreesToRadians(lat2);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1Radions) *
            Math.cos(lat2Radions);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return radius * c;
};
/**
 * 计算地球上两点之间的距离
 *
 * @param {Array} coordinates 两点坐标数据
 * @param {String} unit 单位
 */
exports.calculateDistanceBetweenCoordinatesOnEarth = function (coordinates, unit, format) {
    if (unit === void 0) { unit = "km"; }
    if (format === void 0) { format = "labeled"; }
    var fix = function (p) {
        if (!Array.isArray(p))
            return [p.latitude, p.longitude];
        return p;
    };
    var radius = unit.toLowerCase() === "km" ? exports.EARTH_RADIUS / 1000 : exports.EARTH_RADIUS;
    var value = 0;
    if (!Array.isArray(coordinates)) {
        return format === "labeled" ? "0" + unit : 0;
    }
    if (coordinates.length === 4) {
        var lat1 = coordinates[0], lon1 = coordinates[1], lat2 = coordinates[2], lon2 = coordinates[3];
        value = exports.calculateDistanceBetweenCoordinates(radius, lat1, lon1, lat2, lon2);
    }
    else if (coordinates.length === 2) {
        var p1 = coordinates[0], p2 = coordinates[1];
        var args = fix(p1).concat(fix(p2));
        value = exports.calculateDistanceBetweenCoordinatesOnEarth(args, unit, "raw");
    }
    if (value < 1) {
        value *= 1000;
        value = value.toFixed(2);
        return format === "labeled"
            ? value.toLocaleString("zh-CN", {
                maximumFractionDigits: 2,
                useGrouping: true
            }) + "m"
            : value;
    }
    value = typeof value === "number" ? value.toFixed(2) : value;
    return format === "labeled"
        ? "" + value.toLocaleString("zh-CN", {
            maximumFractionDigits: 2,
            useGrouping: true
        }) + unit
        : value;
};

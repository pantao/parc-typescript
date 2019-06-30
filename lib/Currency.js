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
var round = Math.round, pow = Math.pow;
var defaultSettings = {
    symbol: "￥",
    separator: ",",
    decimal: ".",
    formatWithSymbol: false,
    errorOnInvalid: false,
    precision: 2,
    pattern: "!#",
    negativePattern: "-!#"
};
var groupPattern = /(\d)(?=(\d{3})+\b)/g;
var vedicPattern = /(\d)(?=(\d\d)+\d\b)/g;
var rounding = function (value, increment) {
    return round(value / increment) * increment;
};
var Currency = /** @class */ (function () {
    function Currency(value, settings) {
        var _this = this;
        if (settings === void 0) { settings = __assign({}, defaultSettings); }
        this.add = function (number) {
            var _a = _this, initialValue = _a.initialValue, settings = _a.settings, precision = _a.precision;
            return new Currency((initialValue + Currency.parse(number, settings)) / precision, settings);
        };
        this.subtract = function (number) {
            var _a = _this, initialValue = _a.initialValue, settings = _a.settings, precision = _a.precision;
            return new Currency((initialValue - Currency.parse(number, settings)) / precision, settings);
        };
        this.multiply = function (number) {
            var _a = _this, initialValue = _a.initialValue, settings = _a.settings;
            return new Currency((initialValue * number) / pow(10, settings.precision), settings);
        };
        this.divide = function (number) {
            var _a = _this, initialValue = _a.initialValue, settings = _a.settings;
            return new Currency(initialValue / Currency.parse(number, settings, false), settings);
        };
        /**
         * 分分脏
         */
        this.distribute = function (count) {
            var _a = _this, initialValue = _a.initialValue, precision = _a.precision, settings = _a.settings;
            var distribution = [];
            var split = Math[initialValue >= 0 ? "floor" : "ceil"](initialValue / count);
            var pennies = Math.abs(initialValue - split * count);
            for (var i = count; i !== 0; i -= 1) {
                var item = new Currency(split / precision, settings);
                if (pennies > 0) {
                    item =
                        initialValue >= 0
                            ? item.add(1 / precision)
                            : item.subtract(1 / precision);
                }
                pennies -= 1;
                distribution.push(item);
            }
            return distribution;
        };
        this.format = function (useSymbol) {
            var _a = _this.settings, pattern = _a.pattern, negativePattern = _a.negativePattern, formatWithSymbol = _a.formatWithSymbol, symbol = _a.symbol, separator = _a.separator, decimal = _a.decimal, groups = _a.groups;
            var values = _this.toString()
                .replace(/^-/, "")
                .split(".");
            var dollars = values[0];
            var cents = values[1];
            var enableSymbol = typeof useSymbol === undefined ? formatWithSymbol : useSymbol;
            if (pattern === undefined ||
                negativePattern === undefined ||
                groups === undefined) {
                throw new Error("unknown error");
            }
            return (_this.value >= 0 ? pattern : negativePattern)
                .replace("!", enableSymbol ? "" + (symbol || "") : "")
                .replace("#", "" + dollars.replace(groups, "$1" + separator) + (cents ? decimal + cents : ""));
        };
        this.toString = function () {
            var _a = _this, initialValue = _a.initialValue, precision = _a.precision, settings = _a.settings;
            return rounding(initialValue / precision, settings.increment).toFixed(settings.precision);
        };
        this.toJSON = function () { return _this.value; };
        this.settings = __assign({}, defaultSettings, settings);
        this.precision = pow(10, this.settings.precision || 2);
        this.initialValue = Currency.parse(value, this.settings);
        this.value = this.initialValue / this.precision;
        if (this.settings.useVedic) {
            this.settings.groups = vedicPattern;
        }
        else {
            this.settings.groups = groupPattern;
        }
        this.settings.increment = settings.increment || 1 / this.precision;
    }
    Currency.parse = function (value, settings, useRounding) {
        if (settings === void 0) { settings = __assign({}, defaultSettings); }
        if (useRounding === void 0) { useRounding = true; }
        var decimal = settings.decimal, errorOnInvalid = settings.errorOnInvalid, decimals = settings.precision;
        var precision = pow(10, decimals || 2);
        var isNumber = typeof value === "number";
        var v;
        if (isNumber) {
            v = value * precision;
        }
        else if (value instanceof Currency) {
            v = value.value * precision;
        }
        else if (typeof value === "string") {
            var regex = new RegExp("[^-\\d" + decimal + "]", "g");
            var decimalString = new RegExp("\\" + decimal, "g");
            v =
                parseFloat(value
                    .replace(/\((.*)\)/, "-$1")
                    .replace(regex, "")
                    .replace(decimalString, ".")) * precision || 0;
        }
        else {
            if (errorOnInvalid) {
                throw new Error("Invalid input");
            }
            v = 0;
        }
        return useRounding ? round(v) : v;
    };
    return Currency;
}());
exports.default = Currency;

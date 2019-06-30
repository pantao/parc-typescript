"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UrlTemplate = /** @class */ (function () {
    function UrlTemplate(template) {
        var _this = this;
        this.expand = function (context) {
            return UrlTemplate.expandTemplate(_this.template, context);
        };
        if (!template) {
            throw new Error("context must be supplied.");
        }
        this.template = template;
    }
    UrlTemplate.operators = ["+", "#", ".", "/", ";", "?", "&"];
    UrlTemplate.expandTemplate = function (template, context) {
        return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expressionInput, literal) {
            if (expressionInput) {
                var operator_1 = "";
                var expression = expressionInput;
                var values_1 = [];
                if (UrlTemplate.operators.includes(expression.charAt(0))) {
                    operator_1 = expression.charAt(0);
                    expression = expression.substr(1);
                }
                expression.split(/,/g).forEach(function (variable) {
                    var tmp = /([^:*]*)(?::(\d+)|(\*))?/.exec(variable);
                    if (tmp === null) {
                        return;
                    }
                    Array.prototype.push.apply(values_1, UrlTemplate.getValues(context, operator_1, tmp[1], tmp[2] || tmp[3]));
                });
                if (operator_1 && operator_1 !== "+") {
                    var separator = ",";
                    if (operator_1 === "?") {
                        separator = "&";
                    }
                    else if (operator_1 !== "#") {
                        separator = operator_1;
                    }
                    return ((values_1.length !== 0 ? operator_1 : "") + values_1.join(separator));
                }
                return values_1.join(",");
            }
            return UrlTemplate.encodeReserved(literal);
        });
    };
    UrlTemplate.isDefined = function (value) {
        return value !== undefined && value !== null;
    };
    UrlTemplate.isKeyOperator = function (operator) {
        return [";", "&", "?"].includes(operator);
    };
    UrlTemplate.encodeReserved = function (str) {
        return str
            .split(/(%[0-9A-Fa-f]{2})/g)
            .map(function (part) {
            return /%[0-9A-Fa-f]/.test(part)
                ? part
                : encodeURI(part)
                    .replace(/%5B/g, "[")
                    .replace(/%5D/g, "]");
        })
            .join("");
    };
    UrlTemplate.encodeUnreserved = function (str) {
        return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
            return "%" + c
                .charCodeAt(0)
                .toString(16)
                .toUpperCase();
        });
    };
    UrlTemplate.encodeValue = function (operator, value, key) {
        var encodedValue = operator === "+" || operator === "#"
            ? UrlTemplate.encodeReserved(value)
            : UrlTemplate.encodeUnreserved(value);
        if (key) {
            return UrlTemplate.encodeUnreserved(key) + "=" + encodedValue;
        }
        return encodedValue;
    };
    UrlTemplate.getValues = function (context, operator, key, modifier) {
        var value = context[key];
        var result = [];
        if (UrlTemplate.isDefined(value) && value !== "") {
            if (typeof value === "string" ||
                typeof value === "number" ||
                typeof value === "boolean") {
                value = value.toString();
                if (modifier && modifier !== "*") {
                    value = value.substring(0, parseInt(modifier, 10));
                }
                result.push(UrlTemplate.encodeValue(operator, value, UrlTemplate.isKeyOperator(operator) ? key : undefined));
            }
            else if (modifier === "*") {
                if (Array.isArray(value)) {
                    value.filter(UrlTemplate.isDefined).forEach(function (v) {
                        result.push(UrlTemplate.encodeValue(operator, v, UrlTemplate.isKeyOperator(operator) ? key : undefined));
                    });
                }
                else {
                    Object.keys(value).forEach(function (k) {
                        if (UrlTemplate.isDefined(value[k])) {
                            result.push(UrlTemplate.encodeValue(operator, value[k], k));
                        }
                    });
                }
            }
            else {
                var tmp = [];
                if (Array.isArray(value)) {
                    value.filter(UrlTemplate.isDefined).forEach(function (value) {
                        tmp.push(UrlTemplate.encodeValue(operator, value));
                    });
                }
                else {
                    Object.keys(value).forEach(function (k) {
                        if (UrlTemplate.isDefined(value[k])) {
                            tmp.push(UrlTemplate.encodeUnreserved(k));
                            tmp.push(UrlTemplate.encodeValue(operator, value[k].toString()));
                        }
                    });
                }
                if (UrlTemplate.isKeyOperator(operator)) {
                    result.push(UrlTemplate.encodeUnreserved(key) + "=" + tmp.join(","));
                }
                else if (tmp.length !== 0) {
                    result.push(tmp.join(","));
                }
            }
        }
        else if (operator === ";") {
            if (UrlTemplate.isDefined(value)) {
                result.push(UrlTemplate.encodeUnreserved(key));
            }
        }
        else if (value === "" && (operator === "&" || operator === "?")) {
            result.push(UrlTemplate.encodeUnreserved(key) + "=");
        }
        else if (value === "") {
            result.push("");
        }
        return result;
    };
    return UrlTemplate;
}());
exports.default = UrlTemplate;

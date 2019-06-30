"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var patterns = __importStar(require("./patterns"));
var validators_1 = require("./validators");
var toString = Object.prototype.toString;
/**
 * 检测一个字符串是否为手机号
 *
 * @param {String} value 待检测的值
 * @param {Boolean} strict 是否严格模式检测
 *
 * 默认为严格模式
 *
 * 已支持的号段有：
 *
 * - 中国移动：
 *  - 134 135 136 137 138 139
 *  - 182 183 184 187 188
 *  - 150 151 152 157 158 159
 *  - 165
 *  - 172 178(4G)
 *  - 147(上网卡)
 *  - 1440(物联网) 148(物联网)
 *  - 198
 * - 中国联通
 *  - 130 131 132
 *  - 155 156
 *  - 185 186
 *  - 171 175 176(4G)
 *  - 145(上网卡)
 *  - 146(物联网)
 *  - 166
 * - 中国电信
 *  - 133 149 153
 *  - 180 181 189 191
 *  - 173 174 177(4G)
 *  - 1410(物联网)
 *  - 199
 * - 虚拟运营商
 *  - 170 171
 *
 */
exports.mobile = function (value, strict) {
    if (strict === void 0) { strict = true; }
    return strict
        ? patterns.MOBILE_STRICT.test(value)
        : patterns.MOBILE_LOOSE.test(value);
};
/**
 * 是否是一个合法的整数
 *
 * @param value any
 */
exports.integer = function (value) { return patterns.INTEGER.test(value); };
/**
 * 是否只包含数字
 * @param value any
 */
exports.digit = function (value) { return patterns.DIGIT.test(value); };
/**
 * 是否是一个合法数字
 *
 * @param value any
 */
exports.number = function (value) { return patterns.NUMBER.test(value); };
/**
 * 是否是纯字母
 * @param value any
 */
exports.alpha = function (value) { return patterns.ALPHA.test(value); };
/**
 * 是否是纯小写
 *
 * @param value any
 */
exports.lowerCase = function (value) {
    return patterns.LOWER_CASE.test(value);
};
/**
 * 是否是大写字母
 *
 * @param value any
 */
exports.upperCase = function (value) {
    return patterns.UPPER_CASE.test(value);
};
/**
 * 是否是纯字母或者汉字
 *
 * @param value any
 */
exports.character = function (value) {
    return patterns.CHARACTER.test(value);
};
/**
 * 是否是合法的货币数字
 *
 * @param value any
 */
exports.currency = function (value) {
    return patterns.CURRENCY.test(value);
};
exports.date = function (value) { return patterns.DATE.test(value); };
exports.time = function (value) { return patterns.TIME.test(value); };
exports.fulltime = function (value) {
    return patterns.FULLTIME.test(value);
};
exports.hex = function (value) { return patterns.HEX.test(value); };
exports.hexa = function (value) { return patterns.HEXA.test(value); };
exports.hexOrHexa = function (value) {
    return patterns.HEX_OR_HEXA.test(value);
};
exports.rgb = function (value) { return patterns.RGB.test(value); };
exports.rgba = function (value) { return patterns.RGBA.test(value); };
exports.rgbOrRgba = function (value) { return exports.rgb(value) || exports.rgba(value); };
/**
 * 判断值是否为一个合法的颜色值
 * @param value any
 */
exports.color = function (value) {
    return exports.rgbOrRgba(value) || exports.hexOrHexa(value);
};
/**
 * 判断值是否为 Array
 * @param value any
 */
exports.array = function (value) {
    return Array.isArray
        ? Array.isArray(value)
        : toString.call(value) === "[object Array]";
};
/**
 * 判断值是否为 ArrayBuffer
 * @param value any
 */
exports.arrayBuffer = function (value) {
    return toString.call(value) === "[object ArrayBuffer]";
};
/**
 * 判断值是否为 FormData
 * @param value any
 */
exports.formData = function (value) {
    return typeof FormData !== "undefined" && value instanceof FormData;
};
/**
 * 检测一个值是否为 ArrayBuffer view
 * @param value any
 */
exports.arrayBufferView = function (value) {
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        return ArrayBuffer.isView(value);
    }
    return value && value.buffer && value.buffer instanceof ArrayBuffer;
};
/**
 * 测试一个值是否是对象
 *
 * @param {any} value 待检测的值
 */
exports.object = function (value) {
    return value != null && typeof value === "object" && Array.isArray(value) === false;
};
/**
 * 检测一个值是否为文件
 *
 * @param value any
 */
exports.file = function (value) {
    return toString.call(value) === "[object File]";
};
/**
 * 检测一个值是否为 Blob
 * @param value any
 */
exports.blob = function (value) {
    return toString.call(value) === "[object Blob]";
};
/**
 * 测试一个值是否是 Object 对象
 *
 * ```js
 * function fun () {}
 *
 * console.log(toString.call(fun)) // => [object Function]
 * ```
 *
 * @param {any} value 待检测的值
 */
exports.objectObject = function (value) {
    return exports.object(value) === true && toString.call(value) === "[object Object]";
};
/**
 * 测试一个值是否是 纯对象
 *
 * @param {any} value 待检测的值
 */
exports.plainObject = function (value) {
    if (exports.objectObject(exports.object) === false)
        return false;
    // 构建函数是否被修改过？
    var ctor = value.constructor;
    if (typeof ctor !== "function")
        return false;
    // 原型链是否被修改过？
    var prot = ctor.prototype;
    if (exports.objectObject(prot) === false)
        return false;
    // 构建函数是否存在只有对象才有的特殊方法 isPrototypeOf
    if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
        return false;
    }
    // 大概是个真的纯对象吧
    return true;
};
/**
 * 检测一个值是否为 Function
 *
 * @param {any} fn 待检测值
 */
exports.func = function (fn) {
    return fn && toString.call(fn) === "[object Function]";
};
/**
 * 检测一个值是否为异步函数（AsyncFunction）
 * @param {any} fn 待检测值
 */
exports.asyncFunc = function (fn) {
    return fn && toString.call(fn) === "[object AsyncFunction]";
};
exports.string = function (value) { return typeof value === "string"; };
exports.undef = function (value) { return typeof value === "undefined"; };
exports.regexp = function (value) {
    return toString.call(value) === "[object RegExp]";
};
/**
 * 是否为 Stream
 *
 * @param value any
 */
exports.stream = function (value) {
    return exports.object(value) && exports.func(value.pipe);
};
/**
 * 是否为 URLSearchParams
 *
 * @param value any
 */
exports.urlSearchParams = function (value) {
    return typeof URLSearchParams !== "undefined" && value instanceof URLSearchParams;
};
/**
 * 是否是可打印字
 *
 * @param {any} value 待检测的值
 */
exports.printableChar = function (value) {
    return (value > 47 && value < 58) || // 数字
        value === 32 ||
        value === 13 || // 空格，回车
        (value > 64 && value < 91) || // 字符
        (value > 95 && value < 112) || // 数字键盘
        (value > 185 && value < 193) || // ;=,-./`
        (value > 218 && value < 223);
};
/**
 * 是否为中华人民共和国居民身份证号码
 * @param value any
 */
exports.prcCitizenID = function (value, strict) {
    if (strict === void 0) { strict = true; }
    return strict ? validators_1.prcCitizenID(value) : patterns.PRC_CITIZEN_ID.test(value);
};
/**
 * 检测当前环境是否为标准的浏览器环境
 */
exports.standardBrowserEnvironment = function () {
    if (typeof navigator !== "undefined" &&
        (navigator.product === "ReactNative" ||
            navigator.product === "NativeScript" ||
            navigator.product === "NS")) {
        return false;
    }
    return typeof window !== "undefined" && typeof document !== "undefined";
};

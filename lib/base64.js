"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var InvalidCharacterError = /** @class */ (function (_super) {
    __extends(InvalidCharacterError, _super);
    function InvalidCharacterError(message) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = "InvalidCharacterError";
        return _this;
    }
    return InvalidCharacterError;
}(Error));
var throwError = function (message) {
    throw new InvalidCharacterError(message);
};
var TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
// http://whatwg.org/html/common-microsyntaxes.html#space-character
var REGEX_SPACE_CHARACTERS = /<%= spaceCharacters %>/g;
// `decode` is designed to be fully compatible with `atob` as described in the
// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
// The optimized base64-decoding algorithm used is based on @atk’s excellent
// implementation. https://gist.github.com/atk/1020396
exports.decode = function (input) {
    input = String(input).replace(REGEX_SPACE_CHARACTERS, "");
    var length = input.length;
    if (length % 4 == 0) {
        input = input.replace(/==?$/, "");
        length = input.length;
    }
    if (length % 4 == 1 ||
        // http://whatwg.org/C#alphanumeric-ascii-characters
        /[^+a-zA-Z0-9/]/.test(input)) {
        throwError("Invalid character: the string to be decoded is not correctly encoded.");
    }
    var bitCounter = 0;
    var bitStorage = 0;
    var buffer;
    var output = "";
    var position = -1;
    while (++position < length) {
        buffer = TABLE.indexOf(input.charAt(position));
        bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
        // Unless this is the first of a group of 4 characters…
        if (bitCounter++ % 4) {
            // …convert the first 8 bits to a single ASCII character.
            output += String.fromCharCode(0xff & (bitStorage >> ((-2 * bitCounter) & 6)));
        }
    }
    return output;
};
// `encode` is designed to be fully compatible with `btoa` as described in the
// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
exports.encode = function (input) {
    input = String(input);
    if (/[^\0-\xFF]/.test(input)) {
        // Note: no need to special-case astral symbols here, as surrogates are
        // matched, and the input is supposed to only contain ASCII anyway.
        throwError("The string to be encoded contains characters outside of the " +
            "Latin1 range.");
    }
    var padding = input.length % 3;
    var output = "";
    var position = -1;
    var a;
    var b;
    var c;
    var buffer;
    // Make sure any padding is handled outside of the loop.
    var length = input.length - padding;
    while (++position < length) {
        // Read three bytes, i.e. 24 bits.
        a = input.charCodeAt(position) << 16;
        b = input.charCodeAt(++position) << 8;
        c = input.charCodeAt(++position);
        buffer = a + b + c;
        // Turn the 24 bits into four chunks of 6 bits each, and append the
        // matching character for each of them to the output.
        output +=
            TABLE.charAt((buffer >> 18) & 0x3f) +
                TABLE.charAt((buffer >> 12) & 0x3f) +
                TABLE.charAt((buffer >> 6) & 0x3f) +
                TABLE.charAt(buffer & 0x3f);
    }
    if (padding == 2) {
        a = input.charCodeAt(position) << 8;
        b = input.charCodeAt(++position);
        buffer = a + b;
        output +=
            TABLE.charAt(buffer >> 10) +
                TABLE.charAt((buffer >> 4) & 0x3f) +
                TABLE.charAt((buffer << 2) & 0x3f) +
                "=";
    }
    else if (padding == 1) {
        buffer = input.charCodeAt(position);
        output +=
            TABLE.charAt(buffer >> 2) + TABLE.charAt((buffer << 4) & 0x3f) + "==";
    }
    return output;
};

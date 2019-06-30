"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var patterns_1 = require("./patterns");
var utils_1 = require("./utils");
exports.prcCitizenID = function (value) {
    var checkCode = value.substring(17).toUpperCase();
    if (patterns_1.PRC_CITIZEN_ID.test(value)) {
        return utils_1.getPRCCitizenIDCheckCode(value.substring(0, 17)) === "" + checkCode;
    }
    return false;
};

export const MOBILE_LOOSE = /^[1]([0-9])[0-9]{9}$/;
export const MOBILE_STRICT = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;

/**
 * 中华人民共和国，居民身份证号
 */
export const PRC_CITIZEN_ID = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

/**
 * 只包含数字的字符验证正则
 */
export const INTEGER = /^[+-]?[0-9]*$/;

/**
 * 只有数字
 */
export const DIGIT = /^[0-9]+$/;

/**
 * 数字
 */
export const NUMBER = /^[+-]?[0-9]+[.]?[0-9]+$/;

/**
 * 只有 大小写字母
 */
export const ALPHA = /^[a-zA-Z]+$/;

/**
 * 只包含 a-z 小写字母
 */
export const LOWER_CASE = /^[a-z]+$/;

/**
 * 只包含 A-Z 大写字母
 */
export const UPPER_CASE = /^[A-Z]+$/;

/**
 * 只包含数字和字母的字符验证正则
 */
export const NUMBER_ALPHA = /^[a-z0-9A-Z]+$/;

/**
 * 只有大小写字母+数字以及中文字符
 */
export const CHARACTER = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;

/**
 * 货币数字验证
 */
export const CURRENCY = /^\d+(\.\d{0,2})?$/;

export const TIME = /^([0-1]?\d|2[0-3]):[0-5]\d$/;

export const FULLTIME = /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/;

export const TIME_OR_FULLTIME = /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;

export const DATE = /^-?[\d]+\/[0-1]\d\/[0-3]\d$/;

export const HEX = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/;
export const HEXA = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/;
export const HEX_OR_HEXA = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
export const RGB = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/;
export const RGBA = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/;

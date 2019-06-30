export declare type IsFunction = (value: any, ...options: any) => boolean;
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
export declare const mobile: IsFunction;
/**
 * 是否是一个合法的整数
 *
 * @param value any
 */
export declare const integer: IsFunction;
/**
 * 是否只包含数字
 * @param value any
 */
export declare const digit: IsFunction;
/**
 * 是否是一个合法数字
 *
 * @param value any
 */
export declare const number: IsFunction;
/**
 * 是否是纯字母
 * @param value any
 */
export declare const alpha: IsFunction;
/**
 * 是否是纯小写
 *
 * @param value any
 */
export declare const lowerCase: IsFunction;
/**
 * 是否是大写字母
 *
 * @param value any
 */
export declare const upperCase: IsFunction;
/**
 * 是否是纯字母或者汉字
 *
 * @param value any
 */
export declare const character: IsFunction;
/**
 * 是否是合法的货币数字
 *
 * @param value any
 */
export declare const currency: IsFunction;
export declare const date: IsFunction;
export declare const time: IsFunction;
export declare const fulltime: IsFunction;
export declare const hex: IsFunction;
export declare const hexa: IsFunction;
export declare const hexOrHexa: IsFunction;
export declare const rgb: IsFunction;
export declare const rgba: IsFunction;
export declare const rgbOrRgba: IsFunction;
/**
 * 判断值是否为一个合法的颜色值
 * @param value any
 */
export declare const color: IsFunction;
/**
 * 判断值是否为 Array
 * @param value any
 */
export declare const array: IsFunction;
/**
 * 判断值是否为 ArrayBuffer
 * @param value any
 */
export declare const arrayBuffer: IsFunction;
/**
 * 判断值是否为 FormData
 * @param value any
 */
export declare const formData: IsFunction;
/**
 * 检测一个值是否为 ArrayBuffer view
 * @param value any
 */
export declare const arrayBufferView: IsFunction;
/**
 * 测试一个值是否是对象
 *
 * @param {any} value 待检测的值
 */
export declare const object: IsFunction;
/**
 * 检测一个值是否为文件
 *
 * @param value any
 */
export declare const file: IsFunction;
/**
 * 检测一个值是否为 Blob
 * @param value any
 */
export declare const blob: IsFunction;
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
export declare const objectObject: IsFunction;
/**
 * 测试一个值是否是 纯对象
 *
 * @param {any} value 待检测的值
 */
export declare const plainObject: IsFunction;
/**
 * 检测一个值是否为 Function
 *
 * @param {any} fn 待检测值
 */
export declare const func: IsFunction;
/**
 * 检测一个值是否为异步函数（AsyncFunction）
 * @param {any} fn 待检测值
 */
export declare const asyncFunc: IsFunction;
export declare const string: IsFunction;
export declare const undef: IsFunction;
export declare const regexp: IsFunction;
/**
 * 是否为 Stream
 *
 * @param value any
 */
export declare const stream: IsFunction;
/**
 * 是否为 URLSearchParams
 *
 * @param value any
 */
export declare const urlSearchParams: IsFunction;
/**
 * 是否是可打印字
 *
 * @param {any} value 待检测的值
 */
export declare const printableChar: IsFunction;
/**
 * 是否为中华人民共和国居民身份证号码
 * @param value any
 */
export declare const prcCitizenID: IsFunction;
/**
 * 检测当前环境是否为标准的浏览器环境
 */
export declare const standardBrowserEnvironment: IsFunction;
//# sourceMappingURL=is.d.ts.map
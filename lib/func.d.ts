export declare const bind: (fn: Function, self: any) => Function;
/**
 * 包装函数为单次执行函数
 *
 * ```js
 * const fn = (a, b) => a + b
 * const ofn = once(fn)
 *
 * console.log(ofn(1, 2)) // => 3
 * console.log(ofn(2, 5)) // => 3
 *
 * const ofns = once(fn, true)
 *
 * console.log(ofns(1, 2)) // => 3
 * console.log(ofns(2, 5)) // => Uncaught Error: fn shouldn't be called more than once
 * ```
 *
 * @param {Function} fn 该包装的函数
 * @param {Boolean} strict 是否严格模式
 */
export declare const once: (fn: Function, strict?: boolean) => Function;
/**
 * 节流
 *
 * @param {Function} fn 需要节流的函数
 * @param {Number} wait 阈值
 */
export declare const throttle: (fn: Function, wait?: number) => (this: any, ...args: any[]) => any;
/**
 * 防抖
 *
 * @param {Function} fn 需要防抖的函数
 * @param {Number} wait 阈值
 */
export declare const debounce: (fn: Function, wait?: number) => (this: any, args: any[]) => void;
//# sourceMappingURL=func.d.ts.map
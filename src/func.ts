export const bind = (fn: Function, self: any): Function => {
  return (...args: any[]) => {
    return fn.apply(self, args);
  };
};

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
export const once = (fn: Function, strict = false): Function => {
  let value: any;
  let called: boolean = false;
  function fun(this: any, ...args: any[]): any {
    if (called) {
      if (strict) {
        throw new Error(fun.onceError);
      }
      return value;
    }
    called = true;
    if (typeof this === "object") {
      value = fn.apply(this, args);
    } else {
      value = fn(...args);
    }
    return value;
  }
  const name = fn.name || 'Function wrapped with "once"';
  fun.onceError = `${name} shouldn't be called more than once`;
  fun.called = false;
  return fun;
};

/**
 * 节流
 *
 * @param {Function} fn 需要节流的函数
 * @param {Number} wait 阈值
 */
export const throttle = (fn: Function, wait = 250) => {
  let pending = false;
  let result: any;

  return function(this: any, ...args: any[]): any {
    if (pending) {
      return result;
    }

    pending = true;

    if (typeof this === "object") {
      result = fn.call(this, args);
    } else {
      result = fn(...args);
    }

    setTimeout(() => {
      pending = false;
    }, wait);

    return result;
  };
};

/**
 * 防抖
 *
 * @param {Function} fn 需要防抖的函数
 * @param {Number} wait 阈值
 */
export const debounce = (fn: Function, wait = 250) => {
  let timerId: any;

  return function(this: any, args: any[]) {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    timerId = setTimeout(() => {
      fn.call(this, ...args);
    }, wait);
  };
};

import { eachCall } from "./utils";
import { bind } from "./func";
import { array as isArray, plainObject as isPlainObject } from "./is";

export const deepEqual: (a: any, b: any) => boolean = (a, b) => {
  if (a === b) {
    return true;
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (a !== Object(a) || b !== Object(b)) {
    return false;
  }

  const props = Object.keys(a);

  if (props.length !== Object.keys(b).length) {
    return false;
  }

  return props.every(prop => deepEqual(a[prop], b[prop]));
};

/**
 * 将对象的所有 key 转为纯小写的 key
 *
 * @param {Object} object 待转换的对象
 */
export const lowercaseKeys = (object: {
  [key: string]: any;
}): { [key: string]: any } =>
  !object
    ? {}
    : Object.keys(object).reduce(
        (newObj, key) => ({
          ...newObj,
          [key.toLowerCase()]: object[key]
        }),
        {}
      );

export const omit = (
  object: {
    [key: string]: any;
  },
  keysToOmit: string[]
) =>
  Object.keys(object)
    .filter(option => !keysToOmit.includes(option))
    .reduce(
      (obj, key) => ({
        ...obj,
        [key]: object[key]
      }),
      {} as any
    );

/**
 * 将值转换成为类型名称（小写字母）
 *
 * @param {any} object 待转换的值
 */
export const classToType = (object: any): string =>
  "Boolean Number String Function Array Date RegExp Object"
    .split(" ")
    .map(c => [`[object ${c}]`, c.toLowerCase()])
    .reduce((a, b) => ({ ...a, [b[0]]: b[1] }), {} as any)[
    Object.prototype.toString.call(object)
  ];

/**
 * 将多个对象合并成一个对象
 *
 * @param objects object[]
 */
export const merge = (...objects: any[]): any => {
  const merged: any = {};

  const assignValue = (value: any, key: string) => {
    if (typeof merged[key] === "object" && typeof value === "object") {
      merged[key] = merge(merged[key], value);
    } else {
      merged[key] = value;
    }
  };

  for (let i = 0, l = objects.length; i < l; i += 1) {
    eachCall(objects[i], assignValue);
  }

  return merged;
};

/**
 * 深合并
 *
 * @param objects object[]
 */
export const deepMerge = (...objects: any[]): any => {
  const merged: any = {};
  const assignValue = (value: any, key: string) => {
    if (typeof merged[key] === "object" && typeof value === "object") {
      merged[key] = deepMerge(merged[key], value);
    } else if (typeof value === "object") {
      merged[key] = deepMerge({}, value);
    } else {
      merged[key] = value;
    }
  };

  for (let i = 0, l = objects.length; i < l; i += 1) {
    eachCall(objects[i], assignValue);
  }

  return merged;
};

/**
 * Extend object
 *
 * @param a Object
 * @param b Object
 * @param self bind object
 */
export const extend = (a: any, b: any, self: any): any => {
  eachCall(b, function assignValue(value: any, key: string) {
    if (self && typeof value === "function") {
      a[key] = bind(value, self);
    } else {
      a[key] = value;
    }
  });
  return a;
};

export const deepExtend = function deepExtend(this: void, ...args: any): any {
  let options;
  let name;
  let src;
  let copy;
  let copyIsArray;
  let clone;
  let target: any = self;
  let i = 1;
  const { length } = args;
  let deep = false;

  if (typeof target === "boolean") {
    deep = target;
    target = args[1] || {};
    i = 2;
  }

  if (Object(target) !== target && classToType(target) !== "function") {
    target = {} as any;
  }
  if (length === i) {
    target = this;
    i -= 1;
  }

  for (; i < length; i += 1) {
    options = args[i];
    if (options !== null) {
      const keys = Object.keys(options);
      for (i = 0; i < keys.length; i += 1) {
        name = keys[i];
        src = target[name];
        copy = options[name];

        if (target !== copy) {
          copyIsArray = isArray(copy);
          if (deep && copy && (isPlainObject(copy) || copyIsArray)) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && isArray(src) ? src : [];
            } else {
              clone = src && isPlainObject(src) ? src : {};
            }

            target[name] = deepExtend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
  }

  return target;
};

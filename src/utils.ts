import { decode as base64Decode } from "./base64";

export const removeNonChars = (variableName: string): string[] =>
  variableName.replace(/^\W+|\W+$/g, "").split(/,/);

/**
 * 清除字符串前后的空白字符
 *
 * @param value string
 */
export const trim = (value: string): string =>
  value.replace(/^\s*/, "").replace(/\s*$/, "");

/**
 * 解析 url 地址中的变量名称
 *
 * @param {String} url URL地址
 */
export const extractUrlVariableNames: (url: string) => string[] = (
  url: string
) => {
  const matches = url.match(/\{[^}]+\}/g);

  if (!matches) {
    return [];
  }

  return matches.map(removeNonChars).reduce((a, b) => a.concat(b), []);
};

/**
 * 向URL地址中添加查询参数
 *
 * @param {String} url URL 地址
 * @param {Object} parameters 查询对数对象
 */
export const addQueryParameters = (
  url: string,
  parameters: { [key: string]: any } = {}
) => {
  const separator = /\?/.test(url) ? "&" : "?";
  const names = Object.keys(parameters);

  if (names.length === 0) {
    return url;
  }

  const query = names
    .map(name => `${name}=${encodeURIComponent(parameters[name])}`)
    .join("&");

  return `${url}${separator}${query}`;
};

/**
 * 模拟 UUID 生成随机伪UUID
 *
 * 这真的只是一个模拟 UUID 的格式生成的随机字符串，并不能保证每一次结果真的都是唯一的，但是在同一个系统中
 * 使用，生成同样值的概率还是足够小了，请谨慎使用。
 *
 * @param length number
 * @param radix number
 */
export const uniqueId = (length?: number, radix = 16): string => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
    ""
  );
  const segments: string[] = [];

  if (length === undefined) {
    segments[8] = segments[13] = segments[18] = segments[23] = "-";
    segments[14] = "4";

    for (let i = 0; i < 36; i += 1) {
      if (segments[i] === undefined) {
        const r = 0 | (Math.random() * 16);
        segments[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  } else {
    for (let i = 0; i < length; i += 1) {
      segments[i] = chars[0 | (Math.random() * radix)];
    }
  }
  return segments.join("");
};

/**
 * 为 authorization token 添加类型前缀
 *
 * @param authorization token
 */
export const withAuthorizationPrefix = (authorization: string): string => {
  if (/^(basic|bearer|token) /i.test(authorization)) {
    return authorization;
  }

  // TODO: 还需要增加对 basic authorization 的支持，判断方法是尝试将 authorization 按 base64 decode，若有结果则为 basic
  try {
    if (/^[\w-]+:/.test(base64Decode(authorization))) {
      return `basic ${authorization}`;
    }
  } catch (_) {}

  if (authorization.split(/\./).length === 3) {
    return `bearer ${authorization}`;
  }

  return `token ${authorization}`;
};

export const getBytes = (str: string): number[] => {
  const bytes: number[] = [];
  for (var i = 0; i < str.length; i++) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
};

export const getPRCCitizenIDCheckCode = (value: string) => {
  const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
  if (/[\d]{17}/.test(value)) {
    const parityIndex =
      value
        .substring(0, 17)
        .split("")
        .map(
          (number: string, index: number) => parseInt(number) * factor[index]
        )
        .reduce((a, b) => a + b, 0) % 11;
    return `${parity[parityIndex]}`;
  }
  return "";
};

/**
 * 遍历数组或者对象，将其元素或者所有属性的值都传递给 `fn` 并执行
 *
 * @param object any
 * @param fn Function
 */
export const eachCall = (object: any, fn: Function): void => {
  if (object === null || typeof object === "undefined") {
    return;
  }

  const reassigned = typeof object !== "object" ? [object] : object;

  if (Array.isArray(reassigned)) {
    for (let i = 0, l = object.length; i < l; i += 1) {
      fn.call(null, reassigned[i], i, reassigned);
    }
  } else {
    for (let key in reassigned) {
      if (Object.prototype.hasOwnProperty.call(reassigned, key)) {
        fn.call(null, reassigned[key], key, reassigned);
      }
    }
  }
};

/**
 * 生成指定长度的随机 Pin 码
 *
 * @param length Pin 长度
 */
export const generatePinNumber = (length = 4): string => {
  const buffer = new Uint32Array([1]);
  crypto.getRandomValues(buffer);
  const pin = String(buffer[0]).substring(0, length);

  let sameCount = 0;
  let seqCount = 0;
  let curDigit;
  let lastDigit;
  for (var i = 0; i < pin.length; i += 1) {
    curDigit = pin[i];

    if (curDigit === lastDigit) {
      sameCount += 1;
    } else {
      sameCount = 0;
    }

    if (Number(curDigit) === Number(lastDigit) + 1) {
      seqCount += 1;
    } else {
      seqCount = 0;
    }

    if (seqCount === 2 || sameCount === 2) {
      return generatePinNumber();
    }
    lastDigit = curDigit;
  }

  return pin;
};

/**
 * 在区间中生成随机值
 *
 * @param min 最小值
 * @param max 最大值
 */
export const generateRandomNumberBetween = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;

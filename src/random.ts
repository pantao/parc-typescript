const nodeCrypto = require("crypto");

export const getRandomValues = (buffer: Uint8Array) => {
  if (typeof window !== "undefined") {
    if (window.crypto && window.crypto.getRandomValues) {
      return window.crypto.getRandomValues(buffer);
    }
  }
  if (nodeCrypto.randomBytes) {
    if (!(buffer instanceof Uint8Array)) {
      throw new TypeError("expected Uint8Array");
    }
    if (buffer.length > 65536) {
      const e = new Error();
      e.message = `Failed to execute 'getRandomValues' on 'Crypto': The ArrayBufferView's byte length (${
        buffer.length
      }) exceeds the number of bytes of entropy available via this API (65536).`;
      e.name = "QuotaExceededError";
      throw e;
    }
    var bytes = nodeCrypto.randomBytes(buffer.length);
    buffer.set(bytes);
    return buffer;
  } else {
    throw new Error("No secure random number generator available.");
  }
};

export const shuffle = (array: any[]): any[] => {
  let items = [...array];
  let length = items.length; // The number of items left to shuffle (loop invariant)
  const randomValues = getRandomValues(new Uint8Array(length)); // Some random values
  let k;
  let t;
  while (length > 1) {
    k = randomValues[length - 1] % length; // 0 <= k < length
    t = items[length]; // swap elements length and k
    length -= 1;
    items[length] = items[k];
    items[k] = t;
  }
  return items;
};

/**
 * 生成指定长度的随机 Pin 码
 *
 * @param length Pin 长度
 */
export const generatePinNumber = (length = 4): string => {
  var pinCodeArray = [];
  const seed = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (!length) {
    throw new Error("Missing required param: length");
  }

  if (typeof length !== "number" || length < 1) {
    throw new Error("length is not a whole number");
  }

  for (var i = 0; i < length; i++) {
    const random = shuffle(seed.slice(0));
    pinCodeArray.push(random[0]);
  }

  return pinCodeArray.join("");
};

/**
 * 在区间中生成随机值
 *
 * @param min 最小值
 * @param max 最大值
 */
export const generateRandomNumberBetween = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;

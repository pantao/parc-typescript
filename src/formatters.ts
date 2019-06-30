import { STORAGE_SIZE_UNITS } from "./constants";

export type FormatterFunction = (value: any, ...options: any) => any;

export type CurrencyOptions = {
  maximumFractionDigits: number;
  useGrouping: boolean;
  [option: string]: any;
};

/**
 * 将数字或者数字字符格式化为货币数字
 *
 * @param value any
 * @param strict 是否严格模式
 * @param options 格式化选项
 */
export const currency: FormatterFunction = (
  value: any,
  strict = true,
  options: CurrencyOptions = { maximumFractionDigits: 1, useGrouping: true }
) => {
  try {
    return parseFloat(value).toLocaleString("zh-CN", options);
  } catch (_) {
    if (strict) {
      throw new TypeError(
        `${Object.prototype.toString.call(value)} is not a number.`
      );
    }
  }
  return value;
};

/**
 * 存储容量转换
 *
 * @param bytes 字节数
 * @param rounding 是否四舍五入
 * @param separator 不同类型的单位值之间的分隔符
 * @param rateOfExchange 换算率
 * @param strict 是否严格模式
 */
export const storageSize: FormatterFunction = (
  bytes: number | string,
  rounding = true,
  separator = ",",
  rateOfExchange = 1024,
  strict = true
) => {
  try {
    let value = typeof bytes === "string" ? parseInt(bytes, 10) : bytes;
    let loop = 0;
    const values: number[] = [];
    const units: string[] = [];

    while (value > 0 && loop < STORAGE_SIZE_UNITS.length) {
      let v = value % Math.pow(rateOfExchange, loop + 1);
      if (v / Math.pow(rateOfExchange, loop)) {
        values.push(v / Math.pow(rateOfExchange, loop));
        units.push(STORAGE_SIZE_UNITS[loop]);
      }
      value -= v;
      loop += 1;
      if (loop === STORAGE_SIZE_UNITS.length && value > 0) {
        values.push(value);
        units.push(STORAGE_SIZE_UNITS[loop]);
        value = 0;
      }
    }
    Array.prototype.reverse.call(values);
    Array.prototype.reverse.call(units);

    const tuples: { v: number; u: string }[] = values
      .map((v, i) => ({ v, i }))
      .map(({ v, i }) => ({ v, u: units[i] }));

    if (tuples.length === 1) {
      return [tuples[0].v, tuples[0].u].join("");
    }
    if (rounding) {
      return [
        (tuples[0].v + tuples[1].v / rateOfExchange).toFixed(2),
        tuples[0].u
      ].join("");
    }
    return tuples
      .filter(({ v }) => v)
      .map(({ v, u }) => `${v}${u}`)
      .join(separator);
  } catch (error) {
    if (strict) {
      throw error;
    }
  }
  return bytes;
};

import { digit as isDigit } from "./is";

export const integer = (input: any): number => {
  try {
    return parseInt(input);
  } catch (_) {
    return input;
  }
};

export const decimal = (input: any): number => {
  try {
    return parseFloat(input);
  } catch (_) {
    return input;
  }
};

export const date = (input: any): Date => {
  if (input instanceof Date) {
    return input;
  }

  if (!isNaN(input) || isDigit(input)) {
    const unix = integer(input) * (input.length === 10 ? 1000 : 1);
    return new Date(unix);
  }

  const time = (input || "")
    .trim()
    .replace(/\.\d+/, "") // remove milliseconds
    .replace(/-/, "/")
    .replace(/-/, "/")
    .replace(/(\d)T(\d)/, "$1 $2")
    .replace(/Z/, " UTC") // 2017-2-5T3:57:52Z -> 2017-2-5 3:57:52UTC
    .replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // -04:00 -> -0400
  return new Date(time);
};

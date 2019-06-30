/**
 * Luhn algorithm
 *
 * - https://en.wikipedia.org/wiki/Luhn_algorithm
 * - https://zh.wikipedia.org/wiki/Luhn%E7%AE%97%E6%B3%95
 */

const FORMAT_ISVALID = /^[0-9]{2,}$/;
const FORMAT_GENERATE = /^[0-9]{1,}$/;
const CHARCODE_0 = "0".charCodeAt(0);
const MAPPING_EVEN = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];

const getLuhnRemainder = (value: string): number => {
  let length = value.length;
  let bit = 0;
  let accumulator = 0;

  while (length > 0) {
    length -= 1;
    bit ^= 1;
    accumulator += bit
      ? value.charCodeAt(length) - CHARCODE_0
      : MAPPING_EVEN[value.charCodeAt(length) - CHARCODE_0];
  }

  return accumulator % 10;
};

const stringifyInput = (value: any): string => {
  if (value !== null && value !== undefined) {
    if (typeof value === "string") {
      return value as string;
    }
    throw new Error(
      `Expecting value of type 'string', found: '${typeof value}'`
    );
  }
  throw new Error(`Expecting value of type 'string', found: '${value}'`);
};

const generate = (rawValue: any): string => {
  const value: string = stringifyInput(rawValue);

  if (!value.match(FORMAT_GENERATE)) {
    throw new Error(
      `Exception value of format '${FORMAT_GENERATE}', found: '${value}'`
    );
  }

  return `${value}${(10 - (getLuhnRemainder(`${value}0`) % 10)).toString()}`;
};

const validate = (rawValue: any): boolean => {
  const value: string = stringifyInput(rawValue);

  if (!value.match(FORMAT_ISVALID)) {
    throw new Error(
      `Exception value of format '${FORMAT_GENERATE}', found: '${value}'`
    );
  }

  return getLuhnRemainder(value) === 0;
};

export { validate, generate };

export default {
  validate,
  generate
};

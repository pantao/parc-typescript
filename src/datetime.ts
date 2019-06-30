import { date as toDate } from "./to";
import { DATETIME_UNITS } from "./constants";

const DURATION_AGO = "ago";
const DURATION_IN = "in";

export type DURATION_RESULT = {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
  months: number;
  years: number;
  kind: "ago" | "in";
  formatted: string;
  magic?: [string, string, number];
  [key: string]: any;
};

/**
 * 得到时间区间的间隔描述
 *
 * @param comparison datetime
 * @param datum datetime
 */
export const duration = (
  comparison: any,
  datum: any,
  format?: string
): DURATION_RESULT => {
  // 比较时间点
  const comparisonDate = toDate(comparison);
  // 基准时间点
  const datumDate = toDate(datum || new Date());
  // 间隔毫秒数
  const milliseconds = comparisonDate.valueOf() - datumDate.valueOf();
  // Ago or In
  const agoOrIn = milliseconds < 0 ? DURATION_AGO : DURATION_IN;

  const uncalculatedUnits = [...DATETIME_UNITS];

  const result: DURATION_RESULT = {
    kind: agoOrIn,
    milliseconds: 0,
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
    weeks: 0,
    months: 0,
    years: 0,
    formatted: ""
  };

  let uncalculatedMilliseconds = Math.abs(milliseconds);
  let maxUnit: [number, string] | undefined;
  while (uncalculatedMilliseconds > 0 && uncalculatedUnits.length > 0) {
    const rates = uncalculatedUnits
      .map(unit => unit[1])
      .reduce((a: number, b: number): number => a * b, 1);

    const unit: [string, number] | undefined = uncalculatedUnits.pop();

    if (unit === undefined) {
      break;
    }

    let value = Math.floor(uncalculatedMilliseconds / rates);

    if (value > 0) {
      result[unit[0].toLowerCase()] = value;
      if (!maxUnit) {
        maxUnit = [value, unit[0].toLowerCase()];
      }
    }

    uncalculatedMilliseconds -= rates * value;
  }

  const resultFormat = format || agoOrIn === "ago" ? "%v %u %a" : "%a %v %u";

  if (resultFormat !== undefined && Array.isArray(maxUnit)) {
    result.formatted = resultFormat
      .replace("%v", maxUnit[0].toString())
      .replace("%u", maxUnit[1])
      .replace("%a", agoOrIn);
    result.magic = [agoOrIn, maxUnit[1], maxUnit[0]];
  }

  return result;
};

export declare type DURATION_RESULT = {
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
export declare const duration: (comparison: any, datum: any, format?: string | undefined) => DURATION_RESULT;
//# sourceMappingURL=datetime.d.ts.map
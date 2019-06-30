export declare type FormatterFunction = (value: any, ...options: any) => any;
export declare type CurrencyOptions = {
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
export declare const currency: FormatterFunction;
/**
 * 存储容量转换
 *
 * @param bytes 字节数
 * @param rounding 是否四舍五入
 * @param separator 不同类型的单位值之间的分隔符
 * @param rateOfExchange 换算率
 * @param strict 是否严格模式
 */
export declare const storageSize: FormatterFunction;
//# sourceMappingURL=formatters.d.ts.map
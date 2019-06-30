export default class Currency {
    static parse: (value: string | number | Currency, settings?: {
        symbol?: string | undefined;
        separator?: string | undefined;
        decimal?: string | undefined;
        formatWithSymbol?: boolean | undefined;
        errorOnInvalid?: boolean | undefined;
        precision?: number | undefined;
        pattern?: string | undefined;
        negativePattern?: string | undefined;
        useVedic?: boolean | undefined;
        groups?: RegExp | undefined;
        increment?: number | undefined;
    }, useRounding?: boolean) => number;
    settings: CurrencySettings;
    precision: number;
    initialValue: number;
    value: number;
    constructor(value: string | number, settings?: {
        symbol?: string | undefined;
        separator?: string | undefined;
        decimal?: string | undefined;
        formatWithSymbol?: boolean | undefined;
        errorOnInvalid?: boolean | undefined;
        precision?: number | undefined;
        pattern?: string | undefined;
        negativePattern?: string | undefined;
        useVedic?: boolean | undefined;
        groups?: RegExp | undefined;
        increment?: number | undefined;
    });
    add: (number: number) => Currency;
    subtract: (number: number) => Currency;
    multiply: (number: number) => Currency;
    divide: (number: number) => Currency;
    /**
     * 分分脏
     */
    distribute: (count: number) => Currency[];
    format: (useSymbol?: boolean | undefined) => string;
    toString: () => string;
    toJSON: () => number;
}
export declare type CurrencySettings = {
    symbol?: string;
    separator?: string;
    decimal?: string;
    formatWithSymbol?: boolean;
    errorOnInvalid?: boolean;
    precision?: number;
    pattern?: string;
    negativePattern?: string;
    useVedic?: boolean;
    groups?: RegExp;
    increment?: number;
};
//# sourceMappingURL=Currency.d.ts.map
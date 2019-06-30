/**
 * Luhn algorithm
 *
 * - https://en.wikipedia.org/wiki/Luhn_algorithm
 * - https://zh.wikipedia.org/wiki/Luhn%E7%AE%97%E6%B3%95
 */
declare const generate: (rawValue: any) => string;
declare const validate: (rawValue: any) => boolean;
export { validate, generate };
declare const _default: {
    validate: (rawValue: any) => boolean;
    generate: (rawValue: any) => string;
};
export default _default;
//# sourceMappingURL=luhn.d.ts.map
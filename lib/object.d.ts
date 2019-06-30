export declare const deepEqual: (a: any, b: any) => boolean;
/**
 * 将对象的所有 key 转为纯小写的 key
 *
 * @param {Object} object 待转换的对象
 */
export declare const lowercaseKeys: (object: {
    [key: string]: any;
}) => {
    [key: string]: any;
};
export declare const omit: (object: {
    [key: string]: any;
}, keysToOmit: string[]) => any;
/**
 * 将值转换成为类型名称（小写字母）
 *
 * @param {any} object 待转换的值
 */
export declare const classToType: (object: any) => string;
/**
 * 将多个对象合并成一个对象
 *
 * @param objects object[]
 */
export declare const merge: (...objects: any[]) => any;
/**
 * 深合并
 *
 * @param objects object[]
 */
export declare const deepMerge: (...objects: any[]) => any;
/**
 * Extend object
 *
 * @param a Object
 * @param b Object
 * @param self bind object
 */
export declare const extend: (a: any, b: any, self: any) => any;
export declare const deepExtend: (this: void, ...args: any) => any;
//# sourceMappingURL=object.d.ts.map
/**
 * 版本比较
 *
 * - `0`：版本相等
 * - `-1`：`v2` 新于 `v1`
 * - `1`：`v2` 旧于 `v1`
 *
 * > 当 版本带有 `pre-release` 等 后缀时，其版本判定为老于没有后缀的版本号
 *
 * @param v1 any
 * @param v2 any
 */
export declare const compare: (v1: any, v2: any) => 1 | 0 | -1;
//# sourceMappingURL=version.d.ts.map
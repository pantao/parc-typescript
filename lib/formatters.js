"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var UrlTemplate_1 = __importDefault(require("./UrlTemplate"));
var object_1 = require("./object");
var utils_1 = require("./utils");
/**
 * 将数字或者数字字符格式化为货币数字
 *
 * @param value any
 * @param strict 是否严格模式
 * @param options 格式化选项
 */
exports.currency = function (value, strict, options) {
    if (strict === void 0) { strict = true; }
    if (options === void 0) { options = { maximumFractionDigits: 1, useGrouping: true }; }
    try {
        return parseFloat(value).toLocaleString("zh-CN", options);
    }
    catch (_) {
        if (strict) {
            throw new TypeError(Object.prototype.toString.call(value) + " is not a number.");
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
exports.storageSize = function (bytes, rounding, separator, rateOfExchange, strict) {
    if (rounding === void 0) { rounding = true; }
    if (separator === void 0) { separator = ","; }
    if (rateOfExchange === void 0) { rateOfExchange = 1024; }
    if (strict === void 0) { strict = true; }
    try {
        var value = typeof bytes === "string" ? parseInt(bytes, 10) : bytes;
        var loop = 0;
        var values = [];
        var units_1 = [];
        while (value > 0 && loop < constants_1.STORAGE_SIZE_UNITS.length) {
            var v = value % Math.pow(rateOfExchange, loop + 1);
            if (v / Math.pow(rateOfExchange, loop)) {
                values.push(v / Math.pow(rateOfExchange, loop));
                units_1.push(constants_1.STORAGE_SIZE_UNITS[loop]);
            }
            value -= v;
            loop += 1;
            if (loop === constants_1.STORAGE_SIZE_UNITS.length && value > 0) {
                values.push(value);
                units_1.push(constants_1.STORAGE_SIZE_UNITS[loop]);
                value = 0;
            }
        }
        Array.prototype.reverse.call(values);
        Array.prototype.reverse.call(units_1);
        var tuples = values
            .map(function (v, i) { return ({ v: v, i: i }); })
            .map(function (_a) {
            var v = _a.v, i = _a.i;
            return ({ v: v, u: units_1[i] });
        });
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
            .filter(function (_a) {
            var v = _a.v;
            return v;
        })
            .map(function (_a) {
            var v = _a.v, u = _a.u;
            return "" + v + u;
        })
            .join(separator);
    }
    catch (error) {
        if (strict) {
            throw error;
        }
    }
    return bytes;
};
/**
 * 将 sort 转为字符串
 *
 * `-foobar,+foo,-bar`
 *
 * ```js
 * const sort = {
 *   createTIme: '-', // 降序
 *   endTime: '+', // 升序
 *   price: 'desc', // 降序
 *   salePrice: 'asc', // 升序
 * }
 * ```
 *
 * @param sort {field: 'FIELD_NAME', sort: 'asc'}
 */
exports.stringifySort = function (sort) {
    return Object.keys(sort)
        .map(function (key) {
        var order = sort[key] === "+" || sort[key] === "asc" ? "+" : "-";
        return "" + order + key;
    })
        .join(",");
};
/**
 * 格式化 Endpoint
 *
 * Endpoint 格式如下
 *
 * ```js
 * // 查询特定门店下某一个商品条目
 * const endpoint = 'GET /stores/{storeId}/items/{itemId}'
 *
 * const params = {storeId: 1, itemId: 2}
 *
 * const query = {ref: 'app'}
 *
 * const formatted = formatEndpoint(endpoint, {params, query, baseUrl: 'https://api.chongaitianxia.cn/api'})
 *
 * console.log(formatted.url) // 输出：`https://api.chongaitianxia.cn/api/stores/1/items/2?ref=app`
 * ```
 *
 * 关于公司 RESTful 接口请求规范
 *
 * 1. 接口的操作使用 `HTTP METHOD` 动词，表示：我需要对资源进行什么操作，公司现在使用的有：
 *    - `GET`：获取指定资源（`SELECT`、`QUERY`）
 *    - `POST`：创建一个新的资源（`CREATE`），或者对某一个指定资源进行操作，比如对 `Order` 进行支付 (`Pay`) 操作
 *    - `PUT`：更新已有资源，（`UPDATE`）
 *    - `DELETE`：删除已有资源（`DELETE`，`REMOVE`，`DESTROY`）
 * 2. 对于 `GET` ，只用于获取资源，幂等的，不管进行多少次操作，都不会对资源产生影响
 * 3. 对于 `DELETE`，删除资源，虽然有副作用，但也应该要满足幂等，多次调用的结果应该是完全一致的
 * 4. 对于 `POST`，将资源提交给接收者，比如常见的，创建一个新订单，即将一个订单数据提交给订单数据集（接收者）
 * 5. 对于 `PUT`，是对资源自己进行操作，此时，应该是幂等的，即同样的操作，不管调用多少次，结果应该是一致的
 *
 * ENDPOINT 结构
 *
 * 一个资源节点，由两部分组成：`METHOD /PATH/TO/RESOURCE`，其中 `METHOD` 表示资源的请求方式，空格之后部分表示资源的路径
 * 资源路径可以是完整的 URL 地址，也可以是URL PATH，
 *
 * ```js
 * const STORE_GOODS_ENDPOINT = 'GET /store-service/stores/{storeId}/goods'
 * ```
 *
 * 上面的 `STORE_GOODS_ENDPOINT` 节点，表示，
 *
 * - 我的请求方式是 `GET`，你不管调用多少次都不会对我产生影响
 * - 我的路径是 `/store-service/stores/{storeId}/goods`
 * - 当你真的请求我的时候，还需要提供一个变量 `storeId`，以表示你是需要查询哪家门店的商品
 * - 如果你需要进行排序，过滤，筛选，那么，使用 `querystring`，比如 `?pageSize=20&pageNum=2&keywords=宠爱&sortParam=-createTime`
 *
 * `endpoint` 函数的作用即创建符合 `RESTful` 规范的 `URL` 地址，用于前后端通信，
 *
 * `options` 参数中提供如下四个数据：
 *
 * - `params`：一个对象，保存 `endpoint` 定义中对应变量的值
 * - `query`：一个对象，保存用于 `querystring` 查询的值
 * - `sort`：一个对象，保存排序值（排序方式见：https://note.youdao.com/ynoteshare1/index.html?id=bba69005044328de464a8e6bdabb973d&type=note）
 * - `baseUrl`：一个字符串，最终生成的URL地址会被附加在该地址之后
 *
 * 具体使用方式见：[__tests__/formatters.test.ts](__tests__/formatters.test.ts)
 *
 * @param endpoint  Endpoint
 * @param options 格式化选项
 */
exports.endpoint = function (endpoint, options) {
    var _a = endpoint.split(" "), method = _a[0], paths = _a.slice(1);
    var params = options ? options.params : null;
    var query = options ? options.query : null;
    var sort = options ? options.sort : null;
    var baseUrl = options ? options.baseUrl : "";
    var url = [baseUrl || ""].concat(paths).join("");
    // 如果有 params，则将 params 填充进
    if (params && typeof params === "object") {
        url = UrlTemplate_1.default.expandTemplate(url, params);
    }
    var queries = sort
        ? object_1.merge(query, {
            sortParam: typeof sort === "string" ? sort : exports.stringifySort(sort)
        })
        : query;
    if (queries && typeof queries === "object") {
        url = utils_1.addQueryParameters(url, queries);
    }
    return {
        method: method.toUpperCase(),
        url: url
    };
};

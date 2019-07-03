/**
 * 地球半径（单位：米(m)）
 */
export declare const EARTH_RADIUS = 6378137;
/**
 * 度到弧度转换
 *
 * @param {Number} degrees
 */
export declare const degreesToRadians: (degrees: number) => number;
/**
 * 根据经纬度计算指定半径的球体上两点间的距离
 *
 * @param {Number} radius 球体半径
 * @param {Number} lat1 坐标1经度
 * @param {Number} lon1 坐标1纬度
 * @param {Number} lat2 坐标2经度
 * @param {Number} lon2 坐标2纬度
 */
export declare const calculateDistanceBetweenCoordinates: (radius: number, lat1: number, lon1: number, lat2: number, lon2: number) => number;
/**
 * 计算地球上两点之间的距离
 *
 * @param {Array} coordinates 两点坐标数据
 * @param {String} unit 单位
 */
export declare const calculateDistanceBetweenCoordinatesOnEarth: (coordinates: any[], unit?: string, format?: string) => any;
//# sourceMappingURL=geometry.d.ts.map
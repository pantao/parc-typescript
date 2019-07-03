/**
 * 地球半径（单位：米(m)）
 */
export const EARTH_RADIUS = 6378137;

/**
 * 度到弧度转换
 *
 * @param {Number} degrees
 */
export const degreesToRadians = (degrees: number): number =>
  (degrees * Math.PI) / 180;

/**
 * 根据经纬度计算指定半径的球体上两点间的距离
 *
 * @param {Number} radius 球体半径
 * @param {Number} lat1 坐标1经度
 * @param {Number} lon1 坐标1纬度
 * @param {Number} lat2 坐标2经度
 * @param {Number} lon2 坐标2纬度
 */
export const calculateDistanceBetweenCoordinates = (
  radius: number,
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  const lat1Radions = degreesToRadians(lat1);
  const lat2Radions = degreesToRadians(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(lat1Radions) *
      Math.cos(lat2Radions);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return radius * c;
};

/**
 * 计算地球上两点之间的距离
 *
 * @param {Array} coordinates 两点坐标数据
 * @param {String} unit 单位
 */
export const calculateDistanceBetweenCoordinatesOnEarth = (
  coordinates: any[],
  unit = "km",
  format = "labeled"
) => {
  const fix = (p: any): any[] => {
    if (!Array.isArray(p)) return [p.latitude, p.longitude];
    return p;
  };
  const radius =
    unit.toLowerCase() === "km" ? EARTH_RADIUS / 1000 : EARTH_RADIUS;
  let value: any = 0;
  if (!Array.isArray(coordinates)) {
    return format === "labeled" ? `0${unit}` : 0;
  }
  if (coordinates.length === 4) {
    const [lat1, lon1, lat2, lon2] = coordinates;
    value = calculateDistanceBetweenCoordinates(radius, lat1, lon1, lat2, lon2);
  } else if (coordinates.length === 2) {
    const [p1, p2] = coordinates;
    const args = [...fix(p1), ...fix(p2)];
    value = calculateDistanceBetweenCoordinatesOnEarth(args, unit, "raw");
  }

  if (value < 1) {
    value *= 1000;
    value = value.toFixed(2);

    return format === "labeled"
      ? `${value.toLocaleString("zh-CN", {
          maximumFractionDigits: 2,
          useGrouping: true
        })}m`
      : value;
  }

  value = typeof value === "number" ? value.toFixed(2) : value;
  return format === "labeled"
    ? `${value.toLocaleString("zh-CN", {
        maximumFractionDigits: 2,
        useGrouping: true
      })}${unit}`
    : value;
};

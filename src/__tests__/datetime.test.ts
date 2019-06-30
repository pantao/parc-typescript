import { datetime } from "..";

test("test datetime.duration(comparison, datum)", () => {
  const datum = "2019-06-01";
  const comparisons = [
    ["2019-06-03", "days", 2],
    ["2019-06-05", "days", 4],
    ["2019-05-31", "days", 1],
    ["2019-07-01", "months", 1],
    ["2020-07-01", "years", 1],
    ["2020-07-01", "kind", "in"],
    ["2018-07-01", "kind", "ago"],
    ["2019-06-01T11:11:11", "hours", 11],
    ["2019-05-31T11:11:11", "hours", 12]
    // ["2020-07-01", "months", 1], // TODO: 月份计算 现在按4周算，会有误差
  ];

  for (let i = 0; i < comparisons.length; i += 1) {
    const [comparison, unit, diff] = comparisons[i];
    const duration = datetime.duration(comparison, datum);
    expect(duration[unit]).toBe(diff);
  }
});

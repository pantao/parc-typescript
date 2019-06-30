import { version } from "..";

test("test version.compare(v1, v2)", () => {
  expect(version.compare("v1.2.3", "v1.2.4")).toBe(-1);
  expect(version.compare("v1.2.3", "v1.2.3")).toBe(0);
  expect(version.compare("v1.2.3", "v1.2.2")).toBe(1);
  expect(version.compare("V1.2.3", "v1.2.2")).toBe(1);
  expect(version.compare("V1.2.3", "1.2.2")).toBe(1);
  expect(version.compare("V1.2.2", "1.2.2-alpha")).toBe(1);
});

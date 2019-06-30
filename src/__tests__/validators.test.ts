import { validators } from "..";

test("test validators.prcCitizenID", () => {
  expect(validators.prcCitizenID("11010519491231002X")).toBe(true);
  expect(validators.prcCitizenID("110105194912310023")).toBe(false);
  expect(validators.prcCitizenID("123456789123456789")).toBe(false);
});

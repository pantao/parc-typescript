import { to } from "..";

test("test to.integer()", () => {
  expect(to.integer("12")).toBe(12);
  expect(to.integer("123.2")).toBe(123);
});

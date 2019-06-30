import { is } from "..";

test("test is.mobile", () => {
  expect(is.mobile("18345677654")).toBe(true);
});

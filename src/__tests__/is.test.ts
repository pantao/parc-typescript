import { is } from "..";

test("test is.mobile", () => {
  expect(is.mobile("18345677654")).toBe(true);
});

test("test is.email", () => {
  expect(is.email("foo@bar.com")).toBe(true);
  expect(is.email("foobar.com")).toBe(false);
});

test("test is.url", () => {
  expect(is.url("https://pantao.parcmg.com")).toBe(true);
  expect(is.url("http://pantao.parcmg.com")).toBe(true);
  expect(is.url("htt://pantao.parcmg.com")).toBe(false);
});

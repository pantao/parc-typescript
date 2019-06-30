import { luhn } from "..";

test("test luhn", () => {
  expect(luhn.generate("123456")).toBe("1234566");
  expect(luhn.generate("1234567")).toBe("12345674");

  expect(luhn.validate("1234566")).toBe(true);
  expect(luhn.validate("12345674")).toBe(true);
  expect(luhn.validate("12345673")).toBe(false);
});

import { Currency } from "..";

test("test Currency", () => {
  const currency = new Currency(1234.56);

  expect(currency.value).toBe(1234.56);

  expect(currency.add(10).value).toBe(1244.56);
  expect(currency.subtract(10).value).toBe(1224.56);
  expect(currency.multiply(10).value).toBe(12345.6);
  expect(currency.multiply(100).value).toBe(123456);
  expect(currency.divide(10).value).toBe(123.46);
  expect(currency.divide(100).value).toBe(12.35);
  expect(currency.divide(1000).value).toBe(1.23);
  expect(currency.divide(10000).value).toBe(0.12);

  expect(currency.distribute(2).length).toBe(2);

  expect(currency.format(true)).toBe("￥1,234.56");
  expect(currency.format(false)).toBe("1,234.56");
});

import { random } from "..";

test("test random", () => {
  expect(random.generatePinNumber(6).length).toBe(6);
});

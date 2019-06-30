import doggy from "..";

test("test doggy.is", () => {
  expect(doggy.is.number("1111")).toBe(true);
  expect(doggy.is.string("xxx")).toBe(true);
  expect(doggy.is.mobile("18374500999")).toBe(true);
  expect(doggy.is.array([])).toBe(true);
});

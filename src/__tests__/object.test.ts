import { object } from "..";

test("test object.lowercaseKeys(o)", () => {
  expect(object.lowercaseKeys({ Key: "v", KeYs: "v" }).key).toBe("v");
});

test("test object.deepEqual(a, b)", () => {
  expect(
    object.deepEqual(
      { a: { b: { c: { d: 1 } } } },
      { a: { b: { c: { d: 1 } } } }
    )
  ).toBe(true);
});

test("test object.merge(a, b, c, d, e, f, ...)", () => {
  const o1 = { a: 1 };
  const o2 = { a: 2 };
  const o3 = { b: 3, c: 4 };
  const o4 = { c: 2, d: { e: 3 } };
  const o5 = { d: { f: 4 } };
  const merged = object.merge(o1, o2, o3, o4, o5);

  expect(
    object.deepEqual(merged, {
      a: 2,
      b: 3,
      c: 2,
      d: { e: 3, f: 4 }
    })
  ).toBe(true);
});

import { func } from "..";

test("func.bind", () => {
  const a = {
    name: "a"
  };

  const b = {
    name() {
      return "b called";
    }
  };

  const hi = function(this: any) {
    return this.name;
  };

  const hello = func.bind(hi, a);

  expect(hello()).toEqual("a");

  const bonjour = func.bind(hi, b);

  expect(typeof bonjour()).toBe("function");
  expect(bonjour()()).toEqual("b called");
});

test("func.once", () => {
  const fn1 = () => {
    return 1;
  };

  const fn2 = function fn2(n: number = 3) {
    return 2 + n;
  };

  function fn3(n: number) {
    return n;
  }

  const obj = {
    fn: func.once(fn3)
  };

  const fn1Once = func.once(fn1, true);
  const fn2Once = func.once(fn2);

  expect(fn1Once()).toBe(1);

  try {
    // Strict mode，函数只能执行一次，第二次执行的时候会报错
    fn1Once();
    // 所以下面这个是不会被执行的
    expect(1).toBe(2);
  } catch (error) {
    expect(error.message).toEqual(`fn1 shouldn't be called more than once`);
  }

  expect(fn2Once(2)).toBe(4);
  // 只能执行一次，所以当第一次执行之后，不管后面传什么参数，结果都将是第一次的值
  expect(fn2Once(3)).toBe(4);

  expect(obj.fn(3)).toBe(3);
  expect(obj.fn(4)).toBe(3);
});

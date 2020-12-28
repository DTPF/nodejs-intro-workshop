const fns = require("../01-exercise/01-exercise");
const BASE_NUM = require("../01-exercise/constants");

describe("01-exercise", () => {
  test("export an object of methods from the 01-exercise file", () => {
    expect(fns).toEqual({
      add: expect.any(Function),
      subtract: expect.any(Function),
    });
  });

  test("export a function named `add` that adds the params and the constant", () => {
    expect(fns.add(2, 3)).toBe(5 + BASE_NUM);
  });

  test("export a function named `subtract` that subtracts `b` from `a`", () => {
    expect(fns.subtract(2, 5)).toBe(3);
  });
});

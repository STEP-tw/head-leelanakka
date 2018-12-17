const { equal, deepEqual } = require("assert");

const { take } = require("../src/util/array.js");

describe("take", () => {
  it("should slice the array from 0 to given upper limit", () => {
    deepEqual(take([1, 2, 3], 2), [1, 2]);
    deepEqual(take([1, 2, 3], 1), [1]);
  });
  it("should return the empty array if we give 0 as upper limit", () => {
    deepEqual(take([1, 2, 3], 0), []);
  });
});

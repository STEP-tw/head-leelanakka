const assert = require("assert");

const { take } = require("../src/util/array.js");

describe("take", () => {
  it("should slice the array from 0 to given upper limit", () => {
    assert.deepEqual(take([1, 2, 3], 2), [1, 2]);
    assert.deepEqual(take([1, 2, 3], 1), [1]);
  });

  it("should return the empty array if we give 0 as upper limit", () => {
    assert.deepEqual(take([1, 2, 3], 0), []);
    assert.deepEqual(take([], 0), []);
  });

  it("should return the empty array if we pass the empty array", () => {
    assert.deepEqual(take([], 0), []);
  });
  it("should return the empty array if we pass the empty array and upper limit as anything", () => {
    assert.deepEqual(take([], 10), []);
  });
});

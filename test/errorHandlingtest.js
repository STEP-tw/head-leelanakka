const { equal } = require("assert");

const {
  invalidFilesMessage,
  invalidRangeMessage
} = require("../src/errorHandling.js");

describe("invalidRangeMessage", () => {
  it("should return the illegal line count for input of type n", () => {
    equal(invalidRangeMessage("n", "", "head"), "head: illegal line count -- ");
    equal(
      invalidRangeMessage("n", "-10X", "tail"),
      "tail: illegal offset -- -10X"
    );
  });
  it("should return the illegal byte count for input of type c", () => {
    equal(invalidRangeMessage("c", "", "head"), "head: illegal byte count -- ");
    equal(
      invalidRangeMessage("c", "-10X", "tail"),
      "tail: illegal offset -- -10X"
    );
  });
  it("should return the illegal offset count for input as tail", () => {
    equal(invalidRangeMessage("c", "", "tail"), "tail: illegal offset -- ");
    equal(
      invalidRangeMessage("n", "-10X", "tail"),
      "tail: illegal offset -- -10X"
    );
  });
});

describe("invalidFilesMessage", () => {
  it("should return the error message with the given file name", () => {
    equal(
      invalidFilesMessage("file", "head"),
      "head: file: No such file or directory"
    );
    equal(
      invalidFilesMessage("leela", "tail"),
      "tail: leela: No such file or directory"
    );
  });
});

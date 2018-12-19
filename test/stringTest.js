const assert = require("assert");

const { head, tail, headerText } = require("../src/util/string.js");

describe("head", () => {
  it("it should return nothing when we give 0 and \n as input ", () => {
    assert.equal(head("leela", 0, "\n"), "");
  });

  it("it should return nothing when we give 0 and empty string as input ", () => {
    assert.equal(head("prasanth", 0, ""), "");
  });

  it("it should return first line if we give 1 and \n  as input", () => {
    assert.equal(head("leela\nprasanth", 1, "\n"), "leela");
  });

  it("it should return first line if we give 1 and empty string as input", () => {
    assert.equal(head("head", 1, ""), "h");
  });

  it("it should return those many number of lines as per input", () => {
    assert.equal(head("leela\nprasanth\nnakka", 2, "\n"), "leela\nprasanth");
    assert.equal(head("head", 4, ""), "head");
  });

  it("it should return those many number of lines as per input", () => {
    let input = "If you\nspend a\nlot of\nyour day\nat the\ncommand line";
    assert.equal(head(input, 2, "\n"), "If you\nspend a");
    assert.equal(head(input, 4, ""), "If y");
  });
});

describe("tail", () => {
  it("should return the last character of the file for the delimiter as empty string", () => {
    assert.equal(tail("leela", 1, ""), "a");
  });

  it("should return the last line of the file for the delimiter as \n", () => {
    assert.equal(tail("leela\nprasanth", 1, "\n"), "prasanth");
  });

  it("should return the bit wise content for empty string as the delimeter", () => {
    let input =
      "Ever man\nare put\ndown his\nvery And\nmarry may\ntable him\navoid";
    assert.equal(tail(input, 2, ""), "id");
    assert.equal(tail(input, 9, ""), "him\navoid");
  });

  it("should return the line wise content for \n as the delimiter", () => {
    let input = "Ever\nman\nare\nput\ndown\nhis\nvery\nAnd\nmarry\nmay";
    assert.equal(tail(input, 1, "\n"), "may");
    assert.equal(tail(input, 2, "\n"), "marry\nmay");
  });

  it("should tail the contents based on the number and delimiter as \n", () => {
    assert.equal(tail("h\ne\na\nd", 2, "\n"), "a\nd");
  });

  it("should tail the contents based on the number and delimiter as empty string ", () => {
    assert.equal(tail("h\ne\na\nd", 2, ""), "\nd");
  });

  it("should trim the empty line if string contains empty line at the end", () => {
    assert.equal(tail("t\na\ni\nl", 2, "\n"), "i\nl");
    assert.equal(tail("tail\nhead", 1, "\n"), "head");
  });
});

describe("headerText", () => {
  it("should return dafault header for no input file name", () => {
    assert.equal(headerText(""), "==> " + "" + " <==");
  });

  it("should reaturn the header text with the input file name", () => {
    assert.equal(headerText("head.js"), "==> " + "head.js" + " <==");
  });

  it("should return the header text with the file name", () => {
    assert.equal(headerText("file"), "==> file <==");
  });

  it("should return the header text with empty if user gives no file name", () => {
    assert.equal(headerText(""), "==>  <==");
  });
});

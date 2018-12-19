const { equal, deepEqual } = require("assert");

const { head, tail, headerText } = require("../src/util/string.js");

describe("head", () => {
  it("it should return nothing when we give 0 as input ", () => {
    equal(head("leela", 0, "\n"), "");
    equal(head("prasanth", 0, ""), "");
  });

  it("it should return one line if we give 1 as input", () => {
    equal(head("leela\nprasanth", 1, "\n"), "leela");
    equal(head("head", 1, ""), "h");
  });

  it("it should return those many number of lines as per input", () => {
    equal(head("leela\nprasanth\nnakka", 2, "\n"), "leela\nprasanth");
    equal(head("head", 4, ""), "head");
  });

  it("it should return those many number of lines as per input", () => {
    let input =
      "Ever man are put down his very And marry may table him avoid\nHard sell it were into it upon\nHe forbade affixed parties of assured to me windows";
    let expectedOutPut =
      "Ever man are put down his very And marry may table him avoid\nHard sell it were into it upon";
    equal(head(input, 2, "\n"), expectedOutPut);
    equal(head("h\ne\na\nd", 4, ""), "h\ne\n");
  });
});

describe("tail", () => {
  it("should return the last character of the file", () => {
    equal(tail("leela", 1, ""), "a");
    equal(tail("leela\nprasanth", 1, "\n"), "prasanth");
  });

  it("should return the content based on the delimiter", () => {
    let input =
      "Ever man are put down his very And marry may table him avoid\nHard sell it were into it upon\nHe forbade affixed parties of assured to me windows";
    equal(tail(input, 2, ""), "ws");
    equal(tail(input, 9, ""), "e windows");
    equal(
      tail(input, 1, "\n"),
      "He forbade affixed parties of assured to me windows"
    );
    equal(
      tail(input, 2, "\n"),
      "Hard sell it were into it upon\nHe forbade affixed parties of assured to me windows"
    );
  });

  it("should tail the contents based on the number and delimiter as \n", () => {
    equal(tail("h\ne\na\nd", 2, "\n"), "a\nd");
  });
  it("should tail the contents based on the number and delimiter as empty string ", () => {
    equal(tail("h\ne\na\nd", 2, ""), "\nd");
  });
  it("should trim the empty line if string contains empty line at the end", () => {
    equal(tail("t\na\ni\nl", 2, "\n"), "i\nl");
    equal(tail("tail\nhead", 1, "\n"), "head");
  });
});

describe("headerText", () => {
  it("should return dafault header for no input file name", () => {
    equal(headerText(""), "==> " + "" + " <==");
  });

  it("should reaturn the header text with the input file name", () => {
    equal(headerText("head.js"), "==> " + "head.js" + " <==");
  });
  it("should return the header text with the file name", () => {
    equal(headerText("file"), "==> file <==");
  });
  it("should return the header text with empty if user gives no file name", () => {
    equal(headerText(""), "==>  <==");
  });
});

const { equal, deepEqual } = require("assert");

const {
  headContents,
  tailContents,
  headerText
} = require("../src/util/string.js");

describe("headContents", () => {
  it("it should return nothing when we give 0 as input ", () => {
    equal(headContents("leela", 0, "\n"), "");
    equal(headContents("prasanth", 0, ""), "");
  });

  it("it should return one line if we give 1 as input", () => {
    equal(headContents("leela\nprasanth", 1, "\n"), "leela");
    equal(headContents("head", 1, ""), "h");
  });

  it("it should return those many number of lines as per input", () => {
    equal(headContents("leela\nprasanth\nnakka", 2, "\n"), "leela\nprasanth");
    equal(headContents("head", 4, ""), "head");
  });

  it("it should return those many number of lines as per input", () => {
    let input =
      "Ever man are put down his very And marry may table him avoid\nHard sell it were into it upon\nHe forbade affixed parties of assured to me windows";
    let expectedOutPut =
      "Ever man are put down his very And marry may table him avoid\nHard sell it were into it upon";
    equal(headContents(input, 2, "\n"), expectedOutPut);
    equal(headContents("h\ne\na\nd", 4, ""), "h\ne\n");
  });
});

describe("tailContents", () => {
  it("should return the last character of the file", () => {
    equal(tailContents("leela", 1, ""), "a");
    equal(tailContents("leela\nprasanth", 1, "\n"), "prasanth");
  });
  it("should return the content based on the delimiter", () => {
    let input =
      "Ever man are put down his very And marry may table him avoid\nHard sell it were into it upon\nHe forbade affixed parties of assured to me windows";
    equal(tailContents(input, 2, ""), "ws");
    equal(tailContents(input, 9, ""), "e windows");
    equal(
      tailContents(input, 1, "\n"),
      "He forbade affixed parties of assured to me windows"
    );
    equal(
      tailContents(input, 2, "\n"),
      "Hard sell it were into it upon\nHe forbade affixed parties of assured to me windows"
    );
  });
  it("should tail the contents based on the number and delimiter", () => {
    equal(tailContents("h\ne\na\nd", 2, "\n"), "a\nd");
    equal(tailContents("h\ne\na\nd", 2, ""), "\nd");
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

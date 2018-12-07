const { equal, deepEqual } = require("assert");

const {
  headContents,
  parseInputs,
  headerText,
  headOutput
} = require("../src/lib.js");

const reader = file => file;

const existsFile = x => true;
const notExistsFile = x => false;

describe("headOutput", () => {
  it("should return the file content by bite wise count for input arguement as -c", () => {
    deepEqual(headOutput(reader, ["-c2", "file1"], existsFile), "fi");
  });
  it("should return the error message for the invalid arguements", () => {
    deepEqual(
      headOutput(reader, ["-c", "file1"], existsFile),
      "head: illegal byte count -- file1"
    );
  });
  it("should return the file content by line wise count for input arguement as -c", () => {
    deepEqual(headOutput(reader, ["-n2", "file1"], existsFile), "file1");
  });
  it("should return the file content by line wise count for input arguement as -c", () => {
    deepEqual(
      headOutput(reader, ["-n2", "file1"], notExistsFile),
      "head: file1: No such file or directory"
    );
  });
  it("should return the output for multiple files", () => {
    deepEqual(headOutput(reader, ["-c2", "file1"], existsFile), "fi");
  });
  it("should return file contents for the multiple files", () => {
    deepEqual(
      headOutput(reader, ["-c2", "file1", "file2"], existsFile),
      "==> file1 <==\nfi\n==> file2 <==\nfi"
    );
    deepEqual(
      headOutput(reader, ["-n2", "file1", "file2"], existsFile),
      "==> file1 <==\nfile1\n==> file2 <==\nfile2"
    );
  });
});

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

describe("parseInputs", () => {
  it("should return the default parsed inputs as per the given input", () => {
    deepEqual(parseInputs(["-c", 10, "file1"]), {
      type: "c",
      range: 10,
      files: ["file1"],
      delimiter: ""
    });
    deepEqual(parseInputs(["-n", 10, "file1"]), {
      type: "n",
      range: 10,
      files: ["file1"],
      delimiter: "\n"
    });
  });

  it("should return the parsed inputs as per the given input", () => {
    deepEqual(parseInputs(["-n", 1, "file1"]), {
      type: "n",
      range: 1,
      files: ["file1"],
      delimiter: "\n"
    });
  });

  it("should return the range as 0 is user give 0 as range", () => {
    deepEqual(parseInputs(["-n", 0, "file1"]), {
      type: "n",
      range: 0,
      files: ["file1"],
      delimiter: "\n"
    });
    deepEqual(parseInputs(["-c", 0, "file1"]), {
      type: "c",
      range: 0,
      files: ["file1"],
      delimiter: ""
    });
  });

  it("should return the type key value as n for no input of type", () => {
    deepEqual(parseInputs(["10", "file1"]), {
      type: "n",
      range: 10,
      files: ["file1"],
      delimiter: "\n"
    });
    deepEqual(parseInputs(["7", "file1"]), {
      type: "n",
      range: 7,
      files: ["file1"],
      delimiter: "\n"
    });
  });

  it("should return the type key value as n for -number input also", () => {
    deepEqual(parseInputs(["-10", "file1"]), {
      type: "n",
      range: -10,
      files: ["file1"],
      delimiter: "\n"
    });
    deepEqual(parseInputs(["-9", "file1"]), {
      type: "n",
      range: -9,
      files: ["file1"],
      delimiter: "\n"
    });
  });

  it("should return the type and range correctly even we pass combined type and range", () => {
    deepEqual(parseInputs(["-c2", "file1"]), {
      type: "c",
      range: 2,
      files: ["file1"],
      delimiter: ""
    });
    deepEqual(parseInputs(["-n9", "file1"]), {
      type: "n",
      range: 9,
      files: ["file1"],
      delimiter: "\n"
    });
    deepEqual(parseInputs(["-n0", "file1"]), {
      type: "n",
      range: 0,
      files: ["file1"],
      delimiter: "\n"
    });
    deepEqual(parseInputs(["-c0", "file1"]), {
      type: "c",
      range: 0,
      files: ["file1"],
      delimiter: ""
    });
  });

  it("should return the range 10 and type as n if we dont give any range and type", () => {
    deepEqual(parseInputs(["files1"]), {
      type: "n",
      range: 10,
      files: ["files1"],
      delimiter: "\n"
    });
    deepEqual(parseInputs(["files1", "files2", "files3"]), {
      type: "n",
      range: 10,
      files: ["files1", "files2", "files3"],
      delimiter: "\n"
    });
  });

  it("should return the range as same the user for wrong input and file names", () => {
    deepEqual(parseInputs(["-n", "0X", "file1"]), {
      type: "n",
      range: "0X",
      files: ["file1"],
      delimiter: "\n"
    });
    deepEqual(parseInputs(["-c", "0X", "file1"]), {
      type: "c",
      range: "0X",
      files: ["file1"],
      delimiter: ""
    });
    deepEqual(parseInputs(["-c10X", "file1"]), {
      type: "c",
      range: "10X",
      files: ["file1"],
      delimiter: ""
    });
    deepEqual(parseInputs(["-n10X", "file1"]), {
      type: "n",
      range: "10X",
      files: ["file1"],
      delimiter: "\n"
    });
  });

  it("should return the range as the file name if the user gives type and doesnt give any number", () => {
    deepEqual(parseInputs(["-n", "file1"]), {
      type: "n",
      range: "file1",
      files: [],
      delimiter: "\n"
    });
    deepEqual(parseInputs(["-c", "file1"]), {
      type: "c",
      range: "file1",
      files: [],
      delimiter: ""
    });
    deepEqual(parseInputs(["files1", "files2", "files3"]), {
      type: "n",
      range: 10,
      files: ["files1", "files2", "files3"],
      delimiter: "\n"
    });
  });
});

describe("headerText", () => {
  it("should return dafault header for no input file name", () => {
    equal(headerText(""), "==> " + "" + " <==");
  });

  it("should reaturn the header text with the input file name", () => {
    equal(headerText("head.js"), "==> " + "head.js" + " <==");
  });
});

const { parseInputs, extractNumber } = require("../src/parseInputs.js");

const { deepEqual } = require("assert");

describe("extractNumber", () => {
  it("should return only number in an array of elements", () => {
    deepEqual(extractNumber([2, "file"], ""), 2);
    deepEqual(extractNumber([-2, "file"], ""), -2);
    deepEqual(extractNumber(["-c2", "file"], "n"), 2);
    deepEqual(extractNumber(["-r2", "file"], "n"), 2);
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

const { parseInputs, extractNumber } = require("../src/parseInputs.js");

const assert = require("assert");

describe("extractNumber", () => {
  it("should return only number in an array of elements", () => {
    assert.deepEqual(extractNumber([2, "file"], ""), 2);
    assert.deepEqual(extractNumber([-2, "file"], ""), -2);
    assert.deepEqual(extractNumber(["-c2", "file"], "n"), 2);
    assert.deepEqual(extractNumber(["-r2", "file"], "n"), 2);
  });
});

describe("parseInputs", () => {
  it("should return the default parsed inputs as per the given input for -c", () => {
    assert.deepEqual(parseInputs(["-c", 10, "file1"]), {
      option: "c",
      range: 10,
      files: ["file1"],
      delimiter: ""
    });
  });
  it("should return the default parsed inputs as per the given input for -n", () => {
    assert.deepEqual(parseInputs(["-n", 10, "file1"]), {
      option: "n",
      range: 10,
      files: ["file1"],
      delimiter: "\n"
    });
  });

  it("should return the range as 0 is the user give 0 as range for -n option", () => {
    assert.deepEqual(parseInputs(["-n", 0, "file1"]), {
      option: "n",
      range: 0,
      files: ["file1"],
      delimiter: "\n"
    });
  });

  it("should return the range as 0 is the user give 0 as range for -c option", () => {
    assert.deepEqual(parseInputs(["-c", 0, "file1"]), {
      option: "c",
      range: 0,
      files: ["file1"],
      delimiter: ""
    });
  });

  it("should return the option key value as n for no input of option", () => {
    assert.deepEqual(parseInputs(["10", "file1"]), {
      option: "n",
      range: 10,
      files: ["file1"],
      delimiter: "\n"
    });
  });

  it("should return the option key value as n for -number input also", () => {
    assert.deepEqual(parseInputs(["-10", "file1"]), {
      option: "n",
      range: -10,
      files: ["file1"],
      delimiter: "\n"
    });
    assert.deepEqual(parseInputs(["-9", "file1"]), {
      option: "n",
      range: -9,
      files: ["file1"],
      delimiter: "\n"
    });
  });

  it("should return the option and range correctly even we pass combined option of -c and range", () => {
    assert.deepEqual(parseInputs(["-c2", "file1"]), {
      option: "c",
      range: 2,
      files: ["file1"],
      delimiter: ""
    });
    assert.deepEqual(parseInputs(["-c0", "file1"]), {
      option: "c",
      range: 0,
      files: ["file1"],
      delimiter: ""
    });
  });

  it("should return the option and range correctly even we pass combined option of -n and range", () => {
    assert.deepEqual(parseInputs(["-n9", "file1"]), {
      option: "n",
      range: 9,
      files: ["file1"],
      delimiter: "\n"
    });
    assert.deepEqual(parseInputs(["-n0", "file1"]), {
      option: "n",
      range: 0,
      files: ["file1"],
      delimiter: "\n"
    });
  });

  it("should return the range 10 and option as n if we dont give any range and option for single files ", () => {
    assert.deepEqual(parseInputs(["files1"]), {
      option: "n",
      range: 10,
      files: ["files1"],
      delimiter: "\n"
    });
  });

  it("should return the range 10 and option as n if we dont give any range and option for multiple files ", () => {
    assert.deepEqual(parseInputs(["files1", "files2", "files3"]), {
      option: "n",
      range: 10,
      files: ["files1", "files2", "files3"],
      delimiter: "\n"
    });
  });

  it("should return the range as same as the user for wrong input and file names for option -n", () => {
    assert.deepEqual(parseInputs(["-n", "0X", "file1"]), {
      option: "n",
      range: "0X",
      files: ["file1"],
      delimiter: "\n"
    });
  });

  it("should return the range as same as the user for wrong input and file names for option -c", () => {
    assert.deepEqual(parseInputs(["-c", "0X", "file1"]), {
      option: "c",
      range: "0X",
      files: ["file1"],
      delimiter: ""
    });
  });

  it("should return the range as same as the user for wrong input and file names for combined option -n an range", () => {
    assert.deepEqual(parseInputs(["-c10X", "file1"]), {
      option: "c",
      range: "10X",
      files: ["file1"],
      delimiter: ""
    });
  });

  it("should return the range as same as the user for wrong input and file names for combined option -c an range", () => {
    assert.deepEqual(parseInputs(["-n10X", "file1"]), {
      option: "n",
      range: "10X",
      files: ["file1"],
      delimiter: "\n"
    });
  });

  it("should return the range as the file name if the user gives -n as option and doesnt give any number", () => {
    assert.deepEqual(parseInputs(["-n", "file1"]), {
      option: "n",
      range: "file1",
      files: [],
      delimiter: "\n"
    });
  });

  it("should return the range as the file name if the user gives -c as option and doesnt give any number", () => {
    assert.deepEqual(parseInputs(["-c", "file1"]), {
      option: "c",
      range: "file1",
      files: [],
      delimiter: ""
    });
  });

  it("should return the option as n and range as 10 and remaining as files if the user wont specify any option and range", () => {
    assert.deepEqual(parseInputs(["files1", "files2", "files3"]), {
      option: "n",
      range: 10,
      files: ["files1", "files2", "files3"],
      delimiter: "\n"
    });
  }); });

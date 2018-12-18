const { equal, deepEqual } = require("assert");

const {
  getContent,
  invalidRangeMessage,
  invalidFilesMessage
} = require("../src/lib.js");

const readFileSync = file => file;
const existsSync = x => true;
const notExistsSync = x => false;

const fs = { readFileSync, existsSync };

describe("getContent", () => {
  it("should return the file content by bite wise count for input arguement as -c", () => {
    deepEqual(getContent(["-c2", "file1"], fs, "head"), "fi");
  });
  it("should return the error message for the invalid arguements", () => {
    deepEqual(
      getContent(["-c", "file1"], fs, "head"),
      "head: illegal byte count -- file1"
    );
  });
  it("should return the file content by line wise count for input arguement as -n", () => {
    deepEqual(getContent(["-n2", "file1"], fs, "head"), "file1");
  });
  it("should return the file content by line wise count for input arguement as -n", () => {
    deepEqual(
      getContent(
        ["-n2", "file1"],
        { readFileSync: readFileSync, existsSync: notExistsSync },
        "head"
      ),
      "head: file1: No such file or directory"
    );
  });
  it("should return file contents for the multiple files", () => {
    deepEqual(
      getContent(["-c2", "file1", "file2"], fs, "head"),
      "==> file1 <==\nfi\n==> file2 <==\nfi"
    );
    deepEqual(
      getContent(["-n2", "file1", "file2"], fs, "head"),
      "==> file1 <==\nfile1\n==> file2 <==\nfile2"
    );
    deepEqual(
      getContent(
        ["-n2", "file1", "file2"],
        { readFileSync: readFileSync, existsSync: notExistsSync },
        "head"
      ),
      "head: file1: No such file or directory\nhead: file2: No such file or directory"
    );
  });
});

describe("getContent", () => {
  it("should return the file content by bit wise for input arguement as -c", () => {
    deepEqual(getContent(["-c2", "file1"], fs, "tail"), "e1");
  });
  it("should return empty string for 0 as the input", () => {
    deepEqual(getContent(["-c0", "file1"], fs, "tail"), "");
  });
  it("should return illegal type count for 0 and head as input", () => {
    deepEqual(
      getContent(["-n0", "file1"], fs, "head"),
      "head: illegal line count -- 0"
    );
    deepEqual(
      getContent(["-c0", "file1"], fs, "head"),
      "head: illegal byte count -- 0"
    );
  });
  it("should return empty string for 0 as the input", () => {
    deepEqual(getContent(["-c1", "file1"], fs, "tail"), "1");
  });
  it("should return the error message for the invalid arguements", () => {
    deepEqual(
      getContent(["-c", "file1"], fs, "tail"),
      "tail: illegal offset -- file1"
    );
  });
  it("should return the file content by line wise count for input arguement as -n", () => {
    deepEqual(getContent(["-n2", "file1"], fs, "tail"), "file1");
  });
  it("should return the file content by line wise count for input arguement as -n", () => {
    deepEqual(getContent(["-n2", "file1\n"], fs, "tail"), "file1");
  });
  it("should return the file content by line wise count for input arguement as -n", () => {
    deepEqual(
      getContent(
        ["-n2", "file1"],
        { readFileSync: readFileSync, existsSync: notExistsSync },
        "tail"
      ),
      "tail: file1: No such file or directory"
    );
  });
  it("should return file contents for the multiple files", () => {
    deepEqual(
      getContent(["-c2", "file1", "file2"], fs, "tail"),
      "==> file1 <==\ne1\n==> file2 <==\ne2"
    );
    deepEqual(
      getContent(["-n2", "file1", "file2"], fs, "tail"),
      "==> file1 <==\nfile1\n==> file2 <==\nfile2"
    );
    deepEqual(
      getContent(
        ["-n2", "file1", "file2"],
        { readFileSync: readFileSync, existsSync: notExistsSync },
        "tail"
      ),
      "tail: file1: No such file or directory\ntail: file2: No such file or directory"
    );
  });
});

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

const assert = require("assert");

const { getContent, contentMapper } = require("../src/lib.js");

const contents = {
  file1: "My\ntelephone\nreceiver\nslams\ndown\non\nits\ncradle",
  file2:
    "She obviously\nspends every\nnon-working\nhour in\nthorough personal\nexploration \nof"
};

const readFileSync = file => contents[file];
const existsSync = x => Object.keys(contents).includes(x);
const fs = { readFileSync, existsSync };

describe("getContent", () => {
  it("should return the file content by bite wise count for input arguement as -c", () => {
    assert.deepEqual(getContent(["-c2", "file1"], fs, "head"), "My");
  });

  it("should return the error message for the invalid arguements", () => {
    assert.deepEqual(
      getContent(["-c", "file1"], fs, "head"),
      "head: illegal byte count -- file1"
    );
  });

  it("should return the file content by line wise count for input arguement as -n", () => {
    assert.deepEqual(getContent(["-n2", "file1"], fs, "head"), "My\ntelephone");
  });

  it("should return the error message if the given file is not present in the directory", () => {
    assert.deepEqual(
      getContent(["-n2", "file"], fs, "head"),
      "head: file: No such file or directory"
    );
  });

  it("should return file contents for the multiple files", () => {
    assert.deepEqual(
      getContent(["-c2", "file1", "file2"], fs, "head"),
      "==> file1 <==\nMy\n==> file2 <==\nSh"
    );
    assert.deepEqual(
      getContent(["-n2", "file1", "file2"], fs, "head"),
      "==> file1 <==\nMy\ntelephone\n==> file2 <==\nShe obviously\nspends every"
    );
  });

  it("should return the file error message if the given two files are not present", () => {
    assert.deepEqual(
      getContent(["-n2", "head.js", "tail.js"], fs, "head"),
      "head: head.js: No such file or directory\nhead: tail.js: No such file or directory"
    );
  });

  it("should return the file content by bit wise for input arguement as -c", () => {
    assert.deepEqual(getContent(["-c2", "file1"], fs, "tail"), "le");
  });

  it("should return empty string for 0 as the input", () => {
    assert.deepEqual(getContent(["-c0", "file1"], fs, "tail"), "");
  });

  it("should return illegal line  count for 0 and n and head as input", () => {
    assert.deepEqual(
      getContent(["-n0", "file1"], fs, "head"),
      "head: illegal line count -- 0"
    );
  });

  it("should return illegal byte count for 0 and c and head as input", () => {
    assert.deepEqual(
      getContent(["-c0", "file1"], fs, "head"),
      "head: illegal byte count -- 0"
    );
  });

  it("should return empty string for 0 as the input", () => {
    assert.deepEqual(getContent(["-c0", "file1"], fs, "tail"), "");
  });

  it("should return the error message for the invalid arguements", () => {
    assert.deepEqual(
      getContent(["-c", "file1"], fs, "tail"),
      "tail: illegal offset -- file1"
    );
  });

  it("should return the file content by line wise count for input arguement as -n", () => {
    assert.deepEqual(getContent(["-n2", "file1"], fs, "tail"), "its\ncradle");
  });

  it("should return the file content by line wise count for input arguement as -n", () => {
    assert.deepEqual(
      getContent(["-n2", "leela.js"], fs, "tail"),
      "tail: leela.js: No such file or directory"
    );
  });

  it("should return file contents as bit wise for the multiple files", () => {
    assert.deepEqual(
      getContent(["-c2", "file1", "file2"], fs, "tail"),
      "==> file1 <==\nle\n==> file2 <==\nof"
    );
  });

  it("should return file contents as line wise for the multiple files", () => {
    assert.deepEqual(
      getContent(["-n2", "file1", "file2"], fs, "tail"),
      "==> file1 <==\nits\ncradle\n==> file2 <==\nexploration \nof"
    );
  });

  it("should return the error file message for two files that are not present", () => {
    assert.deepEqual(
      getContent(["-n2", "mobile.js", "iphone"], fs, "tail"),
      "tail: mobile.js: No such file or directory\ntail: iphone: No such file or directory"
    );
  });

  it("should return the contents of the file and error message for the second file which is not present", () => {
    assert.deepEqual(getContent(["-n2","file1","head.js"],fs,"tail"),"==> file1 <==\nits\ncradle\ntail: head.js: No such file or directory")
  });

});

describe("contentMapper", () => {
  it("should map the contents of the files and resturn as per the input in array", () => {
    assert.deepEqual(contentMapper(["-n2", "file1"], fs, "head"), [
      "My\ntelephone"
    ]);
  });
});

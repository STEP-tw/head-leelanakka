const { deepEqual } = require("assert");

const { getContent, contentMapper } = require("../src/lib.js");

const contents = {
  file1: "My telephone receiver slams down on its cradle",
  file2:
    "She obviously spends every non-working hour in thorough personal exploration of all things culinary"
};

const readFileSync = file => contents[file];
const existsSync = x => Object.keys(contents).includes(x);
const fs = { readFileSync, existsSync };

describe("getContent", () => {
  it("should return the file content by bite wise count for input arguement as -c", () => {
    deepEqual(getContent(["-c2", "file1"], fs, "head"), "My");
  });
  it("should return the error message for the invalid arguements", () => {
    deepEqual(
      getContent(["-c", "file1"], fs, "head"),
      "head: illegal byte count -- file1"
    );
  });
  it("should return the file content by line wise count for input arguement as -n", () => {
    deepEqual(
      getContent(["-n2", "file1"], fs, "head"),
      "My telephone receiver slams down on its cradle"
    );
  });
  it("should return the file content by line wise count for input arguement as -n", () => {
    deepEqual(
      getContent(["-n2", "file"], fs, "head"),
      "head: file: No such file or directory"
    );
  });
  it("should return file contents for the multiple files", () => {
    deepEqual(
      getContent(["-c2", "file1", "file2"], fs, "head"),
      "==> file1 <==\nMy\n==> file2 <==\nSh"
    );
    deepEqual(
      getContent(["-n2", "file1", "file2"], fs, "head"),
      "==> file1 <==\nMy telephone receiver slams down on its cradle\n==> file2 <==\nShe obviously spends every non-working hour in thorough personal exploration of all things culinary"
    );
    deepEqual(
      getContent(["-n2", "head.js", "tail.js"], fs, "head"),
      "head: head.js: No such file or directory\nhead: tail.js: No such file or directory"
    );
  });
  it("should return the file content by bit wise for input arguement as -c", () => {
    deepEqual(getContent(["-c2", "file1"], fs, "tail"), "le");
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
    deepEqual(getContent(["-c1", "file1"], fs, "tail"), "e");
  });
  it("should return the error message for the invalid arguements", () => {
    deepEqual(
      getContent(["-c", "file1"], fs, "tail"),
      "tail: illegal offset -- file1"
    );
  });
  it("should return the file content by line wise count for input arguement as -n", () => {
    deepEqual(
      getContent(["-n2", "file1"], fs, "tail"),
      "My telephone receiver slams down on its cradle"
    );
  });
  it("should return the file content by line wise count for input arguement as -n", () => {
    deepEqual(
      getContent(["-n2", "file1"], fs, "tail"),
      "My telephone receiver slams down on its cradle"
    );
  });
  it("should return the file content by line wise count for input arguement as -n", () => {
    deepEqual(
      getContent(["-n2", "leela.js"], fs, "tail"),
      "tail: leela.js: No such file or directory"
    );
  });
  it("should return file contents for the multiple files", () => {
    deepEqual(
      getContent(["-c2", "file1", "file2"], fs, "tail"),
      "==> file1 <==\nle\n==> file2 <==\nry"
    );
    deepEqual(
      getContent(["-n2", "file1", "file2"], fs, "tail"),
      "==> file1 <==\nMy telephone receiver slams down on its cradle\n==> file2 <==\nShe obviously spends every non-working hour in thorough personal exploration of all things culinary"
    );
    deepEqual(
      getContent(["-n2", "mobile.js", "iphone"], fs, "tail"),
      "tail: mobile.js: No such file or directory\ntail: iphone: No such file or directory"
    );
  });
});

describe("contentMapper", () => {
  it("should map the contents of the files and resturn as per the input in array", () => {
    deepEqual(contentMapper(["-n2", "file1"], fs, "head"), [
      "My telephone receiver slams down on its cradle"
    ]);
  });
});

const {
  headerText,
  headContents,
  tailContents
} = require("../src/util/string.js");

const { parseInputs } = require("../src/parseInputs.js");

const invalidRangeMessage = function(option, range, functionName) {
  let message = {
    head: { c: "byte count", n: "line count" },
    tail: { c: "offset", n: "offset" }
  };
  return (
    functionName + ": illegal " + message[functionName][option] + " -- " + range
  );
};

const invalidFilesMessage = function(fileName, functionName) {
  return functionName + ": " + fileName + ": No such file or directory";
};

const contentMapper = function(args, fs, command) {
  const { readFileSync, existsSync } = fs;
  let contents = { head: headContents, tail: tailContents };
  let { files, range, delimiter } = parseInputs(args);
  let result = [];
  result = files.map(function(file) {
    if (!existsSync(file, "utf-8")) {
      return invalidFilesMessage(file, command);
    }

    if (files.length == 1) {
      return contents[command](readFileSync(file, "utf-8"), range, delimiter);
    }

    if (files.length > 1) {
      return (
        headerText(file) +
        "\n" +
        contents[command](readFileSync(file, "utf-8"), range, delimiter)
      );
    }
  });
  return result;
};

const getContent = function(args, fs, command) {
  let { range, option } = parseInputs(args);
  let result = [];
  if (command == "tail" && range == 0) {
    return "";
  }

  if (isNaN(range) || range == 0) {
    return invalidRangeMessage(option, range, command);
  }

  range = Math.abs(range);
  result = contentMapper(args, fs, command);
  return result.join("\n");
};

module.exports = {
  getContent,
  invalidRangeMessage,
  invalidFilesMessage
};

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

const getOutputContent = function(readFile, args, existsFile, command) {
  let { files, range, option, delimiter } = parseInputs(args);
  let result = [];
  let contents = { head: headContents, tail: tailContents };
  if (command == "tail" && range == 0) {
    return "";
  }

  if (isNaN(range) || range == 0) {
    return invalidRangeMessage(option, range, command);
  }

  range = Math.abs(range);
  result = files.map(function(file) {
    if (!existsFile(file, "utf-8")) {
      return invalidFilesMessage(file, command);
    }

    if (files.length == 1) {
      return contents[command](readFile(file, "utf-8"), range, delimiter);
    }

    if (files.length > 1) {
      return (
        headerText(file) +
        "\n" +
        contents[command](readFile(file, "utf-8"), range, delimiter)
      );
    }
  });
  return result.join("\n");
};

module.exports = {
  getOutputContent,
  invalidRangeMessage,
  invalidFilesMessage
};

const { headerText, head, tail } = require("../src/util/string.js");

const { parseInputs } = require("../src/parseInputs.js");

const {
  invalidFilesMessage,
  invalidRangeMessage
} = require("../src/errorHandling.js");

const contentMapper = function(args, fs, utility) {
  const { readFileSync, existsSync } = fs;
  const contents = { head: head, tail: tail };
  let { files, range, delimiter } = parseInputs(args);
  range = Math.abs(range);
  return files.map(function(file) {
    if (!existsSync(file, "utf-8")) {
      return invalidFilesMessage(file, utility);
    }

    let output = contents[utility](
      readFileSync(file, "utf-8"),
      range,
      delimiter
    );

    if (files.length == 1) {
      return output;
    }

    return headerText(file) + "\n" + output;
  });
};

const getContent = function(args, fs, utility) {
  let { range, option, delimiter } = parseInputs(args);
  if (utility == "tail" && range == 0) {
    return "";
  }
  if (isNaN(range) || range == 0) {
    return invalidRangeMessage(option, range, utility);
  }

  return contentMapper(args, fs, utility).join("\n");
};

module.exports = {
  getContent,
  contentMapper
};

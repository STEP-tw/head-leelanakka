const headerText = function(fileName) {
  return (header = "==> " + fileName + " <==");
};

const take = function(array, upperLimit) {
  return array.slice(0, upperLimit);
};

const headContents = function(string, noOfLines, delimiter) {
  let content = string.split(delimiter);
  return take(content, noOfLines).join(delimiter);
};

const tailContents = function(string, noOfLines, delimiter) {
  let content = string.split(delimiter)
  if(delimiter == '\n'){ content.pop()};
  return content.slice(-noOfLines).join(delimiter);
};

const extractNumber = function(args, type) {
  return +args[0] || args[0].slice(2) || args[args.indexOf("-" + type) + 1];
};

const extractFiles = function(args, type) {
  return [].concat(args.slice(args.indexOf("-" + type) + 2));
};

const parseInputs = function(args) {
  let type = "n";
  let range = extractNumber(args, type);
  let files = [];
  let delimiter = "\n";

  if (!+args[0] && args[0][0] != "-") {
    files = files.concat(args);
    range = 10;
    return { type, range, files, delimiter };
  }

  if (args[0].slice(0, 2) == "-c") {
    type = "c";
    delimiter = "";
    range = extractNumber(args, type);
    files = extractFiles(args, type);
    return { type, range, files, delimiter };
  }
  files = extractFiles(args, type);
  return { type, range, files, delimiter };
};

const isInvalidRange = function(files, range) {
  return range == 0 || files.length == 0 || "" + +range == "NaN";
};

const invalidRangeMessage = function(type, range, functionName) {
  let message = { c: "byte count", n: "line count", tail: "offset" };
  return functionName + ": illegal " + message[type] + " -- " + range;
};

const invalidFilesMessage = function(fileName, functionName) {
  return functionName + ": " + fileName + ": No such file or directory";
};
const headOutput = function(readFile, args, existsFile) {
  let { files, range, type, delimiter } = parseInputs(args);
  let result = [];
  if (isInvalidRange(files, range)) {
    return invalidRangeMessage(type, range, "head");
  }
  range = Math.abs(range);
  for (let index = 0; index < files.length; index++) {
    if (!existsFile(files[index], "utf-8")) {
      result.push(invalidFilesMessage(files[index], "head"));
      continue;
    }
    if (files.length == 1) {
      return headContents(readFile(files[0], "utf-8"), range, delimiter);
    }
    if (files.length > 1) {
      result.push(
        headerText(files[index]) +
          "\n" +
          headContents(readFile(files[index], "utf-8"), range, delimiter)
      );
      separator = "";
    }
  }
  return result.join("\n");
};

const tailOutput = function(readFile, args, existsFile) {
  let { files, range, delimiter } = parseInputs(args);
  let result = [];
  if (range == 0) {
    return "";
  }
  if (isNaN(range)) {
    return invalidRangeMessage("tail", range, "tail");
  }
  range = Math.abs(range);
  for (let index = 0; index < files.length; index++) {
    if (!existsFile(files[index], "utf-8")) {
      result.push(invalidFilesMessage(files[index], "tail"));
      continue;
    }
    if (files.length == 1) {
      return tailContents(readFile(files[0], "utf-8"), range, delimiter);
    }
    if (files.length > 1) {
      result.push(
        headerText(files[index]) +
          "\n" +
          tailContents(readFile(files[index], "utf-8"), range, delimiter)
      );
      separator = "";
    }
  }
  return result.join("\n");
};

module.exports = {
  headContents,
  parseInputs,
  headerText,
  headOutput,
  headerText,
  take,
  extractNumber,
  invalidRangeMessage,
  invalidFilesMessage,
  tailContents,
  tailOutput
};

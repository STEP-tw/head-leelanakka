const headerText = function(fileName) {
  return header = "==> " + fileName + " <==";
};

const take = function(array,upperLimit){
  return array.slice(0,upperLimit);
}

const headContents = function(string, noOfLines, delimiter) {
  let content = string.split(delimiter);
  return take(content, noOfLines).
    join(delimiter);
};

const extractNumber = function(args, type) {
  return (
    +args[0] || args[0].slice(2) || args[args.indexOf("-" + type) + 1]
  );
};

const extractFiles = function(args,type){
  return [].concat(args.slice(args.indexOf("-"+type)+2));
}

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
    files = extractFiles(args,type);
    return { type, range, files, delimiter };
  }
  files = extractFiles(args,type);
  return { type, range, files, delimiter };
};

const headOutput = function(readFile, args, existsFile) {
  let { files, range, type, delimiter } = parseInputs(args);
  let result = [];
  let separator = "\n";
  let message = { c: "byte", n: "line" };
  if (range == 0 || files.length == 0 || "" + +range == "NaN") {
    return "head: illegal " + message[type] + " count -- " + range;
  }
  range = Math.abs(range);
  for (let index = 0; index < files.length; index++) {
    if (!existsFile(files[index], "utf-8")) {
      result.push("head: " + files[index] + ": No such file or directory");
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

module.exports = {
  headContents,
  parseInputs,
  headerText,
  headOutput,
  headerText,
  take,
  extractNumber,
  extractFiles
};

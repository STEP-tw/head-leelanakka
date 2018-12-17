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

module.exports = {
  parseInputs,
  extractNumber,
  extractFiles,
};

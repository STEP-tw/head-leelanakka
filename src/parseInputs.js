const extractNumber = function(args, type) {
  return +args[0] || args[0].slice(2) || args[args.indexOf("-" + type) + 1];
};

const extractFiles = function(args, type) {
  return [].concat(args.slice(args.indexOf("-" + type) + 2));
};

const parseInputs = function(args) {
  let option = "n";
  let range = extractNumber(args, option);
  let files = [];
  let delimiter = "\n";

  if (!+args[0] && args[0][0] != "-") {
    files = files.concat(args);
    range = 10;
    return { option, range, files, delimiter };
  }

  if (args[0].slice(0, 2) == "-c") {
    option = "c";
    delimiter = "";
    range = extractNumber(args, option);
    files = extractFiles(args, option);
    return { option, range, files, delimiter };
  }
  files = extractFiles(args, option);
  return { option, range, files, delimiter };
};
module.exports = {
  parseInputs,
  extractFiles,
  extractNumber
};

const { getOutputContent } = require("./src/lib.js");

const fs = require("fs");

const main = function(args, fs) {
  console.log(getOutputContent(args, fs, "tail"));
};

main(process.argv.slice(2), fs);

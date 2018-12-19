const { getContent } = require("./src/lib.js");

const fs = require("fs");

console.log(getContent(process.argv.slice(2), fs, "tail"));

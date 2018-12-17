const { take } = require("../../src/util/array.js");
const headContents = function(string, numberOfLines, delimiter) {
  let content = string.split(delimiter);
  return take(content, numberOfLines).join(delimiter);
};

const tailContents = function(string, numberOfLines, delimiter) {
  let content = string.split(delimiter).reverse();
  if (content[0] == "") {
    content = content.slice(1);
  }
  content = content.slice(0, numberOfLines).reverse();
  return content.join(delimiter);
};

const headerText = function(fileName) {
  return "==> " + fileName + " <==";
};

module.exports = {
  headContents,
  tailContents,
  headerText
};

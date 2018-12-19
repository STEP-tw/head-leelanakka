const { take } = require("../../src/util/array.js");

const head = function(string, numberOfLines, delimiter) {
  let content = string.split(delimiter);
  return take(content, numberOfLines).join(delimiter);
};

const tail = function(string, numberOfLines, delimiter) {
  let content = string.split(delimiter).reverse();
  content = content.slice(0, numberOfLines).reverse();
  return content.join(delimiter);
};

const headerText = function(fileName) {
  return `==> ${fileName} <==`;
};

module.exports = {
  head,
  tail,
  headerText
};

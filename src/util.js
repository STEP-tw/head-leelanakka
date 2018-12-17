const headerText = function(fileName) {
  return "==> " + fileName + " <==";
};
const take = function(array, upperLimit) {
  return array.slice(0, upperLimit);
};

const headContents = function(string, noOfLines, delimiter) {
  let content = string.split(delimiter);
  return take(content, noOfLines).join(delimiter);
};

const tailContents = function(string, noOfLines, delimiter) {
  let content = string.split(delimiter).reverse();
  if (content[0] == "") {
    content = content.slice(1);
  }
  content = content.slice(0, noOfLines).reverse();
  return content.join(delimiter);
};

module.exports = {
  headerText,
  take,
  headContents,
  tailContents
};

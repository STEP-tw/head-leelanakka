const invalidRangeMessage = function(option, range, utility) {
  let message = {
    head: { c: "byte count", n: "line count" },
    tail: { c: "offset", n: "offset" }
  };
  return `${utility}: illegal ${message[utility][option]} -- ${range}`;
};

const invalidFilesMessage = function(fileName, utility) {
  return `${utility}: ${fileName}: No such file or directory`;
};

module.exports = { invalidFilesMessage, invalidRangeMessage };

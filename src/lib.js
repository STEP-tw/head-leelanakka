const getBitWiseData = function(data,noOfBits){
  let bitWiseData = data.split("");
  bitWiseData = bitWiseData.slice(0,noOfBits);
  return bitWiseData.join("");
}

const getLinesWiseData = function(data,noOfLines){
  let linesWiseData = data.split("\n");
  linesWiseData = linesWiseData.slice(0,noOfLines);
  return linesWiseData.join("\n");
}

module.exports = {
  getBitWiseData,
  getLinesWiseData
}

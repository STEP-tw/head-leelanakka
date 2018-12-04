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

const parseInputs = function(args){
  let orderedInputs = { type:'n',range:10,files:[]};
  if(args.includes("-c")) {
    orderedInputs.type = "c";
    orderedInputs.range = args[args.indexOf("-c")+1];
   orderedInputs.files = orderedInputs.files.concat(args.slice(args.indexOf("-c")+2));
  } else {
    orderedInputs.range = args[args.indexOf("-n")+1];
    orderedInputs.files = orderedInputs.files.concat(args.slice(args.indexOf("-n")+2));
  }
  return orderedInputs;
}

const finalOutput = function(args,data) {
  let inputs = parseInputs(args);
  let output = getLinesWiseData(data,inputs.range);
  if(inputs.type == "c") {
    output = getBitWiseData(data,inputs.range);
  }
  return output;
}

module.exports = {
  getBitWiseData,
  getLinesWiseData,
  parseInputs,
  finalOutput
}

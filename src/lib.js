const headerText = function(fileName){
  let header = "==> "+ fileName +" <=="
  return header;
}

const getLinesWiseData = function(data,noOfLines,delimiter){
  let linesWiseData = data.split(delimiter);
  linesWiseData = linesWiseData.slice(0,noOfLines);
  return linesWiseData.join(delimiter);
}

const parseInputs = function(args){
  let orderedInputs = { type:'n',range:10,files:[],delimiter:"\n"};
  if(args.includes("-c")) {
    orderedInputs.type = "c";
    orderedInputs.range = args[args.indexOf("-c")+1];
    orderedInputs.files = orderedInputs.files.concat(args.slice(args.indexOf("-c")+2));
    orderedInputs.delimiter = "";
    return orderedInputs;
  } 
  orderedInputs.range = args[args.indexOf("-n")+1];
  orderedInputs.files = orderedInputs.files.concat(args.slice(args.indexOf("-n")+2));
  return orderedInputs;
}

const finalOutput = function(readFile,args) {
  let inputs = parseInputs(args);
  let data1 = readFile(inputs.files[0],"utf-8");
  let output = getLinesWiseData(data1,inputs.range,inputs.delimiter);
  if(inputs.files.length > 1) {
    return outputForMultipeFiles(readFile,args);
  }
  return output;
}

const outputForMultipeFiles = function(readFile,args) {
  let inputs = parseInputs(args);
  let result = ""
  let separator = "\n"
  for(let index = 0; index < inputs.files.length ; index++){
    result += headerText(inputs.files[index])+"\n"+getLinesWiseData(readFile(inputs.files[index],"utf-8"),inputs.range,inputs.delimiter) + "\n"+separator;
    separator = "";
  }
  return result;
}

module.exports = {
  getLinesWiseData,
  parseInputs,
  finalOutput,
  headerText,
  outputForMultipeFiles
}

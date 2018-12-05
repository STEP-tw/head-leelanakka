const headerText = function(fileName){
  let header = "==> "+ fileName +" <==";
  return header;
}

const errorMsg = function() {
  return "head: illegal line count -- 0";
}

const getContents = function(content,noOfLines,delimiter){
  let linesWiseData = content.split(delimiter);
  linesWiseData = linesWiseData.slice(0,noOfLines);
  return linesWiseData.join(delimiter);
}

const parseInputs = function(args){
  let orderedInputs = { type:'n',range:10,files:[],delimiter:"\n"};
  orderedInputs.range = +args[0] || ""+args[0].slice(2) || ""+args[args.indexOf("-n")+1] || 10;
  orderedInputs.range = Math.abs(orderedInputs.range);
  if(typeof(orderedInputs.range) == "string" || ""+orderedInputs.range == "NaN"){
    orderedInputs.range = 10;
  }

  if(!+args[0] && args[0][0] != "-") {
    orderedInputs.files = orderedInputs.files.concat(args);
    return orderedInputs;
  }

  if(args[0].slice(0,2) == "-c") {
    orderedInputs.type = "c";
    orderedInputs.delimiter = "";
    orderedInputs.range = +args[0] || ""+args[0].slice(2) || ""+args[args.indexOf("-c")+1] || 10;
    orderedInputs.range = Math.abs(orderedInputs.range);
    orderedInputs.files = orderedInputs.files.concat(args.slice(args.indexOf("-c")+2));
    return orderedInputs;
  }

  orderedInputs.files = orderedInputs.files.concat(args.slice(args.indexOf("-n")+2));
  return orderedInputs;
}

const finalOutput = function(readFile,args,existsFile) {
  let inputs = parseInputs(args);
  if(inputs.range == 0 || inputs.files.length == 0){
    return errorMsg(inputs.range);
  }

  if(!existsFile(inputs.files[0],"utf-8") || inputs.files[0] == 0){
    return "head: "+inputs.files[0]+": No such file or directory";
  }

  let content1 = readFile(inputs.files[0],"utf-8");
  let output = getContents(content1,inputs.range,inputs.delimiter);
  if(inputs.files.length > 1) {
    return outputForMultipeFiles(readFile,args);
  }
  return output;
}

const outputForMultipeFiles = function(readFile,args) {
  let inputs = parseInputs(args).files;
  let range = parseInputs(args).range;
  let delimiter = parseInputs(args).delimiter;
  let result = "";
  let separator = "\n";
  for(let index = 0; index < inputs.length ; index++){
    result += headerText(inputs[index])+"\n"+getContents(readFile(inputs[index],"utf-8"),range,delimiter)+separator +separator;
    separator = "";
  }
  return result;
}

module.exports = {
  getContents,
  parseInputs,
  finalOutput,
  headerText,
  outputForMultipeFiles
}

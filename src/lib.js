const headerText = function(fileName){
  let header = "==> "+ fileName +" <==";
  return header;
}

const headContents = function(content,noOfLines,delimiter){
  noOfLines = Math.abs(noOfLines);
  return content.split(delimiter).
    slice(0,noOfLines).
    join(delimiter);
}

const extractInputsRange = function(args,type) {
  return +args[0] ||""+ args[0].slice(2) || ""+args[args.indexOf("-"+type)+1] || 10;
}

const parseInputs = function(args){
  let orderedInputs = { type:'n',range:10,files:[],delimiter:"\n"};
  orderedInputs.range = extractInputsRange(args,orderedInputs.type);

  if(!+args[0] && args[0][0] != "-") {
    orderedInputs.files = orderedInputs.files.concat(args);
    orderedInputs.range = 10;
    return orderedInputs;
  }

  if(args[0].slice(0,2) == "-c") {
    orderedInputs.type = "c";
    orderedInputs.delimiter = "";
    orderedInputs.range = extractInputsRange(args,orderedInputs.type);
    orderedInputs.files = orderedInputs.files.concat(args.slice(args.indexOf("-c")+2));
    return orderedInputs;
  }
  orderedInputs.files = orderedInputs.files.concat(args.slice(args.indexOf("-n")+2));
  return orderedInputs;
}

const headOutput = function(readFile,args,existsFile) {
  const {files,range,type,delimiter} = parseInputs(args);
  let message = {c:"byte",n:"line"};
  if(range == 0 || files.length == 0 || ""+(+range)=="NaN"){
    return "head: illegal "+message[type]+" count -- "+range;
  }

  if(files.length > 1) {
    return outputForMultipeFiles(readFile,args,existsFile);
  }

  if(!existsFile(files[0],"utf-8") || files[0] == 0){
    return "head: "+files[0]+": No such file or directory";
  }
  let contentOfFile = readFile(files[0],"utf-8");
  return  headContents(contentOfFile,range,delimiter);
}

const outputForMultipeFiles = function(readFile,args,existsFile) {
  const { files,range,delimiter} = parseInputs(args);
  let result = [];
  let separator = "\n";
  for(let index = 0; index < files.length ; index++){
    if(!existsFile(files[index],"utf-8")){
      result.push("head: "+files[index]+": No such file or directory");
      continue;
    }
    result.push( headerText(files[index])+"\n"+headContents(readFile(files[index],"utf-8"),range,delimiter));
    separator = "";
  }
  return result.join('\n');
}

module.exports = {
  headContents,
  parseInputs,
  headOutput,
  headerText,
  outputForMultipeFiles
}

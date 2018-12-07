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
  return +args[0] ||""+ args[0].slice(2) || ""+args[args.indexOf("-"+type)+1] ;
}

const parseInputs = function(args){
  let type = 'n';
  let range = extractInputsRange(args,type);
  let files =[];
  let delimiter = '\n';

  if(!+args[0] && args[0][0] != "-") {
    files = files.concat(args);
    range = 10;
    return {type,range,files,delimiter};
  }

  if(args[0].slice(0,2) == "-c") {
    type = "c";
    delimiter = "";
    range = extractInputsRange(args,type);
    files = files.concat(args.slice(args.indexOf("-c")+2));
    return {type,range,files,delimiter};
  }
  files = files.concat(args.slice(args.indexOf("-n")+2));
  return {type,range,files,delimiter};
}

const headOutput = function(readFile,args,existsFile) {
  const { files,range,type,delimiter} = parseInputs(args);
  let result = [];
  let separator = "\n";
  let message = {c:"byte",n:"line"};
  if(range == 0 || files.length == 0 || ""+(+range)=="NaN"){
    return "head: illegal "+message[type]+" count -- "+range;
  }
  for(let index = 0; index < files.length ; index++){
    if(!existsFile(files[index],"utf-8")){
      result.push("head: "+files[index]+": No such file or directory");
      continue;
    }
    if(files.length == 1 ){
      return headContents(readFile(files[0],"utf-8"),range,delimiter);
    }
    if(files.length>1){
      result.push( headerText(files[index])+"\n"+headContents(readFile(files[index],"utf-8"),range,delimiter));
      separator = "";
    } 
  }
  return result.join('\n');
}

module.exports = {
  headContents,
  parseInputs,
  headerText,
  headOutput
}

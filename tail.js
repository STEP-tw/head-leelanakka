const { getOutputContent } = require('./src/lib.js');

const fs = require('fs');

const main = function(readFile,args,existsFile) {
  console.log(getOutputContent(readFile,args,existsFile,"tail"));
}

main(fs.readFileSync,process.argv.slice(2),fs.existsSync);
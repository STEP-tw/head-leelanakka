const { finalOutput } = require('./src/lib.js');

const fs = require('fs');

const main = function(readFile,args,existsFile) {
  console.log(finalOutput(readFile,args,existsFile));
}

main(fs.readFileSync,process.argv.slice(2),fs.existsSync);

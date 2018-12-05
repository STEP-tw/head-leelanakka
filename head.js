const { finalOutput } = require('./src/lib.js');

const fs = require('fs');

const main = function(readFile,args) {
  console.log(finalOutput(readFile,args));
}

main(fs.readFileSync,process.argv.slice(2));

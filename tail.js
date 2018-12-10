const { tailOutput } = require('./src/lib.js');

const fs = require('fs');

const main = function(readFile,args,existsFile) {
  console.log(tailOutput(readFile,args,existsFile));
}

main(fs.readFileSync,process.argv.slice(2),fs.existsSync);


/* 
  Usage:
  node ./tail.js file1
  node ./tail.js -n5 file1
  node ./tail.js -n 5 file1
  node ./tail.js -5 file1
  node ./tail.js file1 file2
  node ./tail.js -n 5 file1 file2
  node ./tail.js -n5 file1 file2
  node ./tail.js -5 file1 file2 
  node ./tail.js -c5 file1
  node ./tail.js -c 5 file1
  node ./tail.js -c5 file1 file2
  node ./tail.js -c 5 file1 file2
*/




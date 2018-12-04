const { finalOutput } = require('./src/lib.js');

const fs = require('fs');
let data = fs.readFileSync(process.argv[4],"utf-8");
const main = function(args,data) {
  console.log(finalOutput(args,data));
}
main(process.argv.slice(2),data);

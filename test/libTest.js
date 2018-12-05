const { equal,deepEqual } = require('assert');
const { 
  getLinesWiseData,
  parseInputs,
  finalOutput,
  headerText,
  outputForMultipeFiles
} = require('../src/lib.js');

describe("getLinesWiseData",()=> {
  it("it should return nothing when we give 0 as input ",()=> {
    equal(getLinesWiseData("leela",0,"\n"),"");
    equal(getLinesWiseData("prasanth",0,""),"");
  });

  it("it should return one line if we give 1 as input",()=> {
    equal(getLinesWiseData("leela\nprasanth",1,'\n'),"leela");
    equal(getLinesWiseData("head",1,""),"h");
  });

  it("it should return those many number of lines as per input",()=> {
    equal(getLinesWiseData("leela\nprasanth\nnakka",2,'\n'),"leela\nprasanth");
    equal(getLinesWiseData("head",4,""),"head");
  });

  it("it should return those many number of lines as per input",()=> {
    let input = "Ever man are put down his very And marry may table him avoid\nHard sell it were into it upon\nHe forbade affixed parties of assured to me windows"
    let expectedOutPut = "Ever man are put down his very And marry may table him avoid\nHard sell it were into it upon"
    equal(getLinesWiseData(input,2,'\n'),expectedOutPut);
    equal(getLinesWiseData("h\ne\na\nd",4,""),"h\ne\n");
  });
})

describe("parseInputs",()=> {
  it('should return the default parsed inputs as per the given input',()=> {
    deepEqual(parseInputs(["-c",10,"file1"]),{ type:'c',range:10,files:["file1"],delimiter:''});
  });

  it('should return the parsed inputs as per the given input',()=> {
    deepEqual(parseInputs(["-n",1,"file1"]),{ type:'n',range:1,files:["file1"],delimiter:'\n'});
  });

  it('should return the parsed inputs as per the given input',()=> {
    deepEqual(parseInputs(["-n",0,"file1"]),{ type:'n',range:0,files:["file1"],delimiter:"\n"});
  });
})

describe('headerText',()=> {
  it('should return dafault header for no input file name' , ()=> {
    equal(headerText(""),"==> "+ "" +" <==");
  });
  it('should reaturn the header text with the input file name',()=> {
    equal(headerText("head.js"),"==> "+ "head.js" +" <==");
  });
});

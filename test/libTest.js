const { equal,deepEqual } = require('assert');

const { 
  getData,
  parseInputs,
  finalOutput,
  headerText,
  outputForMultipeFiles
} = require('../src/lib.js');

describe("getData",()=> {
  it("it should return nothing when we give 0 as input ",()=> {
    equal(getData("leela",0,"\n"),"");
    equal(getData("prasanth",0,""),"");
  });

  it("it should return one line if we give 1 as input",()=> {
    equal(getData("leela\nprasanth",1,'\n'),"leela");
    equal(getData("head",1,""),"h");
  });

  it("it should return those many number of lines as per input",()=> {
    equal(getData("leela\nprasanth\nnakka",2,'\n'),"leela\nprasanth");
    equal(getData("head",4,""),"head");
  });

  it("it should return those many number of lines as per input",()=> {
    let input = "Ever man are put down his very And marry may table him avoid\nHard sell it were into it upon\nHe forbade affixed parties of assured to me windows"
    let expectedOutPut = "Ever man are put down his very And marry may table him avoid\nHard sell it were into it upon"
    equal(getData(input,2,'\n'),expectedOutPut);
    equal(getData("h\ne\na\nd",4,""),"h\ne\n");
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
    deepEqual(parseInputs(["-n",0,"file1"]),{ type:'n',range:10,files:["file1"],delimiter:"\n"});
    deepEqual(parseInputs(["-n",0,"file1"]),{ type:'n',range:10,files:["file1"],delimiter:"\n"});
  });

  it('should return the type key value as n for no input of type',()=> {
    deepEqual(parseInputs(["10","file1"]),{ type:'n',range:10,files:["file1"],delimiter:"\n"});
    deepEqual(parseInputs(["7","file1"]),{ type:'n',range:7,files:["file1"],delimiter:"\n"});
  });

  it('should return the type key value as n for -0 input also',()=> {
    deepEqual(parseInputs(["-10","file1"]),{ type:'n',range:10,files:["file1"],delimiter:"\n"});
    deepEqual(parseInputs(["-9","file1"]),{ type:'n',range:9,files:["file1"],delimiter:"\n"});
  });

  it('should return the type and range correctly even we pass combined type and range',()=> {
    deepEqual(parseInputs(["-c2","file1"]),{ type:'c',range:2,files:["file1"],delimiter:""});
    deepEqual(parseInputs(["-n9","file1"]),{ type:'n',range:9,files:["file1"],delimiter:"\n"});
  });

  it('should return the range 10 and type as n if we dont give any raneg and type',()=> {
    deepEqual(parseInputs(["file1"]),{ type:'n',range:10,files:["file1"],delimiter:"\n"});
    deepEqual(parseInputs(["file1","file2","file3"]),{ type:'n',range:10,files:["file1","file2","file3"],delimiter:"\n"});
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

const { equal,deepEqual } = require('assert');
const { 
  getBitWiseData,
  getLinesWiseData,
  parseInputs,
  finalOutput
} = require('../src/lib.js');

describe("getBitWiseData",()=> {
  it("it should return nothing when we give 0 as noOfBits",()=> {
    equal(getBitWiseData("prasanth",0),"");
  });

  it("it should return one character when we give 1 as noOfBites",()=> {
    equal(getBitWiseData("head",1),"h");
  })

  it("should return that many number of characters as per the given noOfBites",()=> {
    equal(getBitWiseData("head",4),"head");
  })

  it("it should give the exact number of characters irrespective of new lines",()=> {
    equal(getBitWiseData("h\ne\na\nd",4),"h\ne\n");
  })
});

describe("getLinesWiseData",()=> {
  it("it should return nothing when we give 0 as input",()=> {
    equal(getLinesWiseData("leela",0),"");
  });

  it("it should return one line if we give 1 as input",()=> {
    equal(getLinesWiseData("leela\nprasanth",1),"leela");
  });

  it("it should return those many number of lines as per input",()=> {
    equal(getLinesWiseData("leela\nprasanth",2),"leela\nprasanth");
  });

  it("it should return those many number of lines as per input",()=> {
    let input = "Ever man are put down his very And marry may table him avoid\nHard sell it were into it upon\nHe forbade affixed parties of assured to me windows"
    let expectedOutPut = "Ever man are put down his very And marry may table him avoid\nHard sell it were into it upon"
    equal(getLinesWiseData(input,2),expectedOutPut);
  });
})

describe("parseInputs",()=> {
  it('should return the default parsed inputs as per the given input',()=> {
    deepEqual(parseInputs(["-c",10,"file1"]),{ type:'c',range:10,files:["file1"]});
  });

  it('should return the default parsed inputs as per the given input',()=> {
    deepEqual(parseInputs(["-n",1,"file1"]),{ type:'n',range:1,files:["file1"]});
  });

  it('should return the default parsed inputs as per the given input',()=> {
    deepEqual(parseInputs(["-n",0,"file1"]),{ type:'n',range:0,files:["file1"]});
  });
})

describe('finalOutput',()=> {
  it('should return nothing if we give 0 as input',()=> {
    equal(finalOutput(["-c","0","leela"],"leela"),"");
  });

  it('should return one character if we give 1 as input and type as c',()=> {
    equal(finalOutput(["-c","1","leela"],"leela"),"l");
  });
  it('should return one character if we give 1 as input and type as c',()=> {
    equal(finalOutput(["-c","1","leela"],"leela"),"l");
  });
})

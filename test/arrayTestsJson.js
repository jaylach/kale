var should = require('should');
var _ = require('underscore');

var javelin = require('../index');

// -----
//  Array Tests
// -----

// describe()
describe('Array Tests (JSON)', function() {
  // Create locals
  var locals = {
    "foos": [
      { "one": "1", "two": "2" },
      { "one": "3", "two": "4" }
    ]
  };

  // test01
  it('Should deep copy local array to output', function() {
    var compile = javelin.compileFile('./test/javelin/array/test01.jav', 'json');
    var result = compile(locals);
    result.should.eql(locals);
  }); //- test01

  // test02
  it('Should not allow unnamed arrays', function() {
    var compile = javelin.compileFile('./test/javelin/array/test02.jav', 'json');

    (function() {
      var result = compile(locals);
    }).should.throw();
  }); //- test02

  // test03
  it('Should only copy explicit properties to output', function() {
    var compile = javelin.compileFile('./test/javelin/array/test03.jav', 'json');
    var result = compile(locals);
    
    var expected = {
      "foos": [
        { "1": "1" },
        { "1": "3" }
      ]
    };

    result.should.eql(expected);
  }); //- test03

  // test04
  it('Should support full embedded object syntax', function() {
    var compile = javelin.compileFile('./test/javelin/array/test04.jav', 'json');

    // Create a new set of locals for this test only
    var newLocals = {
      "foos": [
        { 
          "one": "1", 
          "two": "2",
          "three": {
            "foo": "bar",
            "baz": "qux"
          }
        },
        { 
          "one": "3", 
          "two": "4",
          "four": {
            "five": "6"
          }
        }
      ]
    };

    // Expected
    var expected = {
      "foos": [
        { 
          "one": "1", 
          "two": "2",
          "three": {
            "bar": "bar",
            "qux": "qux"
          }
        },
        { 
          "one": "3", 
          "two": "4",
          "three": {},
          "five": "6"
        }
      ]
    };

    var result = compile(newLocals);
    result.should.eql(expected);
  }); //- test04

  // test05
  it('Should execute inline script and set returned value', function() {
    var compile = javelin.compileFile('./test/javelin/array/test05.jav', 'json');
    var result = compile(locals);
    
    var expected = {
      "foos": [
        { "one": 2, "two": 6 },
        { "one": 6, "two": 12 }
      ]
    };

    result.should.eql(expected);
  }); //- test05
}); //- describe()
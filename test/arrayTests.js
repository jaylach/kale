var should = require('should');
var _ = require('underscore');

var javelin = require('../index');

// -----
//  Array Tests
// -----

// describe()
describe('Array Tests', function() {
  // Create locals
  var locals = {
    "foos": [
      { "one": "1", "two": "2" },
      { "one": "3", "two": "4" }
    ]
  };

  // test01
  it('Should deep copy local array to output', function() {
    var compile = javelin.compile('./test/javelin/array/test01.jav', 'json');
    var result = compile(locals);
    result.should.eql(locals);
  }); //- test01

  // test02
  it('Should not allow unnamed arrays', function() {
    var compile = javelin.compile('./test/javelin/array/test02.jav', 'json');

    (function() {
      var result = compile(locals);
    }).should.throw();
  }); //- test02

  // test03
  it('Should only copy explicit properties to output', function() {
    var compile = javelin.compile('./test/javelin/array/test03.jav', 'json');
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
  it('Should execute inline script and set returned value', function() {
    var compile = javelin.compile('./test/javelin/array/test04.jav', 'json');
    var result = compile(locals);
    
    var expected = {
      "foos": [
        { "one": 2, "two": 6 },
        { "one": 6, "two": 12 }
      ]
    };

    result.should.eql(expected);
  }); //- test04
}); //- describe()
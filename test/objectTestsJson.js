var should = require('should');
var _ = require('underscore');

var kale = require('../index');

// -----
//  Object Tests
// -----

// describe()
describe('Object Tests (JSON)', function() {
  // Create locals
  var locals = {
    "foo": {
      "bar": "baz",
      "qux": "quux",
      "inner": {
        "one": "1",
        "two": "2"
      }
    },
    "outerArray": [
      { "1": "one", "2": "two" },
      { "1": "three", "2": "four" }
    ]
  };

  // test01
  it('Should deep copy local object to output', function() {
    var compile = kale.compileFileSync('./test/kale/object/test01.jav');
    var result = compile('json', locals);
    
    result.should.eql({ "foo": locals.foo });
  }); //- test01
 
  // test02
  it('Should deep copy local object to output, unnamed', function() {
    var compile = kale.compileFileSync('./test/kale/object/test02.jav', 'json', locals);
    var result = compile('json', locals);
    
    result.should.eql(locals.foo);
  }); //- test02

  // test03
  it('Should only copy explicit properties to output', function() {
    var compile = kale.compileFileSync('./test/kale/object/test03.jav');
    var result = compile('json', locals);
    
    var expected = {
      "foo": {
        "bar": "baz"
      }
    };

    result.should.eql(expected);
  }); //- test03

  // test04
  it('Should only rename properties on output', function() {
    var compile = kale.compileFileSync('./test/kale/object/test04.jav');
    var result = compile('json', locals);
    
    var expected = {
      "bar": {
        "baz": "baz",
        "foo": "quux"
      }
    };

    result.should.eql(expected);
  }); //- test04

  // test05
  it('Should correctly copy sub objects', function() {
    var compile = kale.compileFileSync('./test/kale/object/test05.jav');
    var result = compile('json', locals);
    
    var expected = {
      "foo": {
        "bar": "baz",
        "qux": "quux",
        "inner": {
          "one": "1",
          "two": "2"
        },
        "outerArray": [
          { "one": "one", "two": "two" },
          { "one": "three", "two": "four" }
        ]
      }
    };

    result.should.eql(expected);
  }); //- test05

  // test06
  it('Should execute inline script and set returned value', function() {
    var compile = kale.compileFileSync('./test/kale/object/test06.jav');
    var result = compile('json', locals);
    
    var expected = {
      "foo": {
        "bar": "baz",
        "qux": "quux",
        "inner": 3
      }
    };

    result.should.eql(expected);
  }); //- test06

  // test06 - async
  it('Should compile an object-based template asynchronously', function(done) {
    var compile = kale.compileFile('./test/kale/object/test06.jav');
    compile('json', locals, function(error, result) {
      var expected = {
        "foo": {
          "bar": "baz",
          "qux": "quux",
          "inner": 3
        }
      };

      result.should.eql(expected);
      done();
    });
  }); //- test06 - async

  // test07
  it('Should include an external *.jav file', function() {
    var compile = kale.compileFileSync('./test/kale/object/test07.jav');
    var result = compile('json', locals);

    result.should.eql(locals);
  }); //- test07
}); //- describe()
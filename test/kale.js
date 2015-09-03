var should = require('should');

var kale = require('../index');
var actions = require('../lib/actions');

// -----
//  Kale Tests
// -----
describe('kale tests', function() {
  var pkg = require('../package.json');

  it('should have the proper version', function() {
    should.exist(kale.version);
    kale.version.should.equal(pkg.version);
  });

  it('should have render function', function() {
    should.exist(kale.render);
    kale.render.should.be.a.Function();
  });

  it('should require an output path', function() {
    var result = function() {
      return kale.render('test/kale.kale');
    };

    result.should.throw();
  });
});

// -----
//  Action Tests
// -----
describe('action tests', function() {
  it('should exist', function() {
    actions.should.be.an.Object();
  });

  // Standard Action Tests

  // setupActionTest()
  var setupActionTest = function setupActionTest(key, input, expected, subName) {
    var name = key + '() should return expected result';
    if ( subName != null ) name += ' [' + subName + ']';

    it(name, function() {
      var action = actions[key];
      var result = actions[key].apply(null, input)

      result.should.eql(expected);
    });
  }; //- setupActionTest()

  var standardActions = require('./kale.json');
  Object.keys(standardActions).forEach(function(key) {
    it(key + ' should exist', function() {
      actions[key].should.be.a.Function();
    });

    var data = standardActions[key];
    var input = data.input;
    var expected = data.expected;

    if ( Array.isArray(input) ) {
      setupActionTest(key, input, expected);
    }
    else {
      Object.keys(input).forEach(function(inputKey) {
        var newInput = input[inputKey];
        var newExpected = expected[inputKey];

        setupActionTest(key, newInput, newExpected, inputKey);
      });
    }
  });
});
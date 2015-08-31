var fs = require('fs');
var rimraf = require('rimraf');
var should = require('should');

var kale = require('../index');
var actions = require('../lib/actions');

// Get our test cases
var templates = fs.readdirSync('test/templates')
  .filter(function(file) {
    return file.indexOf('json') >= 0;
  })
  .map(function(file) {
    return file.replace('.json', '');
  });

var kaleOptions = { 
  pretty: true, 
  outPath: 'test/tmp'
};

// -----
//  Template Tests
// -----
describe('template tests', function() {
  before(function() {
    try {
      fs.mkdirSync('test/tmp');
    } 
    catch (ex) {
      if (ex.code !== 'EEXIST') {
        throw ex;
      }
    }

    actions.addAction('kale', function() {
      return 'kale';
    })
  });

  kale.render(__dirname + '/templates/*.kale', kaleOptions);

  // Run our test templates
  templates.forEach(function(test) {
    var name = test.replace(/[-.]/g, ' ');
    var json = require('./templates/' + test + '.json');

    describe(name, function() {
      var keys = Object.keys(json);
      keys.forEach(function(key) {
        it(key.replace(/[_]/g, ' '), function() {
          var rendered = require('./tmp/' + key + '.js');
          var data = json[key];

          var input = data.input;
          var locals = data.locals || {};
          var expected = data.expected;

          var result = rendered(input, locals);
          result.should.eql(expected);
        })
      });
    });
  });

  after(function() {
    rimraf.sync('test/tmp');
    delete actions['kale'];
  });
});

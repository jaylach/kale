var fs = require('fs');
var rimraf = require('rimraf');
var should = require('should');

var kale = require('../index');
var actions = require('../lib/actions');

// Get our test cases
var templates = fs.readdirSync('test/templates')
  .filter(function(file) {
    return file.indexOf('kale') >= 0;
  })
  .map(function(file) {
    return file.replace('.kale', '');
  });

var kaleOptions = { 
  pretty: true, 
  outPath: 'test/tmp',
  _banner: 'var $engine = require("../../lib/engine");'
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

  // Run our test templates
  templates.forEach(function(test) {
    var name = test.replace(/[-.]/g, ' ');
    describe(name, function() {
      var kalePath = __dirname + '/templates/' + test + '.kale';
      var jsonPath = './templates/' + test + '.json';

      // Get our JSON and render our template
      var json = require(jsonPath);
      var rendered = kale.render(kalePath, kaleOptions);

      rendered.forEach(function(tpl) {
        if ( json[tpl.name] == null ) return;
        
        it(tpl.name.replace(/[_]/g, ' '), function() {
          var template = require('./tmp/' + tpl.name);

          var data = json[tpl.name];
          var input = data.input;
          var locals = data.locals || {};
          var expected = data.expected;

          var result = template(input, locals);
          result.should.eql(expected);
        });
      });
    });
  });

  after(function() {
    rimraf.sync('test/tmp');
    delete actions['kale'];
  });
});

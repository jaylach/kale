var fs = require('fs');
var rimraf = require('rimraf');
var should = require('should');

var kale = require('../index');

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
  });

  // Run our test templates
  templates.forEach(function(test) {
    var name = test.replace(/[-.]/g, ' ');
    it(name, function(done) {
      var kalePath = __dirname + '/templates/' + test + '.kale';
      var jsonPath = './templates/' + test + '.json';

      // Get our JSON and render our template
      var json = require(jsonPath);
      var rendered = kale.render(kalePath, kaleOptions);

      rendered.forEach(function(tpl) {
        var template = require('./tmp/' + tpl.name);
        var result = template(json[tpl.name].input);
        
        result.should.eql(json[tpl.name].expected);
      });

      done();
    });
  });

  after(function() {
    rimraf.sync('test/tmp');
  });
});

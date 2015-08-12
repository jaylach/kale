var fs = require('fs');
var rimraf = require('rimraf');
var should = require('should');

var kale = require('../index');

// Get our test cases
var cases = fs.readdirSync('test/cases')
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
});

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

  // Run our test cases
  cases.forEach(function(test) {
    var name = test.replace(/[-.]/g, ' ');
    it(name, function(done) {
      var kalePath = __dirname + '/cases/' + test + '.kale';
      var jsonPath = './cases/' + test + '.json';

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

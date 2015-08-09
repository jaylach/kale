"use strict";

var fs = require('fs');
var path = require('path');

var parser = require('./parser').parser;
parser.yy = require('./nodes');

var glob = require('glob');
var beautify = require('js-beautify').js_beautify;
var SourceNode = require('source-map').SourceNode;
var mkdirp = require('mkdirp');
var _ = require('lodash');

var defaultOptions = {};

// -----
//  Kale Functions
// -----

// compileFile()
var compileFile = function compileFile(fileName) {
  var string = fs.readFileSync(fileName, 'utf8');
  var ast = parser.parse(string);

  var data = { fileName: fileName };
  return ast.map(function(node) {
    return {
      name: node.name,
      code: node.compile(data)
    };
  });
}; //- compileFile()

// compile()
var compile = function compile(input, output, options) {
  var files = glob.sync(input);
  options = _.defaults((options || {}), defaultOptions);

  var outPath = path.resolve(output);
  mkdirp.sync(outPath);

  if ( Array.isArray(files) ) {
    var banner = options._banner || [
      'var $engine = require("kale/engine");'
    ];

    files.forEach(function(file) {
      var nodes = compileFile(file);
      nodes.forEach(function(node) {
        var sourceNode = new SourceNode(null, null, null, '')
          .add(banner)
          .add('module.exports = ')
          .add(node.code);

        var codeString = beautify(sourceNode.toString(), { indent_size: 2 });
        fs.writeFileSync(path.join(outPath, node.name + '.js'), codeString, 'utf8');
      });
    });
  }
}; //- compile()

// Exports
module.exports = {
  compile: compile
};
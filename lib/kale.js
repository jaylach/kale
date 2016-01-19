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

// render()
var render = function render(pattern, options) {
  options = _.defaults((options || {}), defaultOptions);

  var outPath = null;
  if ( options.outPath != null ) {
    outPath = path.resolve(options.outPath);
    mkdirp.sync(outPath);
  }
  else {
    throw new Error('The outPath option is required!');
  }

  var srcPath = null; 
  if ( options.srcPath != null ) {
    srcPath = path.resolve(options.srcPath);
    mkdirp.sync(srcPath);
  }

  var files = glob.sync(pattern);
  files.forEach(function(file) {
    var string = fs.readFileSync(file, 'utf8');
    var ast = parser.parse(string);

    var data = { fileName: file };
    var sourceNode = new SourceNode(null, null, null, '')
      .add('module.exports = ')
      .add(ast.compile(data));

    var codeString = sourceNode.toString();
    if ( options.pretty === true ) codeString = beautify(codeString, { indent_size: 2 });

    var outFile = "";
    if (srcPath == null) {
      outFile = path.join(outPath, path.basename(file, path.extname(file)) + '.js');      
    } else {
      outFile = path.join(path.dirname(file).replace(options.srcPath, options.outPath), path.basename(file, path.extname(file)) + '.js');
    }
    mkdirp.sync(path.dirname(outFile));
    fs.writeFileSync(outFile, codeString, 'utf8');
  });
}; //- render()

// Exports
module.exports = {
  render: render
};
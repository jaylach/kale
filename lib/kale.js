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
var render = function render(fileName, options) {
  options = _.defaults((options || {}), defaultOptions);

  var outPath = null;
  if ( options.outPath != null ) {
    outPath = path.resolve(options.outPath);
    mkdirp.sync(outPath);
  }

  var banner = options._banner || [
    'var $engine = require("kale/engine");'
  ];

  var string = fs.readFileSync(fileName, 'utf8');
  var ast = parser.parse(string);

  var data = { fileName: fileName };

  // NOTE: The side effects here aren't great, but it'll work.
  return ast.map(function(node) {
    var sourceNode = new SourceNode(null, null, null, banner)
      .add('module.exports = ')
      .add(node.compile(data));

    var codeString = sourceNode.toString();
    if ( options.pretty === true ) codeString = beautify(codeString, { indent_size: 2 });

    var result = {
      name: node.name
    };

    if ( outPath != null ) {
      var outFile = path.join(outPath, node.name + '.js');
      fs.writeFileSync(outFile, codeString, 'utf8');

      result['file'] = outFile;
    }
    else {
      result['code'] = codeString;
    }

    return result;
  });
}; //- render()

// Exports
module.exports = {
  render: render
};
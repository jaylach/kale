"use strict";

var fs = require('fs');
var path = require('path');
var Compiler = require('./compiler');
var Engine = require('./engine');

var parser = require('./parser').parser;
parser.yy = require('./nodes');

var glob = require('glob');
var beautify = require('js-beautify').js_beautify;
var _ = require('lodash');

// Create our engine
var $engine = new Engine();
var _kaleActions = require('./actions');

_.forEach(_.pairs(_kaleActions), function(pair) {
  var name = pair[0];
  var action = pair[1];

  $engine.addAction(name, action);
});

// -----
//  Kale Functions
// -----

// compileFile()
var compileFile = function compileFile(fileName) {
  var string = fs.readFileSync(fileName, 'utf8');
  var ast = parser.parse(string);
  
  var c = new Compiler(ast, fileName);
  var result = c.compile();

  _.forEach(_.pairs(result), function(pairs) {
    $engine._addTemplate(pairs[0], pairs[1]);
  });
}; //- compileFile()

// compile()
var compile = function compile(fileGlob) {
  var files = glob.sync(fileGlob);

  if ( Array.isArray(files) ) {
    files.forEach(function(file) {
      compileFile(file);
    });
  }

  return $engine;
}; //- compile()

// addAction()
var addAction = function addAction(actionName, actionFunc) {
  $engine.addAction(actionName, actionFunc);
}; //- addAction()

// Exports
module.exports = {
  compile: compile,
  addAction: addAction
};
"use strict";

var fs = require('fs');
var path = require('path');
var Compiler = require('./compiler');
var Engine = require('./engine');
var parser = require('./parser').parser;
parser.yy = require('./nodes');

var _ = require('lodash');

// Create our engine
var $engine = new Engine();
var _kaleActions = require('./actions');

_.forEach(_.pairs(_kaleActions), function(pair) {
  var name = pair[0];
  var action = pair[1];

  $engine.addAction(name, action);
});

// Kale Functions

// compile()
var compile = function compile(string) {
  var ast = parser.parse(string);

  var c = new Compiler(ast);
  var result = c.compile();

  _.forEach(_.pairs(result), function(pairs) {
    $engine._addTemplate(pairs[0], pairs[1]);
  });

  return $engine;
}; //- compile()

// compileFile()
var compileFile = function compileFile(fileName) {
  var contents = fs.readFileSync(fileName, 'utf8');  

  return compile(contents)
}; //- compileFile()

// render()
var render = function render(string, input, locals) {
  var compiled = compile(string);

  return compiled(input, locals);
}; //- render()

// renderFile()
var renderFile = function renderFile(fileName, input, locals) {
  var compiled = compileFile(fileName);

  return compiled(input, locals);
}; //- renderFile()

// addAction()
var addAction = function addAction(actionName, actionFunc) {
  $engine.addAction(actionName, actionFunc);
}; //- addAction()

// Exports
module.exports = {
  compile: compile,
  compileFile: compileFile,
  render: render,
  renderFile: renderFile,
  addAction: addAction
};
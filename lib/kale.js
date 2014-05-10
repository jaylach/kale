"use strict";

var fs = require('fs');
var parser = require('./parser').parser;
parser.yy = require('./nodes');

var _ = require('lodash');
var Compiler = require('./compiler');

// compile()
var compile = function compile(string) {
  var ast = parser.parse(string);
  return new Compiler(ast).compile();
}; //- compile()

// compileFileSync()
var compileFileSync = function compileFileSync(path) {
  var data = fs.readFileSync(path, 'utf8');
  return compile(data);
}; //- compileFileSync()

// compileFile()
var compileFile = function compileFile(path, callback) {
  fs.readFile(path, 'utf8', function(error, data) {
    if ( _.isFunction(callback) ) {
      if ( error != null ) return callback(error);
      
      callback(null, compile(data));
    }
  })
}; //- compileFile()

// render()
var render = function render(string, locals, formatter) {
  var compiler = compile(string);
  return compiler(locals, formatter);
}; //- render()

// renderFile()
var renderFile = function renderFile(path, locals, formatter, callback) {
  compileFile(path, function(error, compile) {
    if ( _.isFunction(callback) ) {
      if ( error != null ) return callback(error);

      callback(null, compile(locals, formatter));
    }
  });
}; //- renderFile()

// Exports
module.exports = {
  compile: compile,
  compileFile: compileFileSync,
  render: render,
  renderFile: renderFile
}
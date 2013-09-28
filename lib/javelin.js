var fs = require('fs');
var path = require('path');

var assert = require('assert-plus');
var _ = require('underscore');

var parser = require('./parser').parser;
parser.yy = require('./nodes');

var Compiler = require('./compiler');

// -----
//  Fields
// -----

var exports = module.exports = {};
var cache = {};
var builders = {};

// -----
//  Helpers
// -----

// parseSync()
var parseSync = function parseSync(string) {
  try {
    return parser.parse(string);
  }
  catch ( error ) {
    throw error;
  }
}; //- parseSync()

// parse()
var parse = function parse(string, callback) {
  process.nextTick(function parseNextTick() {
    var err = null;
    try {
      var ast = parser.parse(string);
    }
    catch ( error ) {
      err = error;
    }

    if ( _.isFunction(callback) ) {
      return callback(err, ast);
    }
  });
}; //- parse()

// compileSync()
var compileSync = function compileSync(string, format) {
 var builder = builders[format];
  if ( builder == null ) {
    throw new Error('A builder with the name "' + format + '" does not exist!');
  }

  var ast = parseSync(string);
  var compiler = new Compiler(ast, builder);
  return compiler.compile.bind(compiler);
}; //- compileSync()

// compileFileSync()
var compileFileSync = function compileFileSync(filePath, format) {
  try {
    var data = fs.readFileSync(filePath, 'UTF8');
    return compileSync(data, format);
  }
  catch ( error ) {
    throw error;
  }
}; //- compileFileSync()

// -----
//  Exports
// -----

// registerBuilder()
exports.registerBuilder = function registerBuilder(name, builder) {
  builders[name] = builder;
}; //- registerBuilder()

exports.parse = parse;
exports.parseSync = parseSync;

exports.compile = compileSync;
exports.compileFile = compileFileSync;

// Register default builders
exports.registerBuilder('json', require('./builders/json'));
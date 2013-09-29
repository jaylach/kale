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

// getBuilder()
var getBuilder = function getBuilder(format) {
  var builder = builders[format];
  if ( builder == null ) {
    throw new Error('A builder with the name "' + format + '" does not exist!');
  }
  else {
    return builder;
  }
}; //- getBuilder()

// parseSync()
var parseSync = function parseSync(string, fileName) {
  try {
    var ast = null;

    if ( fileName != null && cache[fileName] != null ) {
      ast = cache[fileName];
    }
    else {
      ast = parser.parse(string);
      cache[fileName] = ast;
    }

    return ast;
  }
  catch ( error ) {
    throw error;
  }
}; //- parseSync()

// parse()
var parse = function parse(string, fileName, callback) {
  if ( _.isFunction(fileName) ) {
    callback = fileName;
    fileName = null;
  }

  process.nextTick(function parseNextTick() {
    var err = null;
    var ast = null;

    try {
      if ( fileName != null && cache[fileName] != null ) {
        ast = cache[fileName];
      }
      else {
        ast = parser.parse(string);
        cache[fileName] = ast;
      }
    }
    catch ( error ) {
      err = error;
    }

    if ( _.isFunction(callback) ) {
      return callback(err, ast);
    }
  });
}; //- parse()

// compile()
var compile = function compile(string, options) {
  options = options || {};

  var ast = parseSync(string, options.fileName);

  return function compile(format, locals, callback) {
    if ( _.isFunction(locals) ) {
      callback = locals;
      locals = {};
    }

    process.nextTick(function compileNextTick() {
      var builder = getBuilder(format);
      var compiler = new Compiler(ast, builder, parseSync);

      var err = null;
      var result = null;

      try {
        result = compiler.compile(locals);
      }
      catch ( error ) {
        err = error;
      }

      if ( _.isFunction(callback) ) {
        callback(err, result);
      }
    });
  };
}; //- compile()

// compileSync()
var compileSync = function compileSync(string, options) {
  options = options || {};

  var ast = parseSync(string, options.fileName);
  return function compileSync(format, locals) {
    var builder = getBuilder(format);
    var compiler = new Compiler(ast, builder, parseSync);

    return compiler.compile(locals);
  };
}; //- compileSync()

// compileFile()
var compileFile = function compileFile(fileName, options) {
  options = options || {};

  try {
    var data = fs.readFileSync(fileName, 'UTF8');
    return compile(data, options);
  }
  catch ( error ) {
    throw error;
  }
}; //- compileFile()

// compileFileSync()
var compileFileSync = function compileFileSync(fileName, options) {
  options = options || {};

  try {
    var data = fs.readFileSync(fileName, 'UTF8');
    return compileSync(data, options);
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

// express()
exports.express = function(format) {
  return function javelinExpress(path, options, callback) {
    if ( _.isFunction(options) ) {
      callback = options;
      options = {};
    }

    var compile = compileFile(path, options);
    compile('json', options, callback);
  };
}; //- express()

exports.parse = parse;
exports.parseSync = parseSync;

exports.compile = compile;
exports.compileSync = compileSync;

exports.compileFile = compileFile;
exports.compileFileSync = compileFileSync;

// Register default builders
exports.registerBuilder('json', require('./builders/json'));
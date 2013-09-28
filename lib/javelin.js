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
    var ast = null;

    try {
      ast = parser.parse(string);
    }
    catch ( error ) {
      err = error;
    }

    if ( _.isFunction(callback) ) {
      return callback(err, ast);
    }
  });
}; //- parse()

// render()
var render = function render(string, format, locals, callback) {
  if ( _.isFunction(locals) ) {
    callback = locals;
    locals = {};
  }

  parse(string, function renderParseCallback(error, ast) {
    if ( error != null ) {
      if ( _.isFunction(callback) ) {
        return callback(error);
      }
    }

    process.nextTick(function renderNextTick() {
      var err = null;
      var result = null;

      try {
        var builder = getBuilder(format);
        var compiler = new Compiler(ast, builder);
        result = compiler.compile(locals);
      }
      catch ( error2 ) {
        err = error2;
      }

      if ( _.isFunction(callback) ) {
        return callback(err, result);
      }
    });
  });
}; //- render()

// renderSync()
var renderSync = function renderSync(string, format, locals) {
  try {
    var builder = getBuilder(format);

    var ast = parseSync(string);
    var compiler = new Compiler(ast, builder);

    return compiler.compile(locals);
  }
  catch ( error ) {
    throw error;
  }
}; //- renderSync()

// renderFile()
var renderFile = function renderFile(file, format, locals, callback) {
  if ( _.isFunction(locals) ) {
    callback = locals;
    locals = {};
  }
  
  fs.readFile(file, 'UTF8', function(error, data) {
    if ( error != null ) {
      if ( _.isFunction(callback) ) {
        return callback(error);
      }
    }

    return render(data, format, locals, callback);
  });
}; //- renderFile()

// renderFileSync()
var renderFileSync = function renderFileSync(file, format, locals) {
  try {
    var data = fs.readFileSync(file, 'UTF8');
    return renderSync(data, format, locals);
  }
  catch ( error ) {
    throw error;
  }
}; //- renderFileSync()

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

    renderFile(path, format, options, callback);
  };
}; //- express()

exports.parse = parse;
exports.parseSync = parseSync;

exports.render = render;
exports.renderSync = renderSync;

exports.renderFile = renderFile;
exports.renderFileSync = renderFileSync;

// Register default builders
exports.registerBuilder('json', require('./builders/json'));
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

// render()
var render = function render(string, format, options, callback) {
  if ( _.isFunction(options) ) {
    callback = options;
    options = {};
  }

  parse(string, options.fileName, function renderParseCallback(error, ast) {
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
        compiler.parse = parseSync;

        delete options['fileName'];
        result = compiler.compile(options);
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
var renderSync = function renderSync(string, format, options) {
  options = options || {};

  try {
    var builder = getBuilder(format);

    var ast = parseSync(string, options.fileName);
    var compiler = new Compiler(ast, builder);
    compiler.parse = parseSync;

    delete options['fileName'];
    return compiler.compile(options);
  }
  catch ( error ) {
    throw error;
  }
}; //- renderSync()

// renderFile()
var renderFile = function renderFile(file, format, options, callback) {
  if ( _.isFunction(options) ) {
    callback = options;
    options = {};
  }

  if ( options.fileName == null ) {
    options.fileName = file;
  }

  fs.readFile(file, 'UTF8', function(error, data) {
    if ( error != null ) {
      if ( _.isFunction(callback) ) {
        return callback(error);
      }
    }

    return render(data, format, options, callback);
  });
}; //- renderFile()

// renderFileSync()
var renderFileSync = function renderFileSync(file, format, options) {
  options = options || {};
  if ( options.fileName == null ) {
    options.fileName = file;
  }

  try {
    var data = fs.readFileSync(file, 'UTF8');
    return renderSync(data, format, options);
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
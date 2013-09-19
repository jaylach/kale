var fs = require('fs');
var path = require('path');

var assert = require('assert-plus');

var parser = require('./parser').parser;
parser.yy = require('./nodes');

var Compiler = require('./compiler');

// -----
//  Helpers
// -----

var cache = {};
var builders = {};

// parse()
var parse = function parse(file) {
  try {
    var data = fs.readFileSync(file, 'UTF8');
    return parser.parse(data);
  }
  catch ( error ) {
    throw error;
  }
}; //- parse()

// compile()
var compile = function compile(file, format) {
  assert.string(file, 'file');
  assert.string(format, 'format');

  var builder = builders[format];
  if ( builder == null ) {
    throw new Error('A builder with the name "' + format + '" does not exist!');
  }

  var fileNormalized = path.normalize(file);
  try {
    var ast = cache[fileNormalized];
    if ( ast == null ) {
      ast = parse(fileNormalized);
      cache[fileNormalized] = ast;
    }

    return Compiler(ast, builder);
  }
  catch ( error ) {
    throw error;
  }
}; //- compile()

// registerBuilder()
var registerBuilder = function registerBuilder(name, builder) {
  builders[name] = builder;
}; //- registerBuilder()

// Register default builders
registerBuilder('json', require('./builders/json'));

// -----
//  Javelin
// -----
var Javelin = {
  compile: compile
};

// Exports
module.exports = Javelin;
var fs = require('fs');

var assert = require('assert-plus');

var parser = require('./parser').parser;
parser.yy = require('./nodes');

var Compiler = require('./compiler');

// -----
//  Helpers
// -----

// parse()
var parse = function(file) {
  try {
    var data = fs.readFileSync(file, 'UTF8');
    return parser.parse(data);
  }
  catch ( error ) {
    throw error;
  }
}; //- parse()

// compile()
var compile = function(file, format) {
  assert.string(file, 'file');
  assert.string(format, 'format');
  
  try {
    var ast = parse(file);
    return Compiler(ast, format);
  }
  catch ( error ) {
    throw error;
  }
}; //- compile()

// -----
//  Javelin
// -----
var Javelin = {
  compile: compile
};

// Exports
module.exports = Javelin;
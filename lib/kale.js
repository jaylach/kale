"use strict";

var fs = require('fs');
var parser = require('./parser').parser;
parser.yy = require('./nodes');

var Compiler = require('./compiler');

// -----
//  Test Code
// -----

var data = fs.readFileSync('examples/test.kale', 'utf8');
var ast = parser.parse(data);

console.log(JSON.stringify(ast));

var c = new Compiler(ast);
c.compile();
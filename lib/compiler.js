"use strict";

// The 'compiler.js' file is responsible for inspecting the ast generated
// by the kale parser.

var SourceNode = require("source-map").SourceNode;
var _ = require('lodash');

// -----
//  Constructor
// -----

// Compiler()
var Compiler = function Compiler(ast, fileName) {
  // Define properties
  Object.defineProperty(this, 'ast', {
    value: ast,
    writable: false,
    configurable: false
  });

  Object.defineProperty(this, 'fileName', {
    value: fileName, 
    writable: false,
    configurable: false
  });
}; //- Compiler()

// -----
//  Public
// -----

// compile()
Compiler.prototype.compile = function compile() {
  var fileName = this.fileName;
  var result = {};

  /*var sourceNode = new SourceNode(null, null, null, "");
  sourceNode.add(this.ast.map(function(node) {
    var snode = node.compile({ fileName: fileName });
    result[node.name] = snode.to
    return snode;
  }));*/

  var data = { fileName: fileName };
  this.ast.forEach(function(node) {
    result[node.name] = node.compile(data).toString();
    console.log(result[node.name]);
  });
  
  return result;
}; //- compile()

// Exports
module.exports = Compiler;

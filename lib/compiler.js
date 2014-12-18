// The 'compiler.js' file is responsible for inspecting the ast generated
// by the kale parser.

var _ = require('lodash');

// -----
//  Constructor
// -----

// Compiler()
var Compiler = function Compiler(ast) {
  // Define properties
  Object.defineProperty(this, 'ast', {
    value: ast,
    writable: false
  });
}; //- Compiler()

// -----
//  Public
// -----

// compile()
Compiler.prototype.compile = function compile() {
  var result = {};

  var $this = this;
  _.forEach(this.ast, function(ast) {
    var body = [];
    $this._compileNode(ast, body, {});
    result[ast.name] = body.join('');
  });

  return result;
}; //- compile()

// -----
//  Private
// -----

// _compileNode()
Compiler.prototype._compileNode = function _compileNode(node, body, args) {
  if ( _.isFunction(node.codeStart) ) {
    body.push(node.codeStart(args));
  }
  var type = node.type;

  // Compile our children nodes
  if ( node.body != null && _.isArray(node.body) ) {
    var bodyLength = node.body.length;
    for ( var i = 0; i <= bodyLength - 1; i++ ) {
      var n = node.body[i];
      this._compileNode(n, body, args);
    }
  }
  else if ( node.body != null && _.isFunction(node.body.codeStart) ) {
    this._compileNode(node.body, body, args);
  }

  if ( _.isFunction(node.codeEnd) ) {
    body.push(node.codeEnd(args));
  }
}; //- _compileNode()

// Exports
module.exports = Compiler;

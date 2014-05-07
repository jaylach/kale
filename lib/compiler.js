// The 'compiler.js' file is responsible for inspecting the ast generated
// by the kale parser. It will then call the proper functions on the 
// formatter (provided by the user, or default) for generating the final
// data object.

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
  var body = [];
  this._compileNode(this.ast, body);

  var compileFunc = new Function('$$formatter', body.join(''));
  var result = function(locals, formatter) {
    compileFunc.call(locals, formatter);
    return formatter.getResult();
  }

  var JsonFormatter = require('./formatters/jsonFormatter');
  var formatter = new JsonFormatter();

  var out = result({
    user_profile: {
      id: _.uniqueId(),
      first_name: 'Jason',
      last_name: 'LaChapelle'
    }
  }, formatter);

  console.log(compileFunc.toString());
  console.log(out);
}; //- compile()

// -----
//  Private
// -----

// _compileNode()
Compiler.prototype._compileNode = function _compileNode(node, body) {
  body.push(node.codeStart());
  var type = node.type;

  // Compile our children nodes
  if ( node.body != null && _.isArray(node.body) ) {
    var bodyLength = node.body.length;
    for ( var i = 0; i <= bodyLength - 1; i++ ) {
      var n = node.body[i];
      this._compileNode(n, body);
    }
  }
  else if ( node.body != null && _.isFunction(node.body.codeStart) ) {
    this._compileNode(node.body, body);
  }

  if ( _.isFunction(node.codeEnd) ) {
    body.push(node.codeEnd());
  }
}; //- _compileNode()

// Exports
module.exports = Compiler;


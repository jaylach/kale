var vm = require('vm');
var path = require('path');
var fs = require('fs');

var assert = require('assert-plus');
var _ = require('underscore');

var parser = require('./parser').parser;
parser.yy = require('./nodes');

var Context = require('./context');

// -----
//  Compiler
// -----

// Compiler()
var Compiler = function Compiler(ast, builder) {
  this.ast = ast;
  this.builder = builder;
}; //- Compiler()

// -----
//  Public
// -----

// compile()
Compiler.prototype.compile = function compile(locals) {
  var self = this;
  var builder = this.builder;
  var ast = this.ast;

  var globals = new Context(locals);
  var context = {
    global: globals
  };

  var root = builder.buildNode(ast, context);

  _.each(ast.body, function(node, index) {
    node.parent = ast;
    node.root = root;

    self._walkNode(node, context, root, index);
  });

  return root;
}; //- compile()

// -----
//  Private
// -----

// _walkNode()
Compiler.prototype._walkNode = function _walkNode(node, context, root, index) {
  var self = this;
  var builder = this.builder;

  if ( builder.shouldBuild(node.type) ) {
    var me = context.this || {};
    if ( node.parent.type === 'ARRAY' && index != null ) {
      me = context.this[index];
    }

    var context = Context.get(node, me, context.global || {});
    var newRoot = builder.buildNode(node, context, root);

    if ( node.type === 'ARRAY' ) {
      var leng = _.toArray(context.this).length;
      var temp = node.body[0];

      node.body = [];
      for ( var i = 0; i <= leng - 1; i++ ) {
        node.body.push(temp);
      }
    }
    else if ( node.type === 'INCLUDE' ) {
      var includeAst = self._getInclude(node.include);
      node.body = includeAst.body;
    }

    _.each(node.body, function(item, index) {
      item.parent = node;
      item.root = newRoot;

      self._walkNode(item, context, newRoot, index);
    });
  } //- shouldBuild
}; //- _walkNode()

// _getInclude()
Compiler.prototype._getInclude = function(include) {
  var fullPath = path.normalize(process.cwd() + '/' + include + '.jav');

  try {
    var data = fs.readFileSync(fullPath, 'UTF8');
    return parser.parse(data);
  }
  catch ( error ) {
    throw error;
  }
}; //- _getInclude()

// Exports
module.exports = Compiler;
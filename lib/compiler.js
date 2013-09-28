var vm = require('vm');
var path = require('path');
var fs = require('fs');

var assert = require('assert-plus');
var _ = require('underscore');

// -----
//  Context
// -----

// Context()
var Context = function Context(data) {
  data = data || {};
  
  var keys = _.keys(data);

  var context = {};
  _.each(keys, function(key) {
    context[key] = data[key];
  });

  return context; 
}; //- Context()

// get()
Context.get = function(node, data, globals) {
  assert.object(node, 'node');
  assert.object(data, 'data');
  assert.object(globals, 'globals');

  var context = {};

  if ( globals != null ) {
    context.global = globals;
  }

  // Set our configuration
  var configs = _.where(node.body, { type: 'CONFIG' });
  context.config = _.reduce(configs, function(obj, cfg) {
    if ( node.type === 'ARRAY' ) {
      if ( cfg.config === 'named' ) {
        throw new Error('Array types must be named!');
      }
    }

    obj[cfg.config] = cfg.value;
    return obj;
  }, {});

  // Set our "this" scope
  if ( node.source != null ) {
    var nodeCtx = node.context || 'THIS';
    if ( nodeCtx === 'GLOBAL' ) {
      // Copy properties from global to here
      context.this = new Context(globals[node.source]);
    }
    else if ( nodeCtx === 'THIS' ) {
      if ( node.type === 'PROPERTY' ) {
        context.this = new Context(data);
      }
      else {
        context.this = new Context(data[node.source]);
      }
    }
  } 
  else {
    context.this = new Context(data);
  }

  // Find any scripts
  var scripts = _.where(node.body, { type: 'SCRIPT' });
  scripts = _.pluck(scripts, 'script');

  // Get our context for this VM
  var sandbox = {
    node: {
      source: node.source,
      name: node.name,
      value: context.this[node.name]
    },
    locals: context.global,
    parent: context.this,
    console: console
  };

  // Run our scripts
  _.each(scripts, function(script) {
    var result = vm.runInNewContext(script, sandbox);
    if ( result != null ) {
      context.this[node.name] = result;
    }
  });

  return context;
}; //- get()

// -----
//  Helpers
// -----

// walkNode()
var walkNode = function walkNode(builder, node, context, root, index, parser) {
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
      var includeAst = getInclude(node.include, parser);
      node.body = includeAst.body;
    }

    _.each(node.body, function(item, index) {
      item.parent = node;
      item.root = newRoot;

      walkNode(builder, item, context, newRoot, index, parser);
    });
  }
}; //- walkNode()

// getInclude()
var getInclude = function getInclude(include, parser) {
  var fullPath = path.normalize(process.cwd() + '/' + include + '.jav');
  return parser(fullPath);
}; //- getInclude()

// -----
//  Compiler
// -----

// Compiler
var Compiler = function Compiler(ast, builder, parser) {
  return function compile(data, justAst) {
    if ( justAst === true ) return JSON.stringify(ast);

    var globals = new Context(data);

    var context = {
      global: globals
    };

    var root = builder.buildNode(ast, context);

    _.each(ast.body, function(node, index) {
      node.parent = ast;
      node.root = root;

      walkNode(builder, node, context, root, index, parser);
    });

    return root;
  };
}; //- Compiler()

// Exports
module.exports = Compiler;
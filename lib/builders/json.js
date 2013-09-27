var _ = require('underscore');

// -----
//  Helpers
// -----

// buildObject()
var buildObject = function buildObject(node, context, root) {
  var me = context.this;
  var body = node.body;

  if ( node.source == null && node.parent.type !== 'ARRAY' ) {
    var newNode = {};
    return newNode;
  }

  // Create our object node
  var haveSources = _.pluck(body, 'source');
  var newRoot = {};

  if ( node.parent.type === 'ARRAY' ) {
    node.root.push(newRoot);
  }

  if ( context.config.copy !== false ) {
    var keys = _.omit(me, haveSources);
    _.each(_.keys(keys), function(key) {
      if ( me[key] != null ) {
        newRoot[key] = me[key];
      }
    });
  }

  if ( context.config.named !== false ) {
    if ( node.parent.type === 'ARRAY' ) {
      return newRoot;
    }
    else {
      root[node.name] = newRoot;
      return root[node.name];
    }
  }
  else {
    _.each(_.keys(newRoot), function(key) {
      root[key] = newRoot[key];
    });
    return root;
  }
}; //- buildObject()

// buildArray()
var buildArray = function buildArray(node, context, root) {
  return root[node.name] = [];
}; //- buildArray()

// buildProperty()
var buildProperty = function buildProperty(node, context, root) {
  var me = context.global;
  if ( node.context === 'THIS' ) {
    me = context.this;
  }

  if ( me[node.source] != null ) {
    root[node.name] = me[node.source];
  }

  return root;
}; //- buildProperty()

// -----
//  Builder
// -----

// Builder
var Builder = {
  // shouldBuild()
  shouldBuild: function shouldBuild(type) {
    return (type !== 'COMMENT') && (type !== 'CONFIG') && (type !== 'SCRIPT');
  }, //- shouldBuild()
  // buildNode()
  buildNode: function buildNode(node, context, root) {
    switch ( node.type ) {
      case "TEMPLATE": {
        return {};
        break;
      }
      case "OBJECT": {
        return buildObject(node, context, root);
        break;
      }
      case "ARRAY": {
        return buildArray(node, context, root);
        break;
      }
      case "PROPERTY": {
        return buildProperty(node, context, root);
        break;
      };
    }
  } //- buildNode()
}; //- Builder

// Exports
module.exports = Builder;

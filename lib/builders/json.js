var _ = require('underscore');

// -----
//  Helpers
// -----

// buildObject()
var buildObject = function buildObject(node, context, root) {
  var me = context.this;
  var body = node.body;
  
  // Create our object node
  root[node.name] = {};

  var haveSources = _.pluck(body, 'source');

  // If we should copy the non-explicit keys over to the new object
  // do that now...
  if ( context.config != null ) {
    if ( context.config.named === false ) {
      root = {};
    }

    if ( context.config.copy !== false ) {
      var keys = _.omit(context.this, haveSources);
      root[node.name] = keys;
    }
  }

  return root[node.name];
}; //- buildObject()

// buildProperty()
var buildProperty = function buildProperty(node, context, root) {
  if ( node.context === "GLOBAL" ) {
    root[node.name] = context.global[node.source];
  }
  else if ( node.context === "THIS" ) {
    root[node.name] = context.this[node.source];
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
    return (type !== 'COMMENT') && (type !== 'CONFIG');
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
      case "PROPERTY": {
        return buildProperty(node, context, root);
      };
    }
  } //- buildNode()
}; //- Builder

// Exports
module.exports = Builder;

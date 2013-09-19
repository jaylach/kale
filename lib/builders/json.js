var _ = require('underscore');

// -----
//  Helpers
// -----

// buildObject()
var buildObject = function buildObject(node, context, root) {
  var me = context.this;
  var body = node.body;

  if ( node.source == null ) {
    return {};
  }

  // Create our object node
  var haveSources = _.pluck(body, 'source');
  var newRoot = {};

  if ( context.config.copy !== false ) {
    var keys = _.omit(me, haveSources);
    _.each(_.keys(keys), function(key) {
      if ( me[key] != null ) {
        newRoot[key] = me[key];
      }
    });
  }

  if ( context.config.named !== false ) {
    root[node.name] = newRoot;
    return root[node.name];
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
  var me = _.toArray(context.this);
  var body = node.body;

  if ( node.source == null ) {
    return [];
  }

  // Create our array node
  var haveSources = _.pluck(body, 'source');
  root[node.name] = [];

  if ( context.config.copy !== false ) {
    me.forEach(function(item) {
      var newObj = _.omit(item, haveSources);
      if ( _.keys(newObj).length > 0 ) {
        root[node.name].push(newObj);
      }
    });
  }

  return root[node.name];
}; //- buildArray()

// buildProperty()
var buildProperty = function buildProperty(node, context, root) {
  var me = context.global;
  if ( node.context === 'THIS' ) {
    me = context.this;
  }

  if ( node.parentType !== 'ARRAY' ) {
    if ( me[node.source] != null ) {
      root[node.name] = me[node.source];
    }
  }
  else {
    me = _.toArray(me);
    me.forEach(function(item, index) {
      if ( item[node.source] != null ) {
        if ( root[index] == null ) {
          root[index] = {};
        }

        root[index][node.name] = item[node.source];
      }
    });
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

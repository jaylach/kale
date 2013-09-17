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
  return root[node.name];
}; //- buildObject()

// -----
//  Builder
// -----

// Builder
var Builder = {
  // shouldBuild()
  shouldBuild: function shouldBuild(type) {
    return type !== 'COMMENT';
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
    }
  } //- buildNode()
}; //- Builder

// Exports
module.exports = Builder;

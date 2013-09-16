// -----
//  Node
// -----

// Node()
var Node = function Node(type, body) {
  this.type = type;
  this.body = body;
}; //- Node()

// -----
//  TemplateNode
// -----

// TemplateNode()
var TemplateNode = function TemplateNode(body) {
  Node.call(this, 'TEMPLATE', body);
}; //- TemplateNode()

// formatJSON()
TemplateNode.prototype.formatJSON = function formatJSON(root) {
  this.body.forEach(function(item) {
    item.formatJSON(root);
  });
  return root;
}; //- formatJSON()

// -----
//  PropertyNode
// -----

// PropertyNode()
var PropertyNode = function PropertyNode(source, name, context) {
  Node.call(this, 'PROPERTY', []);

  if ( context == null ) {
    context = 'THIS';
  }

  this.source = source;
  this.name = name;
  this.context = context;
}; //- PropertyNode()

// formatJSON()
PropertyNode.prototype.formatJSON = function formatJSON(root) {
  root[this.name] = {};

  root = root[this.name];
  this.body.forEach(function(item) {
    item.formatJSON(root);
  });
}; //- formatJSON()

// -----
//  ActionNode
// -----

// ActionNode()
var ActionNode = function ActionNode(type, action) {
  PropertyNode.call(this, action.source, action.name, action.context);
  this.type = type.toUpperCase();
  this.body = action.body;
}; //- ActionNode()

// formatJSON()
ActionNode.prototype.formatJSON = function formatJSON(root) {
  switch ( this.type ) {
    case "OBJECT": {
      root[this.name] = {};
      root = root[this.name];
      break;
    }
    case "ARRAY": {
      root[this.name] = [];
      root = root[this.name];
      break;
    }
  }

  this.body.forEach(function(item) {
    item.formatJSON(root);
  });
}; //- formatJSON()

// module.exports
module.exports = {
  Node: Node,
  Template: TemplateNode,
  Property: PropertyNode,
  Action: ActionNode
}; //- module.exports
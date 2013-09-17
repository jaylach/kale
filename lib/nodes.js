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

// -----
//  ActionNode
// -----

// ActionNode()
var ActionNode = function ActionNode(type, action) {
  PropertyNode.call(this, action.source, action.name, action.context);
  this.type = type.toUpperCase();
  this.body = action.body;
}; //- ActionNode()

// -----
//  ConfigSetterNode
// -----

// ConfigSetterNode()
var ConfigSetterNode = function ConfigSetterNode(config, value) {
  Node.call(this, 'CONFIG', []);
  this.config = config;
  this.value = value;
}; //- ConfigSetterNode()

// -----
//  CommentNode
// -----

// CommentNode()
var CommentNode = function CommentNode(comment) {
  Node.call(this, 'COMMENT', []);

  this.text = comment;
}; //- CommentNode()

// module.exports
module.exports = {
  Node: Node,
  Template: TemplateNode,
  Property: PropertyNode,
  Action: ActionNode,
  Comment: CommentNode,
  Config: ConfigSetterNode
}; //- module.exports
var _ = require('underscore');

// -----
//  BaseNode
// -----

// BaseNode()
var BaseNode = function Node(type, body) {
  this.type = type;
  this.body = body;
}; //- BaseNode()

// -----
//  TemplateNode
// -----

// TemplateNode()
var TemplateNode = function TemplateNode(body) {
  BaseNode.call(this, 'TEMPLATE', body);
}; //- TemplateNode()

// -----
//  PropertyNode
// -----

// PropertyNode()
var PropertyNode = function PropertyNode(source, name, context) {
  BaseNode.call(this, 'PROPERTY', []);

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
  if ( type === 'array' ) {
    var objectBody = new ActionNode('object', { source: null, name: null, context: action.context });

    var configs = _.where(action.body, { type: 'CONFIG', config: 'named' });

    var newBody = _.reject(action.body, function(item) {
      return item.type === 'CONFIG' && item.config === 'named';
    });

    objectBody.body = newBody;
    action.body = [ objectBody ].concat(configs);
  }
  PropertyNode.call(this, action.source, action.name, action.context);

  this.body = action.body;
  this.type = type.toUpperCase();
}; //- ActionNode()

// -----
//  IncludeNode
// -----

// IncludeNode()
var IncludeNode = function IncludeNode(include) {
  BaseNode.call(this, 'INCLUDE', []);

  this.include = include;
}; //- IncludeNode()

// -----
//  ScriptNode
// -----

// ScriptNode()
var ScriptNode = function ScriptNode(script) {
  BaseNode.call(this, 'SCRIPT', []);

  this.script = script;
}; //- ScriptNode()

// -----
//  ConfigSetterNode
// -----

// ConfigSetterNode()
var ConfigSetterNode = function ConfigSetterNode(config, value) {
  BaseNode.call(this, 'CONFIG', []);
  this.config = config;
  this.value = value;
}; //- ConfigSetterNode()

// -----
//  CommentNode
// -----

// CommentNode()
var CommentNode = function CommentNode(comment) {
  BaseNode.call(this, 'COMMENT', []);

  this.text = comment;
}; //- CommentNode()

// module.exports
module.exports = {
  Node: BaseNode,
  Template: TemplateNode,
  Property: PropertyNode,
  Action: ActionNode,
  Comment: CommentNode,
  Config: ConfigSetterNode,
  Script: ScriptNode,
  Include: IncludeNode
}; //- module.exports
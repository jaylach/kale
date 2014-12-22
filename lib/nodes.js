"use strict";

var _ = require('lodash');

// -----
//  BaseNode
// -----

// BaseNode()
var BaseNode = function BaseNode(type) {
  this.nodeType = type;
}; //- BaseNode()

// -----
//  AccessorNode
// -----

// AccessorNode()
var AccessorNode = function AccessorNode(base, properties) {
  BaseNode.call(this, 'ACCESSOR');

  this.base = base;
  this.properties = properties || [];
}; //- AccessorNode()

// addProperty()
AccessorNode.prototype.addProperty = function addProperty(property) {
  this.properties = this.properties.concat(property);
}; //- addProperty()

// -----
//  ActionNode
// -----

// ActionNode()
var ActionNode = function ActionNode(name, args) {
  BaseNode.call(this, 'ACTION');

  this.name = name;

  var tempArgs = {};

  if ( args != null ) {
    _.forEach(args, function(item) {
      tempArgs[item.key] = item.value.value;
    });

    tempArgs = JSON.stringify(tempArgs);
  }
  else {
    tempArgs = '$input';
  }

  this.args = tempArgs;
}; //- ActionNode()

// getActionString()
ActionNode.prototype.getActionString = function getActionString(varName) {
  return varName + "=this.callAction('" + this.name + "'," + varName + "," + this.args + ");"
}; //- getActionString()

// -----
//  BlockNode
// -----

// BlockNode()
var BlockNode = function BlockNode(type, body) {
  BaseNode.call(this, 'BLOCK');

  this.type = type;
  this.body = body;
}; //- BlockNode()

// codeStart()
BlockNode.prototype.codeStart = function codeStart() {
  return '';
}; //- codeStart()

// -----
//  OperationNode
// -----

// OperationNode()
var OperationNode = function OperationNode(left, right, op) {
  BaseNode.call(this, 'OPERATION');

  this.left = left;
  this.right = right;
  this.op = op;
}; //- OperationNode()

// getValueString()
OperationNode.prototype.getValueString = function getValueString() {
  return this.left.getValueString() + this.op + this.right.getValueString();
}; //- getValueString()

// -----
//  PropertyNode
// -----

// PropertyNode()
var PropertyNode = function PropertyNode(key, value) {
  BaseNode.call(this, 'PROPERTY');

  this.key = key;
  this.value = value;
}; //- PropertyNode()

// codeStart()
PropertyNode.prototype.codeStart = function codeStart(args) {
  var varName = "$var_" + args.varCount;
  args.varCount++;

  var code = "var " + varName + "=" + this.value.getValueString() + ";";

  if ( this.value.actions != null ) {
    _.forEach(this.value.actions, function(action) {
      code += action.getActionString(varName);
    });
  }

  code += "$final['" + this.key + "']=" + varName + ';';
  return code;
}; //- codeStart()

// -----
//  TemplateDefNode
// -----

// TemplateDefNode()
var TemplateDefNode = function TemplateDefNode(type, name, body) {
  BaseNode.call(this, 'TEMPLATE_DEF');

  this.type = type;
  this.name = name;
  this.body = body;
}; //- TemplateDefNode()

// codeStart()
TemplateDefNode.prototype.codeStart = function codeStart(args) {
  args.templateType = this.type;
  args.varCount = 0;

  var code = "function " + this.name + "(input, locals) {" +
             "var $tplFunction=(function " + this.name + "($input, $) {";

  var $finalCode = "var $final=";
  if ( this.type === 'NEW' ) {
    $finalCode += '{};';
  }
  else if ( this.type === 'MODIFY' ) {
    $finalCode += '$input;'
  }

  return code + $finalCode;
}; //- codeStart()

// codeEnd()
TemplateDefNode.prototype.codeEnd = function codeEnd(args) {
  var code = "return $final;}).bind(this);" +
             "var result = {};" +
             "if ( Array.isArray(input) ) { " +
             "result = [];" +
             "input.forEach(function(item) { result.push($tplFunction(item, locals));}); }" +
             "else { result=$tplFunction(input, locals); }";
             
  if ( this.actions != null ) {
    _.forEach(this.actions, function(action) {
      code += action.getActionString('result');
    });
  }

  code += "return result;};";
  return code;
}; //- codeEnd()

// -----
//  ValueNode
// -----

// ValueNode()
var ValueNode = function ValueNode(type, value) {
  BaseNode.call(this, 'VALUE');

  this.type = type;
  this.value = value;
}; //- ValueNode()

// getValueString()
ValueNode.prototype.getValueString = function getValueString() {
  var value = 'null';

  switch ( this.type ) {
    case 'STRING': {
      value = '"' + this.value + '"';
      break;
    }
    case 'NUMBER': {
      value = parseInt(this.value);
      break;
    }
    case 'BINDING': {
      var props = [ this.value.base ].concat(this.value.properties);

      value = 'this.lookupProperty($input, $, ' + JSON.stringify(props) + ')';
      break;
    }
  }

  return value;
}; //- getValueString()

// Exports
module.exports = {
  Base: BaseNode,
  Accessor: AccessorNode,
  Action: ActionNode,
  Block: BlockNode,
  Operation: OperationNode,
  Property: PropertyNode,
  TemplateDef: TemplateDefNode,
  Value: ValueNode
};
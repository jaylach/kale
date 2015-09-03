"use strict";

var path = require('path');
var SourceNode = require("source-map").SourceNode;

var INVALID_ACTIONS = [
  'addAction',
  'hasAction'
];

var varCount = 0;
// _getVarName()
var _getVarName = function _getVarName() {
  return '$' + varCount++;
}; //- _getVarName()

// -----
//  BaseNode
// -----

// BaseNode()
var BaseNode = function BaseNode(line, column, nodeType) {
  this.line = line;
  this.column = column;
  this.nodeType = nodeType;
}; //- BaseNode()

// _sn()
BaseNode.prototype._sn = function _sn(fileName, chunk) {
  return new SourceNode(this.line, this.column, fileName, chunk);
}; //- _sn()

// -----
//  TemplateNode
// -----

// TemplateNode()
var TemplateNode = function TemplateNode(line, column, body) {
  BaseNode.call(this, line, column, 'TEMPLATE');

  this.name = '$template';

  if ( !Array.isArray(body) ) {
    body = [ body ];
  }
  this.body = body;
}; //- TemplateNode()

TemplateNode.prototype = Object.create(BaseNode.prototype);

// compile()
TemplateNode.prototype.compile = function compile(data) {
  varCount = 0;
  var output = this._sn(data.fileName, "");

  this.imports = this.imports || [];

  // TODO: There's gotta be a better solution to this ...
  var banner = [ 'var $runtime = require("kale/lib/runtime");' ];

  if ( process.env.KALE_ENV === 'test' ) {
    banner = [ 'var $runtime = require("' + path.join(__dirname, 'runtime') + '");' ];
    this.imports.unshift(new ImportNode(this.line, this.column, '*', path.join(__dirname, 'actions')));
  }
  else {
    this.imports.unshift(new ImportNode(this.line, this.column, '*', 'kale/lib/actions'));
  }

  return output
    .add('function ' + this.name + '($input, locals) {')
    .add(banner)
    .add('var $$imports = {};')
    .add(this.imports.map(function(node) {
      return node.compile(data);
    }))
    .add(this.body.map(function(node) {
      return node.compile(data);
    }))
    .add('};');
}; //- compile()

// -----
//  ImportNode
// -----

// ImportNode()
var ImportNode = function ImportNode(line, column, name, file) {
  BaseNode.call(this, line, column, 'IMPORT');

  this.file = file;
  this.name = name;
}; //- ImportNode()

ImportNode.prototype = Object.create(BaseNode.prototype);

// compile()
ImportNode.prototype.compile = function compile(data) {
  var output = this._sn(data.fileName, "");
  var basename = path.basename(this.file);

  return output
    .add('$runtime.doImport($$imports, "' + this.name + '", "' + basename + '", require("' + this.file + '"));');
}; //- compile()

// -----
//  BlockNode
// -----

// BlockNode()
var BlockNode = function BlockNode(line, column, body) {
  BaseNode.call(this, line, column, 'BLOCK');

  this.body = body;
}; //- BlockNode()

BlockNode.prototype = Object.create(BaseNode.prototype);

// compile()
BlockNode.prototype.compile = function compile(data, isAction) {
  this.varName = _getVarName();

  var output = this._sn(data.fileName, "")
  return output
    .add('var ' + this.varName + ' = (function ' + this.varName + '($input, $) {')
    .add('var $final = {};')
    .add(this.body.map(function(node, index) {
      return node.compile(data);
    }))
    .add('return $final;')
    .add('});')
    .add(this._getResultCode(this.varName, data, isAction));
}; //- compile()

// _getResultCode()
BlockNode.prototype._getResultCode = function _getResultCode(functionName, data, isAction) {
  var output = [
    "var $result = {};",
    "if ( Array.isArray($input) && " + (isAction !== true) + " ) {",
    "  $result = [];",
    "  $input.forEach(function($item) {",
    "    var $x = " + functionName  + "($item, locals);",
    "    if ( $x != null ) $result.push($x);",
    "  });",
    "} else {",
    "  $result = " + functionName + "($input, locals);",
    "}"
  ];

  if ( Array.isArray(this.actions) ) {
    data.parentVar = '$result'; 

    output = output.concat(this.actions.map(function(action) {
      return action.compile(data);
    }));
  }

  output.push("return $result;");

  return output;
}; //- _getResultCode()

// -----
//  PropertyNode
// -----

// PropertyNode()
var PropertyNode = function PropertyNode(line, column, key, value) {
  BaseNode.call(this, line, column, 'PROPERTY');

  this.key = key;
  this.value = value;
}; //- PropertyNode()

PropertyNode.prototype = Object.create(BaseNode.prototype);

// compile()
PropertyNode.prototype.compile = function compile(data) {
  var varName = _getVarName();

  var output = this._sn(data.fileName, "");
  return output
    .add('var ' + varName + ' = (function ' + varName + '() {')
    .add(this.value.compile(data))
    .add('})();')
    .add('$final["' + this.key + '"] = ' + varName + ';');
}; //- compile()

// -----
//  ValueNode
// -----

// ValueNode()
var ValueNode = function ValueNode(line, column, value) {
  BaseNode.call(this, line, column, 'VALUE');

  this.value = value;
}; //- ValueNode()

ValueNode.prototype = Object.create(BaseNode.prototype);

// compile()
ValueNode.prototype.compile = function compile(data) {
  var value = this.value;

  var newValue = '' + value;
  if ( typeof(value) === 'string' ) {
    newValue = '"' + value + '"';
  }

  if ( typeof(value.compile) === 'function' ) {
    newValue = value.compile(data);
  }

  var output = this._sn(data.fileName, '');

  var actions = [];
  if ( Array.isArray(value.actions) ) {
    var varName = _getVarName();
    data.parentVar = varName;

    actions = value.actions.map(function(action) {
      return action.compile(data);
    }); 

    return output
      .add('var ' + varName + ' = ')
      .add(newValue)
      .add(';')
      .add(actions)
      .add('return ' + varName);
  }
  else {
    return output
      .add('return ')
      .add(newValue)
      .add(';');
  }
}; //- compile()

// -----
//  AccessorNode
// -----

// AccessorNode()
var AccessorNode = function AccessorNode(line, column, base, properties) {
  BaseNode.call(this, line, column, 'ACCESSOR');

  this.baseProperty = base;
  this.properties = properties || [];
}; //- AccessorNode()

AccessorNode.prototype = Object.create(BaseNode.prototype);

// addProperty()
AccessorNode.prototype.addProperty = function addProperty(property) {
  this.properties = this.properties.concat(property);
}; //- addProperty()

// compile()
AccessorNode.prototype.compile = function compile(data) {
  var props = [ this.baseProperty ].concat(this.properties);

  return this._sn(data.fileName, '$runtime.lookupProperty($input, $, ' + JSON.stringify(props) + ')');
}; //- compile()

// -----
//  ActionNode
// -----

// ActionNode()
var ActionNode = function ActionNode(line, column, action, args) {
  if ( INVALID_ACTIONS.indexOf(action) > -1 ) {
    throw new Error('You cannot call "addAction" from within your kale template!', line);
  }

  BaseNode.call(this, line, column, 'ACTION');

  this.action = action;
  this.arguments = args || [];
}; //- ActionNode()

ActionNode.prototype = Object.create(BaseNode.prototype);

// compile()
ActionNode.prototype.compile = function compile(data) {
  var varName = data.parentVar;
  var argsName = varName + '_' + _getVarName();

  var output = this._sn(data.fileName, '')
        .add('var ' + argsName + ' = [ ' + varName + '];');

  if ( Array.isArray(this.arguments) && this.arguments.length > 0 ) {
    this.arguments.forEach(function(arg) {
      output
        .add(argsName + '.push(function() {')
        .add(arg.compile(data, true))
        .add('}());');
    });
  }

  return output.add(varName + ' = $$imports["' + this.action + '"].apply(null, ' + argsName + ');');
}; //- compile()

// -----
//  OperatorNode
// -----

// OperatorNode()
var OperatorNode = function OperatorNode(line, column, left, right, op) {
  BaseNode.call(this, line, column, 'OPERATOR');

  this.left = left;
  this.right = right;
  this.op = op;
}; //- OperatorNode()

OperatorNode.prototype = Object.create(BaseNode.prototype);

// compile()
OperatorNode.prototype.compile = function compile(data) {
  var leftVar = _getVarName();
  var rightVar = _getVarName();

  var output = this._sn(data.fileName, '');
  return output
    .add('var ' + leftVar + ' = function() {')
    .add(this.left.compile(data))
    .add('}();')
    .add('var ' + rightVar + ' = function() {')
    .add(this.right.compile(data))
    .add('}();')
    .add('return ' + leftVar + this.op + rightVar + ';');
}; //- compile()

// Exports
module.exports = {
  BaseNode: BaseNode,
  TemplateNode: TemplateNode,
  ImportNode: ImportNode,
  BlockNode: BlockNode,
  PropertyNode: PropertyNode,
  ValueNode: ValueNode,
  AccessorNode: AccessorNode,
  ActionNode: ActionNode,
  OperatorNode: OperatorNode
};
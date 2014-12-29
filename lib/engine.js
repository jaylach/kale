// -----
//  Constructor
// -----

// Engine()
var Engine = function Engine() {
  this._actions = {};
}; //- Engine()

// -----
//  Private
// -----

// _addTemplate()
Engine.prototype._addTemplate = function _addTemplate(name, functionString) {
  var func = new Function('return ' + functionString);
  this[name] = func.call(this);
}; //- _addTemplate()

// -----
//  Public
// -----

// addAction()
Engine.prototype.addAction = function _addAction(actionName, actionFunc) {
  this._actions[actionName] = actionFunc;
}; //- addAction()

// callAction()
Engine.prototype.callAction = function callAction(action, param, args) {
  var newArgs = [ param ];
  newArgs = newArgs.concat(args);
  
  // Call our action
  if ( action.indexOf('@') === 0 ) {
    var actionName = action.substring(1);
    return this[actionName].apply(this, newArgs);
  }

  if ( typeof(this._actions[action]) === 'function' ) {
    return this._actions[action].apply(this, newArgs);
  }

  return param;
}; //- callAction()

// lookupProperty()
Engine.prototype.lookupProperty = function lookupProperty(root, locals, values) {
  if ( values.length === 1 && values[0] === '_' ) {
    return root;
  }

  var value = null;
  var failed = false;
  var lastValue = root;

  if ( values.length > 0 && values[0] === "$" ) {
    lastValue = locals;
    values.shift();
  }

  values.forEach(function(prop) {
    if ( lastValue[prop] == null ) {
      failed = true;
      return;
    }

    lastValue = lastValue[prop];
  });

  if ( failed === false ) {
    value = lastValue;
  }

  return value;
}; //- lookupProperty()

//= #{templates}

// Exports
module.exports = Engine;
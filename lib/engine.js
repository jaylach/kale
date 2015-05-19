// -----
//  Helper Functions
// -----

// _hasArgs()
var _hasArgs = function _hasArgs(args) {
  return args != null && Object.keys(args).length > 0
}; //- _hasArgs()

// _compareAsc()
var _compareAsc = function _compareAsc(a, b) {
  if ( a < b ) {
    return -1;
  }
  else if ( a > b ) {
    return 1;
  }

  return 0;
}; //- _compareAsc()

// _compareDesc()
var _compareDesc = function _compareDesc(a, b) {
  if ( a < b ) {
    return 1;
  }
  else if ( a > b ) {
    return -1;
  }

  return 0;
}; //- _compareDesc()

// -----
//  Constructor
// -----

// Engine()
var Engine = function Engine() {
  this._actions = {};
  //= #{actions}
}; //- Engine()

// -----
//  Private
// -----

// _addTemplate()
Engine.prototype._addTemplate = function _addTemplate(name, functionString) {
  var func = new Function('return ' + functionString);
  this[name] = func.call(this);
}; //- _addTemplate()

// _callAction()
Engine.prototype._callAction = function _callAction(action, param, args) {
  var newArgs = [ param ];
  newArgs = newArgs.concat(args);
  
  // Call our action
  if ( action.indexOf('@') === 0 ) {
    var actionName = action.substring(1);
    return this[actionName].apply(this, newArgs);
  }

  var actionName = action;
  var doFilter = false;
  if ( actionName.indexOf('!') === 0 ) {
    actionName = actionName.substring(1);
    doFilter = true;
  }

  if ( typeof(this._actions[actionName]) === 'function' ) {
    if ( doFilter === true ) {
      var keeper = this._actions[actionName].apply(this, newArgs);
      if ( keeper !== false ) {
        return param;
      }
      else {
        return {
          $_keep: false,
          $_value: param
        };
      }
    }
    else {
      return this._actions[actionName].apply(this, newArgs);
    }
  }

  return param;
}; //- _callAction()

// _lookupProperty()
Engine.prototype._lookupProperty = function _lookupProperty(root, locals, values) {
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
}; //- _lookupProperty()

// -----
//  Public
// -----

// addAction()
Engine.prototype.addAction = function _addAction(actionName, actionFunc) {
  this._actions[actionName] = actionFunc;
}; //- addAction()

//= #{templates}

// Exports
module.exports = Engine;
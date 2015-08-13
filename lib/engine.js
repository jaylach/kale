"use strict";

var path = require('path');
var actions = require('./actions');

// callAction()
var callAction = function callAction(action, param, args) {
  var newArgs = [ param ];
  newArgs = newArgs.concat(args);
  
  // Call our action
  if ( action.indexOf('@') === 0 ) {
    var actionName = action.substring(1);
    try {
      var dirName = path.dirname(module.parent.filename);
      var required = require(path.join(dirName, actionName));

      return required.apply(this, newArgs);
    }
    catch (e) {
      return {
        error: 'Template "' + actionName + '" not found!'
      };
    }
  }

  var actionName = action;
  if ( actions.hasAction(actionName) ) {
    return actions[actionName].apply(this, newArgs);
  }

  return param;
}; //- callAction()

// lookupProperty()
var lookupProperty = function lookupProperty(root, locals, values) {
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

// Exports
module.exports = {
  callAction: callAction,
  lookupProperty: lookupProperty
};
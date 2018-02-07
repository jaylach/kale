"use strict";

var actions = require('./actions');

// doImport()
var doImport = function doImport(imports, variable, from, value) {
  if ( typeof(value) === 'object' ) {
    if ( variable === '*' ) {
      Object.keys(value).forEach(function(key) {
        imports[key] = value[key];
      });
    }
    else {
      imports[variable] = value[variable];
    }
  }
  else if ( typeof(value) === 'function' ) {
    if ( variable === '*' ) {
      imports[from] = value;
    }
    else {
      imports[variable] = value;
    }
  }
}; //- doImport()

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
  lookupProperty: lookupProperty,
  doImport: doImport
};
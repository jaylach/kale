var _ = require('lodash');

// -----
//  Constructor
// -----

// JsonFormatter()
var JsonFormatter = function JsonFormatter() {
  this._stack = [];

  this._output = {};
  this._current = this._output;
}; //- JsonFormatter()

// -----
//  Public
// -----

// openObjectBlock()
JsonFormatter.prototype.openObjectBlock = function openObjectBlock(key) {
  this._stack.push(this._current);

  if ( key != null ) {
    if ( _.isArray(this._current) ) {
      var temp = {};
      temp[key] = {};
      
      this._current.push(temp);
      this._current = temp[key];
    }
    else {
      this._current = this._current[key] = {};
    }
  }
  else {
    if ( _.isArray(this._current) ) {
      this._current.push({});
      this._current = this._current[this._current.length - 1];
    }
  }
}; //- openObjectBlock()

// closeObjectBlock()
JsonFormatter.prototype.closeObjectBlock = function closeObjectBlock() {
  this._current = this._stack.pop();
}; //- closeObjectBlock()

// openArrayBlock()
JsonFormatter.prototype.openArrayBlock = function openArrayBlock(key) {
  this._stack.push(this._current);

  if ( key != null ) {
    this._current = this._current[key] = [];
  }
  else {
    this._current = [];
  }
}; //- openArrayBlock()

// closeArrayBlock()
JsonFormatter.prototype.closeArrayBlock = function closeArrayBlock() {
  this._current = this._stack.pop();
}; //- closeArrayBlock()

// addProperty()
JsonFormatter.prototype.addProperty = function addProperty(key, value) {
  if ( value != null ) {
    if ( _.isArray(this._current) ) {
      this._current.push(value);
    }
    else {
      this._current[key] = value;
    }
  }
}; //- addProperty()

// getResult()
JsonFormatter.prototype.getResult = function getResult() {
  return this._output;
}; //- getResult()

// Exports
module.exports = JsonFormatter;
var _ = require('lodash');

// -----
//  Constructor
// -----

// JsonFormatter()
var JsonFormatter = function JsonFormatter() {
  this.__stack = [];

  this.__output = {};
  this.__current = this.__output;
}; //- JsonFormatter()

// -----
//  Public
// -----

// openObjectBlock()
JsonFormatter.prototype.openObjectBlock = function openObjectBlock(key) {
  this.__stack.push(this.__current);

  if ( key != null ) {
    if ( _.isArray(this.__current) ) {
      var temp = {};
      temp[key] = {};
      
      this.__current.push(temp);
      this.__current = temp[key];
    }
    else {
      this.__current = this.__current[key] = {};
    }
  }
  else {
    if ( _.isArray(this.__current) ) {
      this.__current.push({});
      this.__current = this.__current[this.__current.length - 1];
    }
  }
}; //- openObjectBlock()

// closeObjectBlock()
JsonFormatter.prototype.closeObjectBlock = function closeObjectBlock() {
  this.__current = this.__stack.pop();
}; //- closeObjectBlock()

// openArrayBlock()
JsonFormatter.prototype.openArrayBlock = function openArrayBlock(key) {
  this.__stack.push(this.__current);

  if ( key != null ) {
    this.__current = this.__current[key] = [];
  }
  else {
    this.__current = [];
  }
}; //- openArrayBlock()

// closeArrayBlock()
JsonFormatter.prototype.closeArrayBlock = function closeArrayBlock() {
  this.__current = this.__stack.pop();
}; //- closeArrayBlock()

// addProperty()
JsonFormatter.prototype.addProperty = function addProperty(key, value) {
  if ( value != null ) {
    if ( _.isArray(this.__current) ) {
      this.__current.push(value);
    }
    else {
      this.__current[key] = value;
    }
  }
}; //- addProperty()

// getResult()
JsonFormatter.prototype.getResult = function getResult() {
  return this.__output;
}; //- getResult()

// Exports
module.exports = JsonFormatter;
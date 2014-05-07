var _ = require('lodash');

// -----
//  Constructor
// -----

// JsonFormatter()
var JsonFormatter = function JsonFormatter() {
  this.__output = {};
  this.__current = this.__output;
}; //- JsonFormatter()

// -----
//  Public
// -----

// openObjectBlock()
JsonFormatter.prototype.openObjectBlock = function openObjectBlock(key) {
  this.__previous = this.__current;

  if ( key != null ) {
    this.__current = this.__current[key] = {};
  }
  else {
    this.__current = this.__previous;
  }
}; //- openObjectBlock()

// closeObjectBlock()
JsonFormatter.prototype.closeObjectBlock = function closeObjectBlock() {
  this.__current = this.__previous;
}; //- closeObjectBlock()

// openArrayBlock()
JsonFormatter.prototype.openArrayBlock = function openArrayBlock(key) {
  this.__previous = this.__current;
  if ( key != null ) {
    this.__current = this.__current[key] = [];
  }
  else {
    this.__current = [];
  }
}; //- openArrayBlock()

// closeArrayBlock()
JsonFormatter.prototype.closeArrayBlock = function closeArrayBlock() {
  this.__current = this.__previous;
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


/*

function anonymous($$formatter) {
  var $$global = this;
  $$formatter.openObjectBlock("user");
  (function() {
    if(this["first_name"]!==null){
      var $$1 = (function() {
        return this["first_name"]+" "+this["last_name"];
      }).call(this);
      $$formatter.addProperty("full_name", $$1);
    }
    if(!(this["foo"]!==null)&&true){
      $$formatter.addProperty("foo", this["foo"]);
    }
  }).call($$global["user_profile"]);
  $$formatter.closeObjectBlock();
}

*/
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

// addObjectBlock()
JsonFormatter.prototype.addObjectBlock = function addObjectBlock(key, body) {
  this.__current[key] = {};
  this.__previous = this.__current;
  this.__current = this.__current[key];

  body();

  this.__current = this.__previous;
}; //- addObjectBlock()

// addProperty()
JsonFormatter.prototype.addProperty = function addProperty(key, value) {
  if ( value != null ) {
    this.__current[key] = value;
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
  $$formatter.addObjectBlock("user", (function() {
    if(this["first_name"]!=null){
      var $$1 = (function() {
        return this["first_name"]+" "+this["last_name"];
      }).call(this);
      $$formatter.addProperty("full_name", $$1);
    }
    if(!(this["foo"]!=null)&&true){
      $$formatter.addProperty("foo", this["foo"]);
    }
  }).bind($$global["user_profile"]));
}

*/
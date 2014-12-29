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
//  Array Actions
// -----

// first()
var first = function first(value) {
  if ( Array.isArray(value) && value.length >= 1 ) {
    return value[0];
  } 

  return value;
}; //- first()

// sortBy()
var sortBy = function sortBy(value, args) {
  if ( Array.isArray(value) ) {
    var clone = value.slice(0);

    if ( _hasArgs(args) ) {
      clone.sort(function(a, b) {
        var aValue = a[args.prop];
        var bValue = b[args.prop];

        if ( args.order === 'DESC' ) {
          return _compareDesc(aValue, bValue);
        }
        else {
          return _compareAsc(aValue, bValue);
        }
      });

      return clone;
    }
    else {
      return clone.sort();
    }
  }

  return value;
}; //- sortBy()

// filter()
var filter = function filter(value, args) {
  if ( Array.isArray(value) && _hasArgs(args) ) {
    var keys = Object.keys(args);

    return value.filter(function(item) {
      var okay = true;

      keys.forEach(function(key) {
        var filterValue = args[key];
        if ( item[key] !== filterValue ) {
          okay = false;
          return;
        }
      });

      return okay;
    });
  }

  return value;
}; //- filter()

// reverse()
var reverse = function reverse(value) {
  if ( Array.isArray(value) ) {
    return value.reverse();
  }
  else if ( typeof(value) === 'string' ) {
    return value.split('').reverse().join('');
  }
}; //- reverse()

// -----
//  Object Functions
// -----

// pluck()
var pluck = function pluck(value, prop) {
  if ( typeof(value) === 'object' ) {
    return value[prop];
  }

  return value;
}; //- pluck()

// -----
//  String Actions
// -----

// toUpper()
var toUpper = function toUpper(value) {
  if ( typeof(value) === 'string' ) {
    return value.toUpperCase();
  }

  return value;
}; //- toUpper()

// toLower()
var toLower = function toLower(value) {
  if ( typeof(value) === 'string' ) {
    return value.toLowerCase();
  }

  return value;
}; //- toLower()

// capitalize()
var capitalize = function capitalize(value) {
  if ( typeof(value) === 'string' ) {
    return value.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return value;
}; //- capitalize()

// Exports
module.exports = {
  first: first,
  sortBy: sortBy,
  filter: filter,
  reverse: reverse,
  pluck: pluck,
  toUpper: toUpper,
  toLower: toLower,
  capitalize: capitalize
};
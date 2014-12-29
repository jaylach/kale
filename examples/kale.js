window.kale = (function() {
  var _actions = (function() {
    // -----
    //  Helper Functions
    // -----

    // _hasArgs()
    var _hasArgs = function _hasArgs(args) {
      return args != null && Object.keys(args).length > 0
    }; //- _hasArgs()

    // _compareAsc()
    var _compareAsc = function _compareAsc(a, b) {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      }

      return 0;
    }; //- _compareAsc()

    // _compareDesc()
    var _compareDesc = function _compareDesc(a, b) {
      if (a < b) {
        return 1;
      } else if (a > b) {
        return -1;
      }

      return 0;
    }; //- _compareDesc()

    // -----
    //  Array Actions
    // -----

    // first()
    var first = function first(value) {
      if (Array.isArray(value) && value.length >= 1) {
        return value[0];
      }

      return value;
    }; //- first()

    // sortBy()
    var sortBy = function sortBy(value, args) {
      if (Array.isArray(value)) {
        var clone = value.slice(0);

        if (_hasArgs(args)) {
          clone.sort(function(a, b) {
            var aValue = a[args.prop];
            var bValue = b[args.prop];

            if (args.order === 'DESC') {
              return _compareDesc(aValue, bValue);
            } else {
              return _compareAsc(aValue, bValue);
            }
          });

          return clone;
        } else {
          return clone.sort();
        }
      }

      return value;
    }; //- sortBy()

    // filter()
    var filter = function filter(value, args) {
      if (Array.isArray(value) && _hasArgs(args)) {
        var keys = Object.keys(args);

        return value.filter(function(item) {
          var okay = true;

          keys.forEach(function(key) {
            var filterValue = args[key];
            if (item[key] !== filterValue) {
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
      if (Array.isArray(value)) {
        return value.reverse();
      } else if (typeof(value) === 'string') {
        return value.split('').reverse().join('');
      }
    }; //- reverse()

    // -----
    //  Object Functions
    // -----

    // pluck()
    var pluck = function pluck(value, prop) {
      if (typeof(value) === 'object') {
        return value[prop];
      }

      return value;
    }; //- pluck()

    // -----
    //  String Actions
    // -----

    // toUpper()
    var toUpper = function toUpper(value) {
      if (typeof(value) === 'string') {
        return value.toUpperCase();
      }

      return value;
    }; //- toUpper()

    // toLower()
    var toLower = function toLower(value) {
      if (typeof(value) === 'string') {
        return value.toLowerCase();
      }

      return value;
    }; //- toLower()

    // capitalize()
    var capitalize = function capitalize(value) {
      if (typeof(value) === 'string') {
        return value.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      }

      return value;
    }; //- capitalize()

    // Exports
    return {
      first: first,
      sortBy: sortBy,
      filter: filter,
      reverse: reverse,
      pluck: pluck,
      toUpper: toUpper,
      toLower: toLower,
      capitalize: capitalize
    };
  })();

  var _engine = (function() {
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
      var newArgs = [param];
      newArgs = newArgs.concat(args);

      // Call our action
      if (action.indexOf('@') === 0) {
        var actionName = action.substring(1);
        return this[actionName].apply(this, newArgs);
      }

      if (typeof(this._actions[action]) === 'function') {
        return this._actions[action].apply(this, newArgs);
      }

      return param;
    }; //- callAction()

    // lookupProperty()
    Engine.prototype.lookupProperty = function lookupProperty(root, locals, values) {
      if (values.length === 1 && values[0] === '_') {
        return root;
      }

      var value = null;
      var failed = false;
      var lastValue = root;

      if (values.length > 0 && values[0] === "$") {
        lastValue = locals;
        values.shift();
      }

      values.forEach(function(prop) {
        if (lastValue[prop] == null) {
          failed = true;
          return;
        }

        lastValue = lastValue[prop];
      });

      if (failed === false) {
        value = lastValue;
      }

      return value;
    }; //- lookupProperty()

    Engine.prototype["user"] = function user(input, locals) {
      var $tplFunction = (function user($input, $) {
        var $final = {};
        var $var_0 = this.lookupProperty($input, $, ["userId"]);
        $final['id'] = $var_0;
        var $var_1 = this.lookupProperty($input, $, ["userName"]);
        $final['userName'] = $var_1;
        var $var_2 = this.lookupProperty($input, $, ["firstName"]);
        $final['firstName'] = $var_2;
        var $var_3 = this.lookupProperty($input, $, ["phones"]);
        $var_3 = this.callAction('filter', $var_3, [{
          "type": "home"
        }]);
        $var_3 = this.callAction('first', $var_3, $input);
        $var_3 = this.callAction('pluck', $var_3, ["number"]);
        $final['homePhone'] = $var_3;
        var $var_4 = this.lookupProperty($input, $, ["phones"]);
        $var_4 = this.callAction('filter', $var_4, [{
          "type": "mobile"
        }]);
        $var_4 = this.callAction('first', $var_4, $input);
        $var_4 = this.callAction('pluck', $var_4, ["number"]);
        $final['mobilePhone'] = $var_4;
        var $var_5 = this.lookupProperty($input, $, ["_"]);
        $var_5 = this.callAction('@address', $var_5, $input);
        $final['address'] = $var_5;
        return $final;
      }).bind(this);
      var result = {};
      if (Array.isArray(input)) {
        result = [];
        input.forEach(function(item) {
          result.push($tplFunction(item, locals));
        });
      } else {
        result = $tplFunction(input, locals);
      }
      return result;
    };
    Engine.prototype["address"] = function address(input, locals) {
      var $tplFunction = (function address($input, $) {
        var $final = {};
        var $var_0 = this.lookupProperty($input, $, ["street1"]) + "\n" + this.lookupProperty($input, $, ["city"]) + ", " + this.lookupProperty($input, $, ["state"]) + " " + this.lookupProperty($input, $, ["zipCode"]);
        $final['short'] = $var_0;
        var $var_1 = this.lookupProperty($input, $, ["street1"]);
        $final['street'] = $var_1;
        var $var_2 = this.lookupProperty($input, $, ["city"]);
        $final['city'] = $var_2;
        var $var_3 = this.lookupProperty($input, $, ["state"]);
        $final['state'] = $var_3;
        var $var_4 = this.lookupProperty($input, $, ["zipCode"]);
        $final['zip'] = $var_4;
        var $var_5 = this.lookupProperty($input, $, ["$", "userName"]);
        $final['test'] = $var_5;
        return $final;
      }).bind(this);
      var result = {};
      if (Array.isArray(input)) {
        result = [];
        input.forEach(function(item) {
          result.push($tplFunction(item, locals));
        });
      } else {
        result = $tplFunction(input, locals);
      }
      return result;
    };
    Engine.prototype["example2"] = function example2(input, locals) {
      var $tplFunction = (function example2($input, $) {
        var $final = {};
        return $final;
      }).bind(this);
      var result = {};
      if (Array.isArray(input)) {
        result = [];
        input.forEach(function(item) {
          result.push($tplFunction(item, locals));
        });
      } else {
        result = $tplFunction(input, locals);
      }
      return result;
    };


    // Exports
    return Engine;
  })();

  var engine = new _engine();

  for (var key in _actions) {
    var value = _actions[key];
    engine.addAction(key, value);
  }

  return engine;
})();
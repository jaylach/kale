var $engine = require("kale/engine");
module.exports = function address($input, locals) {
  var $0 = (function $0($input, $) {
    var $final = {};
    var $1 = (function $1() {
      var $2 = (function() {
        var $4 = (function() {
          var $6 = (function() {
            var $8 = (function() {
              var $10 = (function() {
                var $12 = (function() {
                  return $engine.lookupProperty($input, $, ["street1"]);
                }).call(this);
                var $13 = (function() {
                  return "\n";
                }).call(this);
                return $12 + $13;
              }).call(this);
              var $11 = (function() {
                return $engine.lookupProperty($input, $, ["city"]);
              }).call(this);
              return $10 + $11;
            }).call(this);
            var $9 = (function() {
              return ", ";
            }).call(this);
            return $8 + $9;
          }).call(this);
          var $7 = (function() {
            return $engine.lookupProperty($input, $, ["state"]);
          }).call(this);
          return $6 + $7;
        }).call(this);
        var $5 = (function() {
          return " ";
        }).call(this);
        return $4 + $5;
      }).call(this);
      var $3 = (function() {
        return $engine.lookupProperty($input, $, ["zipCode"]);
      }).call(this);
      return $2 + $3;
    }).call(this);
    $final["short"] = $1;
    var $14 = (function $14() {
      return $engine.lookupProperty($input, $, ["street1"]);
    }).call(this);
    $final["street"] = $14;
    var $15 = (function $15() {
      return $engine.lookupProperty($input, $, ["city"]);
    }).call(this);
    $final["city"] = $15;
    var $16 = (function $16() {
      return $engine.lookupProperty($input, $, ["state"]);
    }).call(this);
    $final["state"] = $16;
    var $17 = (function $17() {
      return $engine.lookupProperty($input, $, ["zipCode"]);
    }).call(this);
    $final["zip"] = $17;
    return $final;
  }).bind(this);
  var $result = {};
  if (Array.isArray($input) && true) {
    $result = [];
    $input.forEach(function($item) {
      var $x = $0($item, locals);
      if ($x != null) $result.push($x);
    });
  } else {
    $result = $0($input, locals);
  }
  return $result;
};
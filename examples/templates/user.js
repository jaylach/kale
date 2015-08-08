var $engine = require("../../lib/engine");
module.exports = function user($input, locals) {
  var $0 = (function $0($input, $) {
    var $final = {};
    var $1 = (function $1() {
      return $engine.lookupProperty($input, $, ["userId"]);
    }).call(this);
    $final["id"] = $1;
    var $2 = (function $2() {
      return $engine.lookupProperty($input, $, ["userName"]);
    }).call(this);
    $final["userName"] = $2;
    var $3 = (function $3() {
      var $4 = (function() {
        return $engine.lookupProperty($input, $, ["firstName"]);
      }).call(this);
      var $5 = (function() {
        return $engine.lookupProperty($input, $, ["lastName"]);
      }).call(this);
      return $4 + $5;
    }).call(this);
    $final["fullName"] = $3;
    var $6 = (function $6() {
      var $7 = $engine.lookupProperty($input, $, ["phones"]);
      var $7_args = [];
      $7_args.push((function() {
        var $8 = (function $8($input, $) {
          var $final = {};
          var $9 = (function $9() {
            return "home";
          }).call(this);
          $final["type"] = $9;
          return $final;
        }).bind(this);
        var $result = {};
        if (Array.isArray($input) && false) {
          $result = [];
          $input.forEach(function($item) {
            var $x = $8($item, locals);
            if ($x != null) $result.push($x);
          });
        } else {
          $result = $8($input, locals);
        }
        return $result;
      }).call(this));
      $7 = $engine.callAction("filter", $7, $7_args);
      var $7_args = $input;
      $7 = $engine.callAction("first", $7, $7_args);
      var $7_args = [];
      $7_args.push((function() {
        return "number";
      }).call(this));
      $7 = $engine.callAction("pluck", $7, $7_args);
      return $7
    }).call(this);
    $final["homePhone"] = $6;
    var $10 = (function $10() {
      var $11 = $engine.lookupProperty($input, $, ["phones"]);
      var $11_args = [];
      $11_args.push((function() {
        var $12 = (function $12($input, $) {
          var $final = {};
          var $13 = (function $13() {
            return "mobile";
          }).call(this);
          $final["type"] = $13;
          return $final;
        }).bind(this);
        var $result = {};
        if (Array.isArray($input) && false) {
          $result = [];
          $input.forEach(function($item) {
            var $x = $12($item, locals);
            if ($x != null) $result.push($x);
          });
        } else {
          $result = $12($input, locals);
        }
        return $result;
      }).call(this));
      $11 = $engine.callAction("filter", $11, $11_args);
      var $11_args = $input;
      $11 = $engine.callAction("first", $11, $11_args);
      var $11_args = [];
      $11_args.push((function() {
        return "number";
      }).call(this));
      $11 = $engine.callAction("pluck", $11, $11_args);
      return $11
    }).call(this);
    $final["mobilePhone"] = $10;
    var $14 = (function $14() {
      var $15 = (function $15($input, $) {
        var $final = {};
        var $16 = (function $16() {
          var $17 = (function() {
            var $19 = (function() {
              var $21 = (function() {
                var $23 = (function() {
                  var $25 = (function() {
                    var $27 = (function() {
                      return $engine.lookupProperty($input, $, ["street1"]);
                    }).call(this);
                    var $28 = (function() {
                      return "\n";
                    }).call(this);
                    return $27 + $28;
                  }).call(this);
                  var $26 = (function() {
                    return $engine.lookupProperty($input, $, ["city"]);
                  }).call(this);
                  return $25 + $26;
                }).call(this);
                var $24 = (function() {
                  return ", ";
                }).call(this);
                return $23 + $24;
              }).call(this);
              var $22 = (function() {
                return $engine.lookupProperty($input, $, ["state"]);
              }).call(this);
              return $21 + $22;
            }).call(this);
            var $20 = (function() {
              return " ";
            }).call(this);
            return $19 + $20;
          }).call(this);
          var $18 = (function() {
            return $engine.lookupProperty($input, $, ["zipCode"]);
          }).call(this);
          return $17 + $18;
        }).call(this);
        $final["short"] = $16;
        var $29 = (function $29() {
          return $engine.lookupProperty($input, $, ["street1"]);
        }).call(this);
        $final["street"] = $29;
        var $30 = (function $30() {
          return $engine.lookupProperty($input, $, ["city"]);
        }).call(this);
        $final["city"] = $30;
        var $31 = (function $31() {
          return $engine.lookupProperty($input, $, ["state"]);
        }).call(this);
        $final["state"] = $31;
        var $32 = (function $32() {
          return $engine.lookupProperty($input, $, ["zipCode"]);
        }).call(this);
        $final["zip"] = $32;
        return $final;
      }).bind(this);
      var $result = {};
      if (Array.isArray($input) && true) {
        $result = [];
        $input.forEach(function($item) {
          var $x = $15($item, locals);
          if ($x != null) $result.push($x);
        });
      } else {
        $result = $15($input, locals);
      }
      return $result;
    }).call(this);
    $final["address"] = $14;
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
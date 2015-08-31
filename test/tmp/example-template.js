var user = function user($input, locals) {
  var $0 = (function $0($input, $) {
    var $final = {};
    var $1 = (function $1() {
      return $engine.lookupProperty($input, $, ["userId"]);
    })();
    $final["id"] = $1;
    var $2 = (function $2() {
      return $engine.lookupProperty($input, $, ["userName"]);
    })();
    $final["userName"] = $2;
    var $3 = (function $3() {
      var $4 = function() {
        return $engine.lookupProperty($input, $, ["firstName"]);
      }();
      var $5 = function() {
        return $engine.lookupProperty($input, $, ["lastName"]);
      }();
      return $4 + $5;
    })();
    $final["fullName"] = $3;
    var $6 = (function $6() {
      var $7 = $engine.lookupProperty($input, $, ["phones"]);
      var $7_args = [];
      $7_args.push(function() {
        var $8 = (function $8($input, $) {
          var $final = {};
          var $9 = (function $9() {
            return "home";
          })();
          $final["type"] = $9;
          return $final;
        });
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
      }());
      $7 = $engine.callAction("filter", $7, $7_args);
      var $7_args = $input;
      $7 = $engine.callAction("first", $7, $7_args);
      var $7_args = [];
      $7_args.push(function() {
        return "number";
      }());
      $7 = $engine.callAction("pluck", $7, $7_args);
      return $7
    })();
    $final["homePhone"] = $6;
    var $10 = (function $10() {
      var $11 = $engine.lookupProperty($input, $, ["phones"]);
      var $11_args = [];
      $11_args.push(function() {
        var $12 = (function $12($input, $) {
          var $final = {};
          var $13 = (function $13() {
            return "mobile";
          })();
          $final["type"] = $13;
          return $final;
        });
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
      }());
      $11 = $engine.callAction("filter", $11, $11_args);
      var $11_args = $input;
      $11 = $engine.callAction("first", $11, $11_args);
      var $11_args = [];
      $11_args.push(function() {
        return "number";
      }());
      $11 = $engine.callAction("pluck", $11, $11_args);
      return $11
    })();
    $final["mobilePhone"] = $10;
    var $14 = (function $14() {
      var $15 = $engine.lookupProperty($input, $, ["_"]);
      var $15_args = $input;
      $15 = $engine.callAction("@address", $15, $15_args);
      return $15
    })();
    $final["address"] = $14;
    return $final;
  });
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
module.exports.user = user;
var address = function address($input, locals) {
  var $0 = (function $0($input, $) {
    var $final = {};
    var $1 = (function $1() {
      var $2 = function() {
        var $4 = function() {
          var $6 = function() {
            var $8 = function() {
              var $10 = function() {
                var $12 = function() {
                  return $engine.lookupProperty($input, $, ["street1"]);
                }();
                var $13 = function() {
                  return "\n";
                }();
                return $12 + $13;
              }();
              var $11 = function() {
                return $engine.lookupProperty($input, $, ["city"]);
              }();
              return $10 + $11;
            }();
            var $9 = function() {
              return ", ";
            }();
            return $8 + $9;
          }();
          var $7 = function() {
            return $engine.lookupProperty($input, $, ["state"]);
          }();
          return $6 + $7;
        }();
        var $5 = function() {
          return " ";
        }();
        return $4 + $5;
      }();
      var $3 = function() {
        return $engine.lookupProperty($input, $, ["zipCode"]);
      }();
      return $2 + $3;
    })();
    $final["short"] = $1;
    var $14 = (function $14() {
      return $engine.lookupProperty($input, $, ["street1"]);
    })();
    $final["street"] = $14;
    var $15 = (function $15() {
      return $engine.lookupProperty($input, $, ["city"]);
    })();
    $final["city"] = $15;
    var $16 = (function $16() {
      return $engine.lookupProperty($input, $, ["state"]);
    })();
    $final["state"] = $16;
    var $17 = (function $17() {
      return $engine.lookupProperty($input, $, ["zipCode"]);
    })();
    $final["zip"] = $17;
    return $final;
  });
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
module.exports.address = address;
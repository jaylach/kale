module.exports = function $template($input, locals) {
  var $runtime = require("/Users/jlachapelle/Development/jlach/kale/lib/runtime");
  var $$imports = {};
  $runtime.doImport($$imports, "*", "actions", require("/Users/jlachapelle/Development/jlach/kale/lib/actions"));
  var $0 = (function $0($input, $) {
    var $final = {};
    var $1 = (function $1() {
      var $2 = function() {
        var $4 = function() {
          var $6 = function() {
            var $8 = function() {
              var $10 = function() {
                var $12 = function() {
                  return $runtime.lookupProperty($input, $, ["street1"]);
                }();
                var $13 = function() {
                  return "\n";
                }();
                return $12 + $13;
              }();
              var $11 = function() {
                return $runtime.lookupProperty($input, $, ["city"]);
              }();
              return $10 + $11;
            }();
            var $9 = function() {
              return ", ";
            }();
            return $8 + $9;
          }();
          var $7 = function() {
            return $runtime.lookupProperty($input, $, ["state"]);
          }();
          return $6 + $7;
        }();
        var $5 = function() {
          return " ";
        }();
        return $4 + $5;
      }();
      var $3 = function() {
        return $runtime.lookupProperty($input, $, ["zipCode"]);
      }();
      return $2 + $3;
    })();
    $final["short"] = $1;
    var $14 = (function $14() {
      return $runtime.lookupProperty($input, $, ["street1"]);
    })();
    $final["street"] = $14;
    var $15 = (function $15() {
      return $runtime.lookupProperty($input, $, ["city"]);
    })();
    $final["city"] = $15;
    var $16 = (function $16() {
      return $runtime.lookupProperty($input, $, ["state"]);
    })();
    $final["state"] = $16;
    var $17 = (function $17() {
      return $runtime.lookupProperty($input, $, ["zipCode"]);
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
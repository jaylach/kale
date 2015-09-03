module.exports = function $template($input, locals) {
  var $runtime = require("/Users/jlachapelle/Development/jlach/kale/lib/runtime");
  var $$imports = {};
  $runtime.doImport($$imports, "*", "actions", require("/Users/jlachapelle/Development/jlach/kale/lib/actions"));
  var $0 = (function $0($input, $) {
    var $final = {};
    var $1 = (function $1() {
      return $runtime.lookupProperty($input, $, ["one"]);
    })();
    $final["one"] = $1;
    var $2 = (function $2() {
      return $runtime.lookupProperty($input, $, ["two"]);
    })();
    $final["two"] = $2;
    var $3 = (function $3() {
      var $4 = (function $4($input, $) {
        var $final = {};
        var $5 = (function $5() {
          return $runtime.lookupProperty($input, $, ["one"]);
        })();
        $final["four"] = $5;
        var $6 = (function $6() {
          return $runtime.lookupProperty($input, $, ["two"]);
        })();
        $final["five"] = $6;
        return $final;
      });
      var $result = {};
      if (Array.isArray($input) && true) {
        $result = [];
        $input.forEach(function($item) {
          var $x = $4($item, locals);
          if ($x != null) $result.push($x);
        });
      } else {
        $result = $4($input, locals);
      }
      return $result;
    })();
    $final["three"] = $3;
    var $7 = (function $7() {
      return $runtime.lookupProperty($input, $, ["four"]);
    })();
    $final["six"] = $7;
    var $8 = (function $8() {
      var $9 = function() {
        return $runtime.lookupProperty($input, $, ["five"]);
      }();
      var $10 = function() {
        return $runtime.lookupProperty($input, $, ["six"]);
      }();
      return $9 + $10;
    })();
    $final["seven"] = $8;
    var $11 = (function $11() {
      var $12 = function() {
        var $14 = function() {
          var $16 = function() {
            var $18 = function() {
              return $runtime.lookupProperty($input, $, ["seven"]);
            }();
            var $19 = function() {
              return " ";
            }();
            return $18 + $19;
          }();
          var $17 = function() {
            return $runtime.lookupProperty($input, $, ["eight"]);
          }();
          return $16 + $17;
        }();
        var $15 = function() {
          return " ";
        }();
        return $14 + $15;
      }();
      var $13 = function() {
        return $runtime.lookupProperty($input, $, ["nine"]);
      }();
      return $12 + $13;
    })();
    $final["eight"] = $11;
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
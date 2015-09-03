module.exports = function $template($input, locals) {
  var $runtime = require("/Users/jlachapelle/Development/jlach/kale/lib/runtime");
  var $$imports = {};
  $runtime.doImport($$imports, "*", "actions", require("/Users/jlachapelle/Development/jlach/kale/lib/actions"));
  $runtime.doImport($$imports, "address", "address", require("./address"));
  var $0 = (function $0($input, $) {
    var $final = {};
    var $1 = (function $1() {
      return $runtime.lookupProperty($input, $, ["userId"]);
    })();
    $final["id"] = $1;
    var $2 = (function $2() {
      return $runtime.lookupProperty($input, $, ["userName"]);
    })();
    $final["userName"] = $2;
    var $3 = (function $3() {
      var $4 = function() {
        return $runtime.lookupProperty($input, $, ["firstName"]);
      }();
      var $5 = function() {
        return $runtime.lookupProperty($input, $, ["lastName"]);
      }();
      return $4 + $5;
    })();
    $final["fullName"] = $3;
    var $6 = (function $6() {
      var $7 = $runtime.lookupProperty($input, $, ["phones"]);
      var $7_$8 = [$7];
      $7_$8.push(function() {
        var $9 = (function $9($input, $) {
          var $final = {};
          var $10 = (function $10() {
            return "home";
          })();
          $final["type"] = $10;
          return $final;
        });
        var $result = {};
        if (Array.isArray($input) && false) {
          $result = [];
          $input.forEach(function($item) {
            var $x = $9($item, locals);
            if ($x != null) $result.push($x);
          });
        } else {
          $result = $9($input, locals);
        }
        return $result;
      }());
      $7 = $$imports["filter"].apply(null, $7_$8);
      var $7_$11 = [$7];
      $7 = $$imports["first"].apply(null, $7_$11);
      var $7_$12 = [$7];
      $7_$12.push(function() {
        return "number";
      }());
      $7 = $$imports["pluck"].apply(null, $7_$12);
      return $7
    })();
    $final["homePhone"] = $6;
    var $13 = (function $13() {
      var $14 = $runtime.lookupProperty($input, $, ["phones"]);
      var $14_$15 = [$14];
      $14_$15.push(function() {
        var $16 = (function $16($input, $) {
          var $final = {};
          var $17 = (function $17() {
            return "mobile";
          })();
          $final["type"] = $17;
          return $final;
        });
        var $result = {};
        if (Array.isArray($input) && false) {
          $result = [];
          $input.forEach(function($item) {
            var $x = $16($item, locals);
            if ($x != null) $result.push($x);
          });
        } else {
          $result = $16($input, locals);
        }
        return $result;
      }());
      $14 = $$imports["filter"].apply(null, $14_$15);
      var $14_$18 = [$14];
      $14 = $$imports["first"].apply(null, $14_$18);
      var $14_$19 = [$14];
      $14_$19.push(function() {
        return "number";
      }());
      $14 = $$imports["pluck"].apply(null, $14_$19);
      return $14
    })();
    $final["mobilePhone"] = $13;
    var $20 = (function $20() {
      var $21 = $runtime.lookupProperty($input, $, ["_"]);
      var $21_$22 = [$21];
      $21 = $$imports["address"].apply(null, $21_$22);
      return $21
    })();
    $final["address"] = $20;
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
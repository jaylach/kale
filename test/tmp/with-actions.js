var standard_actions = function standard_actions($input, locals) {
  var $0 = (function $0($input, $) {
    var $final = {};
    var $1 = (function $1() {
      var $2 = $engine.lookupProperty($input, $, ["first"]);
      var $2_args = $input;
      $2 = $engine.callAction("first", $2, $2_args);
      return $2
    })();
    $final["first"] = $1;
    var $3 = (function $3() {
      var $4 = $engine.lookupProperty($input, $, ["sortByNumbersAsc"]);
      var $4_args = $input;
      $4 = $engine.callAction("sortBy", $4, $4_args);
      return $4
    })();
    $final["sortByNumbersAsc"] = $3;
    var $5 = (function $5() {
      var $6 = $engine.lookupProperty($input, $, ["sortByNumbersDesc"]);
      var $6_args = [];
      $6_args.push(function() {
        var $7 = (function $7($input, $) {
          var $final = {};
          var $8 = (function $8() {
            return "DESC";
          })();
          $final["order"] = $8;
          return $final;
        });
        var $result = {};
        if (Array.isArray($input) && false) {
          $result = [];
          $input.forEach(function($item) {
            var $x = $7($item, locals);
            if ($x != null) $result.push($x);
          });
        } else {
          $result = $7($input, locals);
        }
        return $result;
      }());
      $6 = $engine.callAction("sortBy", $6, $6_args);
      return $6
    })();
    $final["sortByNumbersDesc"] = $5;
    var $9 = (function $9() {
      var $10 = $engine.lookupProperty($input, $, ["sortByObjectsAsc"]);
      var $10_args = [];
      $10_args.push(function() {
        var $11 = (function $11($input, $) {
          var $final = {};
          var $12 = (function $12() {
            return "sort";
          })();
          $final["prop"] = $12;
          return $final;
        });
        var $result = {};
        if (Array.isArray($input) && false) {
          $result = [];
          $input.forEach(function($item) {
            var $x = $11($item, locals);
            if ($x != null) $result.push($x);
          });
        } else {
          $result = $11($input, locals);
        }
        return $result;
      }());
      $10 = $engine.callAction("sortBy", $10, $10_args);
      return $10
    })();
    $final["sortByObjectsAsc"] = $9;
    var $13 = (function $13() {
      var $14 = $engine.lookupProperty($input, $, ["sortByObjectsDesc"]);
      var $14_args = [];
      $14_args.push(function() {
        var $15 = (function $15($input, $) {
          var $final = {};
          var $16 = (function $16() {
            return "sort";
          })();
          $final["prop"] = $16;
          var $17 = (function $17() {
            return "DESC";
          })();
          $final["order"] = $17;
          return $final;
        });
        var $result = {};
        if (Array.isArray($input) && false) {
          $result = [];
          $input.forEach(function($item) {
            var $x = $15($item, locals);
            if ($x != null) $result.push($x);
          });
        } else {
          $result = $15($input, locals);
        }
        return $result;
      }());
      $14 = $engine.callAction("sortBy", $14, $14_args);
      return $14
    })();
    $final["sortByObjectsDesc"] = $13;
    var $18 = (function $18() {
      var $19 = $engine.lookupProperty($input, $, ["filter"]);
      var $19_args = [];
      $19_args.push(function() {
        var $20 = (function $20($input, $) {
          var $final = {};
          var $21 = (function $21() {
            return "foo";
          })();
          $final["foo"] = $21;
          return $final;
        });
        var $result = {};
        if (Array.isArray($input) && false) {
          $result = [];
          $input.forEach(function($item) {
            var $x = $20($item, locals);
            if ($x != null) $result.push($x);
          });
        } else {
          $result = $20($input, locals);
        }
        return $result;
      }());
      $19 = $engine.callAction("filter", $19, $19_args);
      return $19
    })();
    $final["filter"] = $18;
    var $22 = (function $22() {
      var $23 = $engine.lookupProperty($input, $, ["reverseArray"]);
      var $23_args = $input;
      $23 = $engine.callAction("reverse", $23, $23_args);
      return $23
    })();
    $final["reverseArray"] = $22;
    var $24 = (function $24() {
      var $25 = $engine.lookupProperty($input, $, ["reverseString"]);
      var $25_args = $input;
      $25 = $engine.callAction("reverse", $25, $25_args);
      return $25
    })();
    $final["reverseString"] = $24;
    var $26 = (function $26() {
      var $27 = $engine.lookupProperty($input, $, ["pluck"]);
      var $27_args = [];
      $27_args.push(function() {
        return "baz";
      }());
      $27 = $engine.callAction("pluck", $27, $27_args);
      return $27
    })();
    $final["pluck"] = $26;
    var $28 = (function $28() {
      var $29 = $engine.lookupProperty($input, $, ["toUpper"]);
      var $29_args = $input;
      $29 = $engine.callAction("toUpper", $29, $29_args);
      return $29
    })();
    $final["toUpper"] = $28;
    var $30 = (function $30() {
      var $31 = $engine.lookupProperty($input, $, ["wontUpper"]);
      var $31_args = $input;
      $31 = $engine.callAction("toUpper", $31, $31_args);
      return $31
    })();
    $final["wontUpper"] = $30;
    var $32 = (function $32() {
      var $33 = $engine.lookupProperty($input, $, ["toLower"]);
      var $33_args = $input;
      $33 = $engine.callAction("toLower", $33, $33_args);
      return $33
    })();
    $final["toLower"] = $32;
    var $34 = (function $34() {
      var $35 = $engine.lookupProperty($input, $, ["wontLower"]);
      var $35_args = $input;
      $35 = $engine.callAction("toLower", $35, $35_args);
      return $35
    })();
    $final["wontLower"] = $34;
    var $36 = (function $36() {
      var $37 = $engine.lookupProperty($input, $, ["capitalize"]);
      var $37_args = $input;
      $37 = $engine.callAction("capitalize", $37, $37_args);
      return $37
    })();
    $final["capitalize"] = $36;
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
module.exports.standard_actions = standard_actions;
var custom_actions = function custom_actions($input, locals) {
  var $0 = (function $0($input, $) {
    var $final = {};
    var $1 = (function $1() {
      return $engine.lookupProperty($input, $, ["foo"]);
    })();
    $final["foo"] = $1;
    var $2 = (function $2() {
      var $3 = $engine.lookupProperty($input, $, ["_"]);
      var $3_args = $input;
      $3 = $engine.callAction("kale", $3, $3_args);
      return $3
    })();
    $final["kale"] = $2;
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
module.exports.custom_actions = custom_actions;
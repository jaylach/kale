module.exports = function $template($input, locals) {
  var $runtime = require("/Users/jlachapelle/Development/jlach/kale/lib/runtime");
  var $$imports = {};
  $runtime.doImport($$imports, "*", "actions", require("/Users/jlachapelle/Development/jlach/kale/lib/actions"));
  var $0 = (function $0($input, $) {
    var $final = {};
    var $1 = (function $1() {
      var $2 = $runtime.lookupProperty($input, $, ["first"]);
      var $2_$3 = [$2];
      $2 = $$imports["first"].apply(null, $2_$3);
      return $2
    })();
    $final["first"] = $1;
    var $4 = (function $4() {
      var $5 = $runtime.lookupProperty($input, $, ["sortByNumbersAsc"]);
      var $5_$6 = [$5];
      $5 = $$imports["sortBy"].apply(null, $5_$6);
      return $5
    })();
    $final["sortByNumbersAsc"] = $4;
    var $7 = (function $7() {
      var $8 = $runtime.lookupProperty($input, $, ["sortByNumbersDesc"]);
      var $8_$9 = [$8];
      $8_$9.push(function() {
        var $10 = (function $10($input, $) {
          var $final = {};
          var $11 = (function $11() {
            return "DESC";
          })();
          $final["order"] = $11;
          return $final;
        });
        var $result = {};
        if (Array.isArray($input) && false) {
          $result = [];
          $input.forEach(function($item) {
            var $x = $10($item, locals);
            if ($x != null) $result.push($x);
          });
        } else {
          $result = $10($input, locals);
        }
        return $result;
      }());
      $8 = $$imports["sortBy"].apply(null, $8_$9);
      return $8
    })();
    $final["sortByNumbersDesc"] = $7;
    var $12 = (function $12() {
      var $13 = $runtime.lookupProperty($input, $, ["sortByObjectsAsc"]);
      var $13_$14 = [$13];
      $13_$14.push(function() {
        var $15 = (function $15($input, $) {
          var $final = {};
          var $16 = (function $16() {
            return "sort";
          })();
          $final["prop"] = $16;
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
      $13 = $$imports["sortBy"].apply(null, $13_$14);
      return $13
    })();
    $final["sortByObjectsAsc"] = $12;
    var $17 = (function $17() {
      var $18 = $runtime.lookupProperty($input, $, ["sortByObjectsDesc"]);
      var $18_$19 = [$18];
      $18_$19.push(function() {
        var $20 = (function $20($input, $) {
          var $final = {};
          var $21 = (function $21() {
            return "sort";
          })();
          $final["prop"] = $21;
          var $22 = (function $22() {
            return "DESC";
          })();
          $final["order"] = $22;
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
      $18 = $$imports["sortBy"].apply(null, $18_$19);
      return $18
    })();
    $final["sortByObjectsDesc"] = $17;
    var $23 = (function $23() {
      var $24 = $runtime.lookupProperty($input, $, ["filter"]);
      var $24_$25 = [$24];
      $24_$25.push(function() {
        var $26 = (function $26($input, $) {
          var $final = {};
          var $27 = (function $27() {
            return "foo";
          })();
          $final["foo"] = $27;
          return $final;
        });
        var $result = {};
        if (Array.isArray($input) && false) {
          $result = [];
          $input.forEach(function($item) {
            var $x = $26($item, locals);
            if ($x != null) $result.push($x);
          });
        } else {
          $result = $26($input, locals);
        }
        return $result;
      }());
      $24 = $$imports["filter"].apply(null, $24_$25);
      return $24
    })();
    $final["filter"] = $23;
    var $28 = (function $28() {
      var $29 = $runtime.lookupProperty($input, $, ["reverseArray"]);
      var $29_$30 = [$29];
      $29 = $$imports["reverse"].apply(null, $29_$30);
      return $29
    })();
    $final["reverseArray"] = $28;
    var $31 = (function $31() {
      var $32 = $runtime.lookupProperty($input, $, ["reverseString"]);
      var $32_$33 = [$32];
      $32 = $$imports["reverse"].apply(null, $32_$33);
      return $32
    })();
    $final["reverseString"] = $31;
    var $34 = (function $34() {
      var $35 = $runtime.lookupProperty($input, $, ["pluck"]);
      var $35_$36 = [$35];
      $35_$36.push(function() {
        return "baz";
      }());
      $35 = $$imports["pluck"].apply(null, $35_$36);
      return $35
    })();
    $final["pluck"] = $34;
    var $37 = (function $37() {
      var $38 = $runtime.lookupProperty($input, $, ["toUpper"]);
      var $38_$39 = [$38];
      $38 = $$imports["toUpper"].apply(null, $38_$39);
      return $38
    })();
    $final["toUpper"] = $37;
    var $40 = (function $40() {
      var $41 = $runtime.lookupProperty($input, $, ["wontUpper"]);
      var $41_$42 = [$41];
      $41 = $$imports["toUpper"].apply(null, $41_$42);
      return $41
    })();
    $final["wontUpper"] = $40;
    var $43 = (function $43() {
      var $44 = $runtime.lookupProperty($input, $, ["toLower"]);
      var $44_$45 = [$44];
      $44 = $$imports["toLower"].apply(null, $44_$45);
      return $44
    })();
    $final["toLower"] = $43;
    var $46 = (function $46() {
      var $47 = $runtime.lookupProperty($input, $, ["wontLower"]);
      var $47_$48 = [$47];
      $47 = $$imports["toLower"].apply(null, $47_$48);
      return $47
    })();
    $final["wontLower"] = $46;
    var $49 = (function $49() {
      var $50 = $runtime.lookupProperty($input, $, ["capitalize"]);
      var $50_$51 = [$50];
      $50 = $$imports["capitalize"].apply(null, $50_$51);
      return $50
    })();
    $final["capitalize"] = $49;
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
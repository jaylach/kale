module.exports = function $template($input, locals) {
  var $runtime = require("/Users/jlachapelle/Development/jlach/kale/lib/runtime");
  var $$imports = {};
  $runtime.doImport($$imports, "*", "actions", require("/Users/jlachapelle/Development/jlach/kale/lib/actions"));
  $runtime.doImport($$imports, "*", "custom", require("../custom"));
  var $0 = (function $0($input, $) {
    var $final = {};
    var $1 = (function $1() {
      return $runtime.lookupProperty($input, $, ["foo"]);
    })();
    $final["foo"] = $1;
    var $2 = (function $2() {
      var $3 = $runtime.lookupProperty($input, $, ["_"]);
      var $3_$4 = [$3];
      $3 = $$imports["kale"].apply(null, $3_$4);
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
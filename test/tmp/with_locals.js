module.exports = function $template($input, locals) {
  var $runtime = require("/Users/jlachapelle/Development/jlach/kale/lib/runtime");
  var $$imports = {};
  $runtime.doImport($$imports, "*", "actions", require("/Users/jlachapelle/Development/jlach/kale/lib/actions"));
  var $0 = (function $0($input, $) {
    var $final = {};
    var $1 = (function $1() {
      return $runtime.lookupProperty($input, $, ["foo"]);
    })();
    $final["foo"] = $1;
    var $2 = (function $2() {
      return $runtime.lookupProperty($input, $, ["baz", "foo"]);
    })();
    $final["baz"] = $2;
    var $3 = (function $3() {
      return $runtime.lookupProperty($input, $, ["$", "bar"]);
    })();
    $final["bar"] = $3;
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
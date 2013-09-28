var javelin = require('../../index');

var locals = {
  "foo": {
    "bar": "baz",
    "qux": "quux",
    "inner": {
      "one": "1",
      "two": "2"
    }
  },
  "outerObject": [
    { "1": "one", "2": "two" },
    { "1": "three", "2": "four" }
  ]
};

var compile = javelin.compile('simple.jav', 'json');

var ast = compile(locals, true);
//console.log(ast);

var result = compile(locals);
console.log(JSON.stringify(result, null, 4));
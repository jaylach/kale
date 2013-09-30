var kale = require('../../index');

var locals = {
  "foo": {
    "bar": "baz",
    "qux": "quux",
    "inner": {
      "one": "1",
      "two": "2"
    }
  },
  "outerArray": [
    { "1": "one", "2": "two" },
    { "1": "three", "2": "four" }
  ]
};

var compile = kale.compileFile('simple.jav');
compile('json', locals, function(error, result) {
  console.log(JSON.stringify(result));
});
var javelin = require('../index');

  var locals = {
    "foos": [
      { "one": "1", "two": "2" },
      { "one": "3", "two": "4" }
    ]
  };

var compile = javelin.compile('simple.jav', 'json');

var ast = compile(locals, true);
//console.log(ast);

var result = compile(locals);
console.log(JSON.stringify(result, null, 4));
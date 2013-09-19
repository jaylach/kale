var javelin = require('../index');

var locals = {
  test: {
    foo: 'foo', 
    bar: 'bar',
    baz: 'baz',
    qux: [
      { one: 'foo', two: 'bar' },
      { one: 'foo', two: 'bar' },
      { one: 'foo', two: 'bar' }
    ],
    "a string": 'a string'
  }
};

var compile = javelin.compile('simple.jav', 'json');

var ast = compile(locals, true);
//console.log(ast);

var result = compile(locals);
console.log(JSON.stringify(result, null, 4));
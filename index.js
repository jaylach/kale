var javelin = require('./lib/javelin');

var locals = {
  test: {
    foo: 'bar',
    bar: 'baz'
  }
};

var compile = javelin.compile('./examples/simple.jav', 'json');
console.log(compile(locals));
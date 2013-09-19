var javelin = require('./lib/javelin');

var locals = {
  test: {
    foo: 'bar',
    bar: 'baz',
    qux: [
      { one: 'one' },
      { one: 'two' },
      { one: 'three' },
    ]
  }
};

var locals2 = {
  foo: {
    test: [
      { one: 1, two: 2, three: 3 },
      { one: 4, two: 5, three: 6 }
    ]
  }
};

var compile = javelin.compile('./examples/simple.jav', 'json');
console.log(compile(locals2, true));
console.log(compile(locals2));
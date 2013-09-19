what is it?
-----------
javelin is a view templating engine for your node.js based RESTful APIs. It allows you to 
treat the data of your API as you would any other view. The gain here is that you can 
separate your view logic from controllers and models. javelin can compile to JSON and XML
natively though other builders can be plugged in to allow compilation to any other format.
The syntax of javeling is inspired by the Ruby gem known as [rabl](https://github.com/nesquena/rabl).

usage
-----
Inside our `index.jav` file
```
object @test {
  :named = false

  .foo, .bar, .baz

  array .qux => 'quux' {
    :copy = false

    .one => '1'
    .two => '2'
  }
}
```

Inside our `index.js` file...
```javascript
var javelin = require('javelin');

var locals = {
  test: {
    foo: 'foo',
    bar: 'bar',
    baz: 'baz',
    qux: [
      { one: 'one', two: 'two' },
      { one: 'three', two: 'four' }
    ]
  }
};

// Get a json-based compiler for our *.jav file
var compile = javelin.compile('/path/to/index.jav', 'json');

// Do our actual compelation
var result = compile(locals);
```

license
-------
The MIT License (MIT)

Copyright (c) 2013 Jason LaChapelle

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

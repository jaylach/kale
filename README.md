[![Build Status](https://travis-ci.org/jaylach/javelin.png?branch=master)](https://travis-ci.org/jaylach/javelin)

overview
--------
javelin is a view templating engine for your node.js based RESTful APIs. It allows you to 
treat the data of your API as you would any other view. The gain here is that you can 
separate your view logic from your controllers and models. javelin can compile to JSON and XML
natively but other builders can be plugged in to allow compiling to any other format. The syntax 
of javelin is inspired by the Ruby gem known as [rabl](https://github.com/nesquena/rabl).

javelin sets out with a few main goals in mind:

* An easy, familiar, way to separate the view logic from your data within RESTful APIs
* A simple, lightweight templating language that makes sense for application data
* Ability to serve your API data in different formats from the same view

Please note that javelin is currently in an _alpha_ state. Most features are somewhere between Stability 1
(Experimental) and Stability 2 (Unstable).

installation
------------
```
npm install javelin
```

usage
-----
Inside our `index.jav` file
```
object @test {
  -named

  set .foo, .bar, .baz

  array .qux => 'quux' {
    set .one => '1'
    set .two => '2'
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

// Do our actual compelation
javelin.renderFile('/path/to/index.jav', 'json', locals, function(error, result) {
  console.log(result);  
});
```

Our console output will look like this...
```json
{
  "foo": "foo",
  "bar": "bar",
  "baz": "baz",
  "quux": [
    { "1": "one", "2": "two" },
    { "1": "three", "2": "four" }
  ]
}
```

syntax
------
_note: this section is a total work in progress_

copy an object from `locals` to result
```
object @foo
```

copy an object from `locals` to result, changing it's name
```
object @foo => 'bar'
```

copy an object from `locals` to result without adding it to a wrapper object
```
object @foo {
  # If we wanted to set it to true, we'd say +named
  -named
}
```

copy specific properties to object, changing their names
```
# object @foo 
object @app_user => 'user' {
  # Do not copy non-specified properties from app_user object
  -copy

  set ._id => 'id'
  set .uname => 'user_name'
}
```

copy array to object
```
object @app_user => 'user' {
  -copy

  # The set keyword can be omitted while inside an object or array
  ._id => 'id', .uname => 'user_name'

  array .user_groups => 'groups' {
    ._id => 'id'
  }
}
```

accessing 'stringed' keys on an object
```
object @app_user => 'user' {
  -copy

  ._id => 'id', .uname => 'user_name'

  # We can access 'stringed' object keys by using .'the key' notation
  .'role id' => 'role_id'

  array .user_groups => 'groups' {
    ._id => 'id'
  }
}
```

should you require more intricate control over a property value, you can use inline javascript. The value
return from the inline script will be used as the value for the property, so long as the value is not null or
undefined. 

_note: inline scripting is a WIP and currently very limited in implementation_
```
object @app_user => 'user' {
  -copy

  ._id => 'id', .uname => 'user_name'
  .'role id' => 'role_id'

  .name %{
    return parent.first_name + ' ' + parent.last_name;
  %}

  array .user_groups => 'groups' {
    ._id => 'id'
  }
}
```

javelin also provides the ability to reuse views by allowing you to mixin existing views. This functionality is
currently still in development so it should be considered expirmental. While I don't imagine the API will change 
for it, I do expect to add a bunch more features to it.

```
# Inside includes/userGroups.jav
array .user_groups => 'groups' {
  ._id => 'id'
}
```

```
object @app_user => 'user' {
  -copy

  # The set keyword can be omitted while inside an object or array
  ._id => 'id', .uname => 'user_name'

  include 'includes/userGroups'
}
```

An express3 middleware is provided so that you can easily render javelin views from within your express routes. 
The examples/express folder has a more complete example, but this is the basics you need to get started...

```
var javelin = require('javelin');

app.engine('jav', javelin.express('json'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jav');

app.get('/javelin', function(request, response) {
  response.render('index', { /* locals */ });
});
```

beta progress
-------------
* ~~Jison based lexer~~
* ~~Jison based grammar~~
  * ~~object keyword~~
  * ~~array keyword~~
  * ~~set keyword~~
  * ~~action configuration~~
  * ~~comments~~
  * ~~inline javascript~~
  * object accessors (i.e: @foo.bar and foo['bar'])
  * map, reduce, etc...
* ~~Parser to AST structure~~
* ~~AST to JSON builder~~ (Stability: 2 - Unstable)
  * ~~Object building~~
  * ~~Array building~~
* ~~Inline Javascript implementation~~ (Stability: 1 - Experimental)
* ~~Refactor how options are set~~
* View Caching
* Command line compiler
* Partials Support
  * ~~Include~~ (Stability: 1 - Experimental)
  * Extend
* AST to XML builder


And...

Tests, tests, and more tests...

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

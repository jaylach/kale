[![Build Status](https://travis-ci.org/jaylach/kale.svg?branch=master)](https://travis-ci.org/jaylach/kale)
[![Coverage Status](https://coveralls.io/repos/jaylach/kale/badge.svg?branch=master&service=github)](https://coveralls.io/github/jaylach/kale?branch=master)
[![Dependency Status](https://david-dm.org/jaylach/kale.svg)](https://david-dm.org/jaylach/kale)
[![devDependency Status](https://david-dm.org/jaylach/kale/dev-status.svg)](https://david-dm.org/jaylach/kale#info=devDependencies)

overview
--------
kale is a node.js templating engine for your JSON data. It allows you to treat your JSON data
as you would any other view. The gain here is that you can separate your view logic from your 
controllers and models. kale can transform to and from JSON natively. There are plans to, 
eventually, add in XML and YAML support as well. kale is heavily inspired by the Ruby 
gem [rabl](https://github.com/nesquena/rabl). The syntax was designed to be very similar to JSON, 
as it's familiar to most web developers. 

kale sets out with a few main goals in mind:

* an easy, familiar, way to separate the view logic from your data within RESTful APIs
* a simple, lightweight templating language that makes sense for application data
* ability to serve your API data in different formats from the same view

please note that kale is currently in a _beta_ state. Most features are somewhere between Stability 1
(Experimental) and Stability 2 (Unstable).

breaking changes
----------------
the latest version of kale (1.0.0) introduces some breaking changes. you can find the complete changelog
in the [CHANGELOG.md](CHANGELOG.md) file.

installation
------------
`$ npm install kale@beta` _note: this version is not yet published to npm._

using kale
----------

### creating a template
kale can work with both JSON objects and arrays. If you pass kale a plain object, it will apply the template 
using just that object. If you pass kale an array it will apply the template to each object within the array.

**To create a new template:**

<pre>
// template.kale

{
  // properties go here
}
</pre>

_note that all templates return a new object / array and will not modify the existing input. It is, effectively, a map._

**to map a new property, with a string or number value:**

<pre>
// user.kale

{
  <strong>userName: "awesome_man"</strong>,
  <strong>userId: 42</strong>
}
</pre>

**to mape a new property, with a value taken from the input object:**

<pre>
// user.kale

{
  userName: "awesome_man",
  userId: 42,
  <strong>userGroup: groupId</strong>
}
</pre>

_the value of `userGroup` will be set to whatever value the `inputKey` property is of the input object. note that you can 
also use standard javascript accessors, i.e: `some.value`, `some.other["value"]`, etc._

**to concatenate binding values:**

<pre>
// user.kale

{
  userName: "awesome_man",
  userId: 42,
  userGroup: groupId,
  <strong>full_name: firstName + ' ' + lastName</strong>
}
</pre>

**to embed one template into another:**

<pre>
// user.kale

<strong>import address from './address'</strong>

{
  userName: "awesome_man",
  userId: 42,
  userGroup: groupId,
  full_name: firstName + ' ' + lastName,
  <strong>address: _.address()</strong>
}
</pre>

<pre>
// address.kale

{
  street: street1,
  city, state,
  zipCode: zip_code
}
</pre>

_actions are used by calling them as if they were a function of the identifier. the identifier the action is called on will
be passed to the action as the first parameter, and any supplied arguments will be passed in the order they were supplied.
note that any custom actions / templates must be imported. the standard actions provided by kale will be imported by default._

**we can chain actions together, just like we'd change functions:**

<pre>
// user.kale

{
  userName: "awesome_man",
  userId: 42,
  userGroup: groupId,
  full_name: firstName + ' ' + lastName,
  address: _.address(),
  <strong>homePhone: phones.filter({ type: 'home' })
                   .first()
                   .pluck('number')</strong>
}
</pre>

kale provides the following actions by default: 

* first - _uses the first item in an array_
* sortBy(args: Object { prop, order }) - _sort an array of objects by specified `prop`, in the specified `order`_
* filter(args: Object { * }) - _filter an array where input key: value matches args key: value_
* reverse - _reverse an array or string_
* pluck(prop: String) - _pluck values of specified `prop` off array of objects_
* toUpper - _convert a string to upper case_
* toLower - _convert a string to lower case_
* capitalize - _capitalize Every Word In A String_

**to create your own actions**

```javascript
// reverse.js

// reverse()
module.exports = function reverse(value) {
  if ( Array.isArray(value) ) {
    return value.reverse();
  }
  else if ( typeof(value) === 'string' ) {
    return value.split('').reverse().join('');
  }
}; //- reverse()
```

```javascript
// other_actions.js

// simplePluck()
var simplePluck = function simplePluck(value, prop) {
  if ( typeof(value) === 'object' ) {
    return value[prop];
  }

  return value;
}; //- simplePluck()

module.exports.simplePluck = simplePluck;
```

<pre>
// some_file.kale

import reverse from './reverse'
import * from './other_actions'

{
  <strong>reversed: items.reverse()</strong>,
  <strong>simply_plucked: obj.simplePluck('someProp')</strong>
}
</pre>

### using a template

kale template are compiled directly to JavaScript. When parsing and compiling a template, kale will create a new JavaScript file in the specified location. The file wil be named to whatever the template name is, and you can include this into your node app just like you'd require any other module. 

this example is taken almost directly from `example1.js` in the examples folder.

```javascript
// user.kale

import address from './address'

{
  id: userId,
  userName,
  fullName: firstName + lastName,
  homePhone: phones.filter({ type: 'home' })
                   .first()
                   .pluck('number'),
  mobilePhone: phones.filter({ type: 'mobile' })
                     .first()
                     .pluck('number'),
  address: _.address()
}
```

```javascript
// address.kale

{
  short: street1 + '\n' + 
         city + ', ' + 
         state + ' ' + 
         zipCode,  
  street: street1,
  city, state,
  zip: zipCode
}
```

```javascript
// example1.js

var kale = require('kale');

// Note that kale provides a single render function which accepts a single file.
kale.render('examples/example1.kale', {
  outPath: 'examples/templates',
  pretty: true
});

var testData = {
  userId: 1,
  userName: 'jlach',
  password: 'bad_idea',
  firstName: 'j',
  lastName: 'lach',
  street1: '123 Main Street',
  city: 'Over',
  state: 'There',
  zipCode: '00001',
  phones: [
    { number: '(888) 888-8881', type: 'home' },
    { number: '(888) 888-8882', type: 'mobile' },
    { number: '(888) 888-8883', type: 'other' },
  ]
};

var result = require('./templates/user')(testArray);
console.log(JSON.stringify(result));

/* result =

{
  "id": 1,
  "userName": "jlach",
  "firstName": "j",
  "homePhone": "(888) 888-8881",
  "mobilePhone": "(888) 888-8882",
  "address": {
    "short": "123 Main Street\nOver, There 00001",
    "street": "123 Main Street",
    "city": "Over",
    "state": "There",
    "zip": "00001"
  }
}

*/
```

command line
------------

After installing the latest version of node, install with:

`$ npm install kale@beta -g` _note: this version is not yet published to npm._

and run with:

`$ kale --help`

in browser
----------
BROWSER BUILD HAS BEEN REMOVED IN THIS VERSION. IT WILL REAPPEAR IN A LATER VERSION.

license
-------
The MIT License (MIT)

Copyright (c) 2014-2015 Jason LaChapelle

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

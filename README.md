<p align="center">
  <img src="http://os.codegrit.com/kale/images/kale.png" width="360" />
</p>

overview
--------
kale is a view templating engine for your node.js based RESTful APIs. It allows you to 
treat the data of your API as you would any other view. The gain here is that you can 
separate your view logic from your controllers and models. kale can "compile" to and from JSON
natively. There are plans to, eventually, add in XML and YAML support as well. kale is heavily 
inspired by the Ruby gem [rabl](https://github.com/nesquena/rabl). The syntax was designed
to be very similar to JSON, as it's familiar to most web developers. kale also borrows a lot of 
conventions from the AngularJS project. 

kale sets out with a few main goals in mind:

* An easy, familiar, way to separate the view logic from your data within RESTful APIs
* A simple, lightweight templating language that makes sense for application data
* Ability to serve your API data in different formats from the same view

Please note that kale is currently in an _alpha_ state. Most features are somewhere between Stability 1
(Experimental) and Stability 2 (Unstable).

installation
------------
`npm install kale@alpha`

using kale
----------

### creating a template
kale can convert both raw json/JavaScript objets and json/JavaScript arrays. If you pass kale a plain object, it will
apply the template using just that object. If you pass kale an array it will apply the template to each object within
the array.

**To create a new template:**

<pre>
templateName => {
  // Properties go here
}
</pre>

_Note that all templates return a new object / array and will not modify the existing input. It is, effectively, a map._

**To map a new property, with a string or number value:**

<pre>
user => {
  <strong>userName: "awesome_man"</strong>,
  <strong>userId: 42</strong>
}
</pre>

**To mape a new property, with a value taken from the input object:**

<pre>
user => {
  userName: "awesome_man",
  userId: 42,
  <strong>userGroup: {{groupId}}</strong>
}
</pre>

_The value of `userGroup` will be set to whatever value the `inputKey` property is of the input object. Note that you can 
also use standard JavaScript accessors, i.e: `some.value`, `some.other["value"]`, etc._

**To concatenate binding values:**

<pre>
user => {
  userName: "awesome_man",
  userId: 42,
  userGroup: {{groupId}},
  <strong>full_name: {{firstName}} + ' ' + {{lastName}}</strong>
}
</pre>

**To embed one template into another:**

<pre>
user => {
  userName: "awesome_man",
  userId: 42,
  userGroup: {{groupId}},
  full_name: {{firstName}} + ' ' + {{lastName}},
  <strong>address: {{_ | @address}}</strong>
}

address => {
  street: {{street1}},
  city: {{city}},
  state: {{state}},
  zipCode: {{zip_code}}
}
</pre>

_By using the pipe (`|`) we are able to call actions and/or embed other templates. When using the pipe, the identifier before
the pipe is the first parameter that will be passed to the action. This identifier is either a binding on the input object or
an underscore, which means use the full input object. Prefixing an action with the at symbol (`@`) tells kale to use a template
with that name. Note that kale will currenly only look for other templates if they are compiled in the same location as the 
calling template._

**To call an action with multiple arguments, and/or call multiple actions:**

<pre>
user => {
  userName: "awesome_man",
  userId: 42,
  userGroup: {{groupId}},
  full_name: {{firstName}} + ' ' + {{lastName}},
  address: {{_ | @address}},
  <strong>homePhone: {{phones | filter: { type: 'home' } 
                      | first
                      | pluck: 'number' }}</strong>
}
</pre>

Kale provides the following actions by default: 

* first - _uses the first item in an array_
* sortBy(args: Object { prop, order }) - _sort an array of objects by specified `prop`, in the specified `order`_
* filter(args: Object { * }) - _filter an array where input key: value matches args key: value_
* reverse - _reverse an array or string_
* pluck(prop: String) - _pluck values of specified `prop` off array of objects_
* toUpper - _convert a string to upper case_
* toLower - _convert a string to lower case_
* capitalize - _capitalize Every Word In A String_

**To create your own actions**

```javascript
// some_file.js
var actions = require('kale/actions');

// reverse()
var reverse = function reverse(value) {
  if ( Array.isArray(value) ) {
    return value.reverse();
  }
  else if ( typeof(value) === 'string' ) {
    return value.split('').reverse().join('');
  }
}; //- reverse()

// simplePluck()
var simplePluck = function simplePluck(value, prop) {
  if ( typeof(value) === 'object' ) {
    return value[prop];
  }

  return value;
}; //- simplePluck()

actions.addAction('reverse', reverse);
actions.addAction('simplePluck', simplePluck);
```

<pre>
// some_file.kale
some_template => {
  <strong>reversed: {{items | reverse}}</strong>,
  <strong>simply_plucked: {{obj | pluck: 'someProp' }}</strong>
}
</pre>

### using a template

kale template are compiled directly to JavaScript. When parsing and compiling a template, kale will create a new JavaScript file in the specified location. The file wil be named to whatever the template name is, and you can include this into your node app just like you'd require any other module. 

This example is taken almost directly from `example1.js` in the examples folder.

```
// example1.kale
user => {
  id: {{userId}},
  userName: {{userName}},
  firstName: {{firstName}},
  homePhone: {{ phones | filter: { type: 'home' }
                       | first
                       | pluck: 'number' }},
  mobilePhone: {{ phones | filter: { type: 'mobile' }
                         | first
                         | pluck: 'number' }},
  address: {{ _ | @address }}
}

address => {
  short: {{street1}} + '\n' + 
         {{city}} + ', ' + 
         {{state}} + ' ' + 
         {{zipCode}},  
  street: {{street1}},
  city: {{city}},
  state: {{state}},
  zip: {{zipCode}}
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

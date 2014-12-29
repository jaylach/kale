overview
--------
kale is a view templating engine for your node.js based RESTful APIs. It allows you to 
treat the data of your API as you would any other view. The gain here is that you can 
separate your view logic from your controllers and models. kale can compile to JSON and XML
natively but other builders can be plugged in to allow compiling to any other format. kale is
heavily inspired by the Ruby gem [rabl](https://github.com/nesquena/rabl). The syntax was designed
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
`npm install kale@beta`

using kale
----------

### creating a template
kale can convert both raw json/javascript objets and json/javascript arrays. If you pass kale a plain object, it will
apply the template using just that object. If you pass kale an array it will apply the template to each object within
the array.

To create a new template:

<pre>
templateName => {
  // Properties go here
}
</pre>

or

<pre>
templateName -> {
  // Properties go here
}
</pre>

_Using a fat arrow (`=>`) will create a new object when the template is used (basically, a map).
Using a skinny arrow (`->`) will modify the object in place, only changing the properties which are specified._

To map a new property, with a string value, to the output:

<pre>
templateName -> {
  <strong>key: "value"</strong>
}
</pre>

### using a template

in browser
----------
BROWSER BUILD IS CURRENTLY UGLY, AND SUPER ALPHA, BUT IT WORKS!

Kale can be compiled to run inside a browser. This is done by calling `kale.getBrowserScript` with an array of files
you want to compile. This function also takes either `"global"` or `"angular"` as the second parameter. This defines how the
file should be generated. If `"global"`, kale will be set to `window.kale`. If `"angular"`, an Angular module named `kale` will
be generated and a service named `Kale` will be created.

The template functions will be compiled and a string of the JavaScript will be returned to you. It is currently your 
responibility to write the final string to file. You can see an example of this, with a grunt task, in the `examples/grunt` 
folder. 

The browser build will currently only work in modern browsers (IE9+) as it relies on things like Array.isArray, Array.filter,
Array.map, etc. 

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

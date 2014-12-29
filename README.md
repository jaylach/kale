overview
--------
kale is a view templating engine for your node.js based RESTful APIs. It allows you to 
treat the data of your API as you would any other view. The gain here is that you can 
separate your view logic from your controllers and models. kale can compile to JSON and XML
natively but other builders can be plugged in to allow compiling to any other format. kale is
heavily inspired by the Ruby gem [rabl](https://github.com/nesquena/rabl). The syntax is loosely
based off many popular languages, such as Ruby, Lua, and HTML. 

kale sets out with a few main goals in mind:

* An easy, familiar, way to separate the view logic from your data within RESTful APIs
* A simple, lightweight templating language that makes sense for application data
* Ability to serve your API data in different formats from the same view

Please note that kale is currently in an _alpha_ state. Most features are somewhere between Stability 1
(Experimental) and Stability 2 (Unstable).

stay tuned
----------
I'll be filling out this README.md file in the coming days. Please stay tuned for more information, examples, 
and, most importantly, tests! :)

installation
------------
`npm install kale@beta`

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

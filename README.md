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

breaking changes
----------------
kale is undergoing a whole host of changes, from the actual kale language to the node api. It's basically 
being rewritten from the ground up. All these changes will be in version 0.3.0, and will be released onto
npm as beta for a while before the current version (0.2.0) is replaced.

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

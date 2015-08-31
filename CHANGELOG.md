v0.7.0
======

##### Breaking Changes

* grammar changed to only allow one template per file
* template definition changed from `name => { ... }` to just `{ ... }`
* compiled templates are now named the same as the template file name, rather than the template name
* templates used as actions must now be imported using the new `import` keyword

##### Other Changes

* `kale.parse` now accepts a glob rather than just a single file
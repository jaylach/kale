v0.7.0
======

##### Breaking Changes

* grammar changed to only allow one template per file
* template definition changed from `name => { ... }` to just `{ ... }`
* compiled templates are now named the same as the template file name, rather than the template name
* templates used as actions must now be imported using the new `import` keyword (see below)

##### Other Changes

* `kale.parse` now accepts a glob rather than just a single file
* a new `import` keyword. the grammar is: `import FILE as VARIABLE`
	* FILE is is usually going to be a relative path to your COMPILED template, though it could be any string
	  accepted by node's required. there is no need to include `.js` or `.kale` at the end of FILE
	* VARIABLE is any valid JavaScript variable. it is how you will reference the imported template in your action
* the `{{` and `}}` "binding brackets" are now optional when _not_ using an action. if you're using an action, they 
  are still required
* when the destination property name matches the binding property name, you can now omit the `key: value` pair, and 
  instead just use `key`. i.e: instead of `userName: userName,` or `userName: {{userName}},`, you can now use just `userName,`
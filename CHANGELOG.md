v1.0.0
======

version 1.0.0 of kale is what i'm considering the 'beta' release. it contains a few breaking changes, and also
some changes to the grammar that (i hope) will make these templates easier to work with. 

##### Breaking Changes

* the `import` grammar has been changed from `import FILE as VARIABLE` to `import VARIABLE from FILE` in order to match ES6 spec
* the way you call actions is now more in line with regular javascript (see below)
* the `{{` and `}}` binding brackets have been completely removed from the grammar
* `kale/actions` has been removed. custom actions are now imported using `import` (see below)

##### Other Changes

* the way actions are called has been changed to be more javascript-like
	* actions are now called using `variable.ACTION(...)`
	* actions can be chained together by using `variable.ACTION1(...).ACTION2(...)`
	* if the action is the first one in the chain, the value of `variable` will be passed as the first 
	  argument to the action.
	* if the action is second (or more) in the chain, the result of the previous actions will 
	  be passed as the first argument to the action
* the way custom actions are made usable by a kale template has been drastically changed
	* custom actions must now be imported using the `import` keyword
	* a custom action is any function that takes one or more arguments. the first argument will always
	  be the value the action should act upon
	* imported actions should be ...
		* a function, which would be imported as `import VAR from FILE`
		* an object, which would be imported as `import { VAR, VAR } from FILE` or `import * from FILE`
* standard kale actions are always available and do not require importing

v0.7.1
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
  instead just use `key`. i.e: instead of `userName: userName` or `userName: {{userName}}`, you can now use just `userName`
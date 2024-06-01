# Import-Export
Importing and exporting in <code><img style="display: inline-block; margin-bottom: -5.5px; margin-right: 5px;" src="./assets/logo.png" width="18">rew</code> is as easy as in <code><img src="/rew-docs/assets/js.svg" width="12px" style="display: inline" /> javascript</code>.

## Import
To import, you can use the normal javascript import syntax, or the `imp` function.

## The `imp` function
The built in imp function is a sync import function, it only imports other rew files.
```coffee
myModule = imp './myMod'
# OR
myOtherModule = imp './myOtherMod.coffee'
```

The imp function can also import js files files the same way.
```coffee
myJsMod = imp './myJsMod'
# This will get resolved to .coffee or .js by default
```

## `imp` assertions
You can assert differt imports by passing an object into 
```coffee
myModule = imp './myModule', customProp: 'customVal'
```

## Default `imp` assertions
There are default assertions for imports to tell the runtime how to import certain files

One of the default assertion properties is `type`
```coffee
myJsMod = imp './myJsMod', type: 'js'
textFile = imp './some.txt', type: 'text'
jsonObject = imp './some.json', type: 'json'
yamlFile = imp './some.yaml', type: 'yaml'
```

Another is context, the `context` assertion will determine if the import can share a context between the parent or not.
```coffee
myMod = imp './mymod', context: 'new'
myMod = imp './mymod', context: 'inherit'
```

There is also the `save` assertion, which instead of just giving you the exports, it loads it to your context
```coffee
imp './mymod', save: true
```

The `as` assertion, lets you do things specific to the main parent inside of imports or just as a child
```coffee
imp './mymod', as: 'main'
imp './mymod', as: 'child'
```


## Getting the import assertions
To get what have been asserted to this import you can use the `imports.assert`.
```coffee
print 'custom value passed' if imports.assert.customProp == 'customValue'
```

## The `require` function
With **imp** you can only import **rew** code, and nothing else, and with the `require` function you can only import modules from the `node_modules` folder.
```coffee{1}
express = require 'express'

express
  .app()
  .get '/', (req, res) -> res.send('Hello')
  .listen 3000
```

> Keep in mind that to import nodejs builtin packages, you need to start with `node:`, like `node:fs` instead of `fs`

## The `inc` function
I don't advice you to use the include or **inc** function as it makes your app slower since it:
  - Looks for files and if not found
  - Looks for node modules
But it can be used to import both node modules and files.
```coffee
chalk = inc 'chalk'
myMod = inc './myMod', assertion: 'still possible for files'

# You can also help it understand what you're doing and speed up the process.
fs = inc 'node:fs'
express = inc 'pkg:express'
```

## Using js import syntax
You can also use the normal `js` imports.
```coffee
import module from "./module"
# translates to:
{ default: module } = inc './module'

import { submodule } from "./module"
# translates to:
{ submodule } = inc './module'

import * as bundleModule from "./module"
# translates to:
bundleModule = inc './module'
```

## Exporting
Exporting in `rew` is different, you can export in many different ways.

## The ideal exporting
When you write your code, you can choose to make some variables public so to export them.
```coffee
myPrivateVariable = 'this will not be exported'

pub myPublicVariable = 'this will be exported'
```

To import this, simply do:
```coffee
{ myPublicVariable } = imp './myfile'
```

Keep in mind, `pub` only works on variable declaration, and it has a pre-parser to parse your code into 
something like this instead:
```coffee
pub 'myPublicVariable', myPublicVariable = 'this will be exported'
```

## Exporting other than variables
To export freely, you can use the `exports` builtin function.
```coffee
class MyClass
  # ...

exports { MyClass }
```

## Exporing Default
If you want to export something as default:

#### If you don't have other previously exported properties:
```coffee
exports myVariable, "default"
```

#### If you have exported anything before your default:
```coffee
pub something = 1

myVariable = () -> ""

exports myVariable
```

## Exporting without the default
If you or example want to export one thing, without it being flagged as default, do not export anything else and just do this
```coffee
exports myVariable
# or
module.exports = myVariable
```
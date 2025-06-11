# Importing and exporting
In <code><img style="display: inline-block; margin-bottom: -5.5px; margin-right: 5px;" src="./assets/logo.png" width="18">rew</code>, importing and exporting is... well just intuitive  i guess... Just do as you would in <code><img src="/assets/js.svg" width="12px" style="display: inline" /> javascript</code> except a few differences.

## Exporting
To export, you can use the normal js ways
```coffee
export myVar = "something"

myOtherVar = "something else"

export { myOtherVar }

export default class Something
export class Something

export default function Something()
export function Something()

export default { Something }
```
::: details Notes
I wouldn't recommend using `export default` since default exports are not a thing in rew.
:::

## Importing
Well, here's how:
```coffee
import { myVar, myOtherVar } from "./mymod.coffee";
# but keep in mind
import myStuff from "./mymod.coffee";
# this would not give you the defaults, 
# it would rather give you all of the exports from mymod.
# so there is no default exports in rew.
```

## Import Assertions
You can use the "experimental" `assert` syntax in rew.
```coffee
import whatever from "./mymod.coffee" assert something: "something_else"
```
In the importee, you can do this:
```coffee
if module.options.something
  export this
else
  export that
```

## Import priorities
With `!` at the end of an import, you can force it to be preprocessed. You should use that if your import has [compiler options](/compiler-directive) or [declarations](/declarations).
```coffee
import "#std!";

import "#std.ffi!";

import "./path/to/myfile.coffee!";
```
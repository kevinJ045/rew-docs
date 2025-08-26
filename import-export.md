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

## Sub-Packages

In <code><img style="display: inline-block; margin-bottom: -5.5px; margin-right: 5px;" src="./assets/logo.png" width="18">rew</code>, the `package` keyword is used to organize your code into **logical modules**.  
Think of it like **namespaces in C++**, **mods in rust** or **packages in Java**, but with a simpler, CoffeeScript-like syntax.

### Defining a Package
To declare a package, place it at the top of your file:
```coffee
package myApp::utils;

function myApp::utils::sayHello(name)
  print "Hello, " + name + "!"
```
Here:
  - myApp is the root package.

  - utils is a subpackage inside myApp.

  - Functions and variables defined under this package must use the fully qualified name unless imported.

### Public Packages
You can also mark a package as public so that it can be imported by other modules:

```coffee
public package calculator;

function calculator::add(a, b)
  a + b

function calculator::sub(a, b)
  a - b
```

### Using a Package
Once you have a package, you can using it to bring its symbols into scope:

```coffee
import "./calculator.coffee";

using namespace calculator::;

print add(2, 3)   # instead of calculator::add(2, 3)
```
If you only want a specific symbol:
```coffee
print calculator::add(5, 7)
```

### Nested Packages
Packages can be deeply nested:

```coffee
public package myApp::graphics::shapes;

function myApp::graphics::shapes::Circle(radius)
  this.radius = radius
```
And then you can bring them in as:
```coffee
using namespace myApp::graphics::shapes::;

circle = Circle(10) 
# or
using namespace myApp::graphics::shapes;

circle = shapes::Circle(10)
```

### Multiple Public Packages

A single file in <code><img style="display: inline-block; margin-bottom: -5.5px; margin-right: 5px;" src="./assets/logo.png" width="18">rew</code> can declare **multiple `public package`s**.  

#### Defining multiple public packages
```coffee
# packages.coffee
public package math;

function math::add(a, b)
  a + b

function math::sub(a, b)
  a - b

public package stringUtils;

function stringUtils::capitalize(str)
  str[0].toUpperCase() + str.slice(1)

function stringUtils::reverse(str)
  str.split("").reverse().join("")
```
Here we defined two independent packages in one file:

- math → provides arithmetic helpers

- stringUtils → provides string manipulation helpers

#### Importing specific packages
When importing a file with multiple public packages, if you are picking, you must explicitly choose which ones you want:

```coffee
# They will all still be named even if you don't spread name them
import { math, stringUtils } from "./packages.coffee";
# or
import "./packages.coffee";

using namespace math::;

print add(3, 5)              # from math
print stringUtils::reverse("rew")   # fully qualified call
```
  - `import { math, stringUtils }` → selects both public packages from `packages.coffee`.

  - `using namespace math::;` → brings all symbols from math into scope.

  - For stringUtils, we didn’t `using` it, so we still call with its fully qualified path (`stringUtils::reverse`).

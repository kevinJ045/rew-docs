# Compiler Directives
There are a few compiler options you can try that will change how your code or even all code imported under behave.

## Example
Here, we want to allow for coffeescript classes
```coffee
using compiler::coffeeClasses;

class MyClass
  constructor: ->
    rew::io::out.print "hello"
```

## Public Compiler Options
Using the `public` keyword, we can publicly use compiler options.
```coffee
using public compiler::coffeeClasses;
using public compiler::implicitReturns.disable;
import "./path/to/something.coffee"; # it will allow coffeeClasses there as well
```
::: details Notes
Keep in mind that when you do this, you are guaranteeing each file under it to be compiled differently, therefore maybe breaking other apps that were intended to use differently. But each file can override the previous options by strictly disabling or enabling them in your file.
:::

## All options
 -    **`coffeeCompat`**: Enable all coffee compatiblity settings
 -    **`autoVar`**: Automatically use `var` when u declare variables
 -    **`autoLet`**: Automatically use `let` when u declare variables
 -    **`autoConst`**: Automatically use `const` when u declare variables
 -    **`coffeeBinaryExistential`**: implied in the name
 -    **`coffeeBooleans`**: implied in the name
 -    **`coffeeClasses`**: implied in the name
 -    **`coffeeComment`**: implied in the name
 -    **`coffeeDo`**: implied in the name
 -    **`coffeeEq`**: implied in the name
 -    **`coffeeForLoops`**: implied in the name
 -    **`coffeeInterpolation`**: implied in the name
 -    **`coffeeJSX`**: implied in the name
 -    **`coffeeLineContinuation`**: implied in the name
 -    **`coffeeNot`**: implied in the name
 -    **`coffeeOf`**: implied in the name
 -    **`coffeePrototype`**: I do not reccommend disabling this
 -    **`implicitReturns`**: `true` by default, you won't have to strictly say `return` in functions
# Phantom Syntax
::: danger Notice
This feature is highly experimental and is not recommended for use yet.
:::

Phantom syntax is a comment based declaration to declare custom syntaxes. It uses comments and `.h.coffee` or coffee header files to declare a comment-based declaration syntax.

#### Example:
It mostly works like the `C`'s declare function. 
```coffee
#declare* IDENTIFIER "func" = "function";
```

## Declaration
To declare a lookup, you first need the `declare` keyword and then you need to know what token you are replacing. A sign? An identifier? A string?

Once you determine that, you can go ahead and:
```coffee
#declare IDENTIFIER "say.hello" = print("Hello")
```
::: details Showcase
```coffee
say.hello
# will be converted to
print("Hello")
```
:::

## Tokens
All the token types:
- `IDENTIFIER`: can also be used as `key`
- `COMMENT`
- `TRIPLE_STRING`
- `STRING`
- `REGEX`
- `WHITESPACE`
- `OTHER`

## Declaration Scopes
When you declare a syntax, you are declaring it only to the local file, meaning that it'll only work on the same file that it's written on. To pass that, you can use `declare*`.
```coffee
# Public Declare
#declare* key "myKey" = replacementValue;
```
No we can use this syntax in other files too.

## Including other files
Unlike normal exports, phantom script is not dynamically imported. So it has it's own way of importing.
```coffee
#include ./declarations.coffee
# OR
#include *./declarations.coffee
# OR
#include app.package
#include app.package/some.coffee
```
::: details Why `*`?
`include` appends the whole file into your current file as a string, in order to ignore the imported file and only extract phantom scripts from it, use `*` at the start of your file.
:::

## Header coffee files
Header coffee files are normal coffee files but with the additional functionality of being auto imported. 
```coffee
# this is a header file
#declare* key "myKey" = myValue;
print 'hi' # won't be executed as only comments work
```

#### Example:
```coffee
# This will look for myFile.h.coffee in addition
myFile = imp '#./myFile.coffee'
# or
import myModule from "#./myFile"
```
This way, we are capable of importing modules with the addition of including the headers for this file if exists.
::: info Notice
This only works with both `imp` and `inc`, meaning it will work with [JS import syntax](/import-export.md#using-js-import-syntax).
:::

## Presets
Declaration presets are default setups for functionalities to replace tokens. So instead of just replacing a token. You can pass a function:
```coffee
#declare* key "myToken" = ${
#	return '"A string replacement"'
#};
```
This is a function declaration. whenever an `IDENTIFIER` with calue `myToken` is found. This function runs, and it's returns goes in place of `myToken`.

If you wish to make something here, these are the variables in this scope:
```yaml
token: Current Token
  value: string
index: number
  - Current Index
tokens: Token[]
  - An array of tokens
code: string
  - Current code
hooks: Hooks
  - A hook
setIndex: Function
  - To skip to a token
```

## Hooks
Hooks are items that get added at a certain token, like for example if you want to add a value at a future token, you can use hooks.
```coffee
hooks.push({
  index: number,
  value: string
});
```

## Aliases
Aliases are quick ways to replace a token to another.
```coffee
#alias ns = namespace
using ns ...
#alias bracket = (
myFunc bracket '') # translates to myFunc ('')
```

## Declarators
A declarator is a function that can be used to declare a variable.
```coffee
#declare* key "=myDeclarator" = myDeclarator;
```
This will define a test case that tests for anything with `myDeclarator variableName = ...` and converts it to `variableName = myDeclarator ...`.

#### Example:
```coffee
#declare* key "=myClass" = createMyClass;
myClass myInstance = 'my value'
```
**This will translate to**:
```coffee
myInstance = createMyClass 'my value'
```

## Definition Declarators
Some declarators can be non assignable. Like this:
```coffee
myClass myInstance
```
So to achieve this, we can use:
```coffee
#declare* key "=myClass*" = createMyClass;
```
Now it will translate to:
```coffee
myInstance = createMyClass()
```

## Passing parameters in Declarators
You can pass parameters for declarators to define them.
```coffee
myClass('some value') myInstance = 'my value'
```
Which translates to:
```coffee
myInstance = createMyClass('my value', 'some value')
```

## Constructor Declarators
You can make classes into declarators and force it to add a `new` on translation, like:
```coffee
#declare* key "=MyClass!" = MyClass;
```
Now this:
```coffee
MyClass instance = 'some-arg'
```
Will be translated to:
```coffee
instance = new MyClass('some-arg')
```
You can also use it as a definition declarator with:
```coffee
#declare* key "=MyClass!*" = MyClass;
```
> Remember to use the `*` at last. The order is important.

## Known Problems
- Spaces are required during declaration when using a declarator
- Strings don't work well with declare
- The entire feature can make unexpected syntax errors.
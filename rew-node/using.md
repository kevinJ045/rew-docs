# The `using` directive
The using directive is both a runtime and a compile-time directive. It can help tell the compiler what pre-installed compilers to enable, with the option to tell the compiler to compile with certain options. But it can also be used in a custom way to do custom functions based on what the context is using.

## Runtime Changes
The `using` directive has a namespace in the [context](/context) called `__using__`. which is where all the options you enabled with `using` sit. It helps to do optional tasks based on what a context is using.
```yaml
__using__:
  'UseName': true,
  'AnotherOption': [param1, param2],
  'CustomFeature': 
    myOption: 'myValue'
```
## Using the directive
```coffee
using 'UseName'
# __using__['UseName'] = true
using 'UseName', onlyOneParameter
# __using__['UseName'] = onlyOneParameter
using 'UseName', param1, param2, ...
# __using__['UseName'] = [param1, param2, ...]
```

## Default `using` options
There are a few names that enable compiler level options like `JSX` or `TypeScript` that come by default.
-   **`JSX`:**
    -   Enables JSX to the current context.
        **Example**:
        ```coffee
        using JSX
        ```
        You can also pass the JSX createElement function by doing as follows:
        **Example**:
        ```coffee{2}
        myCreateElementFunction = (elt) -> { elementName: elt }
        using JSX, myCreateElementFunction
        ```
-   **`DECORATORS`:**
    -   Enables [Typescript Decorators]() standalone without enabling typescript.
        **Example**:
        ```coffee
        using DECORATORS
        ```
-   **`TYPES`:**
    -   Enables Typescript in the current file.
        **Example**:
        ```coffee
        using TYPES
        ```
Keep in mind, default `using` options are passed without strings.

## Custom Stuff
You can define and use your own options with the using directive. These custom options can be used to enable or configure features specific to your application.


```coffee
using 'MyOwnStuff'

if __using__.MyOwnStuff
  print 'using my own stuff'

## Or, with params:

using 'MyOwnStuff', myOption: 'myValue'

if __using__.MyOwnStuff
  print __using__.MyOwnStuff.myOption # myValue
```

## Usage
`Usage` is a class that is recognized by the directive and can be used to make a trigger for usages.
```coffee
myOwnUsage = Usage::create 'myUsage', (params) ->
  print 'using myUsage with ', params

using myOwnUsage, 'arg1', 'arg2', () -> 'this is a callback'
```

## Usage namespaces
There's a helper function for the `using` directive called `namespace`. it lets you run a function in a subcontext of your choice.
```coffee
myContext =
  property: 'value'

globalVariable = 1

using namespace myContext, ->
  print localVariable, property
```
::: info 
Keep in mind that namespaces will only share global variables and no local variables will be shared with the subcontext.
:::

## Usage Groups
A usage group let's you declare arguments to pass for `using`.
```coffee
toUse = Usage::group 'name', 'param1', 'param2', ...
using toUse
```

## Namespace Groups
A namespace group is like a usage group except that it only takes two parameters.
```coffee
toUse = namespace.group [nameSpaceObject, () -> 'subcontexted function'], { customProperties }
using namespace toUse
```

## Usage Merge
A lets you merge multiple usages into one.
```coffee
toUse = Usage::merge usageOne, usageTwo, usageThree
using toUse
```
> Note that this only works for `Usage` classes
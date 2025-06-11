# Directives
Directives, are special functions that may or may not exist at runtime, they are functions that the compiler looks for and either translates or omits, while making changes to the runtime context.

## Example
For example, let's say we want to enable JSX, we can use the [using](/using) directive to tell the compiler to enable and parse [jsx](/jsx).
```coffee
using JSX
```
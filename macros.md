# Macros
::: warning Warning
Feature is still experimental
:::
Macros, while aren't exactly directives, they are kinda like **decorators in TypeScript**, but with more control.  
You stick them on top of functions (only) and they get a chance to **rewrite or extend** how that thing behaves before the program even runs.

---

## Declaring Macros
To make a macro, mark a function with `@{rew::types::macro}`.  
That tells the compiler: *“this function doesn’t run at runtime, it rewrites code at compile time.”*

It always receives `(name, fn, ...args)` where:
- `name` → the function’s name being wrapped  
- `fn` → the original function definition  
- `...args` → whatever extra stuff you wrote after the macro  

Example:
```coffee
@{rew::types::macro}
function Log(name, fn)
  newFn = function(...args)
    print "[LOG]", name, "called with:", args
    result = fn.call(@, ...args)
    print "[LOG]", name, "returned:", result
    result
  newFn
```
Now Log can wrap any function to print its calls and return values.
::: info NOTICE
Remember to import `macro` form `#std.types`, otherwise you will get an error.
:::


## Using Macros
Let’s say we have a math library:
```coffee
@{Log}
function add(a, b)
  a + b

@{Log}
function mul(a, b)
  a * b
```

Calling them:
```coffee
print add(2, 3)
# [LOG] add called with: [2, 3]
# [LOG] add returned: 5
# 5
```
The macro rewrote both functions to log automatically.
No extra boilerplate — just tag it with `@{Log}`.

If you want to pass extra data, you can put it after the macro name.
The first identifier is always the macro; the rest are passed in as arguments.

```coffee
@{Log, "math", "core"}
function mul(a, b)
  a * b
```
Here:
  - Log is the macro.

  - "math", "core" get passed in as labels.

Output might look like:
```
[LOG] mul called with: [2, 3]
[LOG] mul returned: 6
[EXTRA LABELS] ["math", "core"]
```

### Why This Matters

- Only one macro function runs per declaration (the first one).
- Everything else you list after it becomes extra arguments for that macro.
- This means you don’t “stack” macros, you “parameterize” one macro with other values or helpers.

So if you wrote:
```coffee
@{Validate, Min(1), Max(10)}
function setAge(age)
  ...
```
Then only `Validate` is the macro.
`Min(1)` and `Max(10)` are just arguments passed into it.
`Validate` decides how to use them.
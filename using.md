# Using
The using directive can be used for almost everything, but mainly for two reasons.
  - Telling the compiler to change compilation options
  - Making functions that change other runtime contexts from the current runtime context

## Basic usage
```coffee
function myUsageFunction(ctx, arg1)
  ctx.is_using_something = true

myUsage = Usage::create myUsageFunction

using myUsage, "this will be arg1"

rew::io::out.print is_using_something # true
```

## Public usage
Using items publicly will distribute them to all the modules imported AFTER this line.
```coffee
using public myUsage;
import "./path/to/myfille.coffee" # it will also use myUsage
```
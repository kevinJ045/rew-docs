# Rew Runtime
The rew runtime is just a `deno_core` or just [Deno](deno.land) runtime, it has all the deno features but also a little different.

The rew runtime has strict mode disabled by default, meaning yes speed-- but also freedom++. Having strict mode off gives us access to a lot of js functionalities locked by default, mainly for rew is `with`. And with `with`, we can have cool stuff like `namespaces`. 

So here's the basics about the rew runtime.

## Rew namespace
By default, you have a namespace/variable/object called `rew`. All(or most) rew APIs are in it, even importing/exporting is tailored to it. For example, `print`, `input`, `bla bla bla`...
```coffee
rew::io::out.print "Hello, World!"
```

## Modules
Each file you run/import is known as a "module". And each module can export stuff. Modules are only "virtual" and this is in no way related to js modules. 

You can use import/export just as how you do in js.
```coffee
import "./something";
import { something } from "some.app/entry";

rew::io::out.print something
```

## Module Context
Each module has a context of it's own, where it works independently from other modules. For example, if i import file `a` and `c` inside of file `b`, file `a` won't be accessible from file `b` unless explicitly imported. Which makes sense and is just how other stuff work.

BUT the difference here is the fact that you can manipulate the context with some functionalities to add/modify things in the context.

Here's what the context has by default:
```yaml
rew: RewNamespace
imp: (pathname) => any # dynamic import function
Usage: new (any) => Usage # usage factory
genUid: (length, seed) => string # generates a random UID
randFrom: (min, max, seed) => number # picks random between min and max
pickRandom: (...picks) => typeof picks[*] # picks one random item from the items specified  
pickRandomWithSeed: (seed, ...picks) => typeof picks[*] # seeded pickRandom
module: {
  filename: string # current file name
  app: {
    path: string,
    config: ... # current app config from app.yaml
  }
}
```

## Using namespaces
Yes, `rew::io::out.print` is way too long, but you can shorten it using namespaces as follows:
```coffee
using namespace rew::ns;

print "Hello, world!"
```
Now, you can do a lot of interesting things with rew joined to your context. More about this in [Using Directive](/using)
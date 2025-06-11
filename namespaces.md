# Namespaces
Namespaces, used with [`using`](/using). Can be used to attach an object into the current context, on all future contexts or just a function under it.

## Normal usecase
Normally, you'd want to use the `rew` namespace to not repeatedly include `rew::`
```coffee
using namespace rew::ns;

print "whatever"
```

## Private usecase
When u use private namespaces, the namespace will only be used in a certain function that you have to pass.
```coffee
using private namespace myNamespace, ->
  ...
```

## Public usecase
Using `public` keyword before `namespace` uses it publicly in every file imported after the statement.
```coffee
using public namespace rew::ns;

import "./path/to/something"; # can use rew namespace
```
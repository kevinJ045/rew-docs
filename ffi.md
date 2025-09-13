# FFI in Rew
Rew has a simple but flexible FFI system so you can call functions from shared libraries (.so, .dll, .dylib) right from CoffeeScript. You can define functions, structs, and even wrap callbacks.

Basically, you define a “function map” that describes the types, then open the library and get JS wrappers you can call.

## Basic Usage
```coffee
import "#std.ffi!";

# define a function map
myFunctionMap = instantiate class
  # parameters and return type
  ffi_type(rew::ffi::i32, rew::ffi::i32) add = -> rew::ffi::i32

# open the library and get the JS function
{ add } = rew::ffi::open "/path/to/lib.so", myFunctionMap

# now you can call it like a normal function
result = add(2, 3)
rew::io::out.print result # 5
```
- `rew::ffi::i32, i64, f32, f64, bool, str, pointer, void` etc. are the built-in types you can use.
- The type after `= ->` is the return type.
- You can define multiple functions in the same map.

## Use Cases
You use FFI for when you have a C/rust code to be used in your rew code, for example for things such as UI/Audio/Low Level and alike. Mainly meant to be used with [pointers](/pointers)
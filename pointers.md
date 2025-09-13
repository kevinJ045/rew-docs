# Working with pointers
Rew has some basic support for raw pointers. It’s not C-level crazy, but enough to poke memory, deref stuff, and move data around. You can make pointers to numbers, strings, arrays, structs, etc., then read/write them however you like.

## Making Pointers
```coffee
numPtr = rew::ptr::of(123, "i32")
strPtr = rew::ptr::of("Hello World")
boolPtr = rew::ptr::of(true)
myValue = rew::ptr::of new Int32Array 123
```
- `Numbers`: you can give it a type (i32, f64, etc.) or let it guess.
- `Strings`: automatically UTF-8 encoded and null-terminated.
- `Booleans`: stored as u8 (0 or 1).
- `BigInts`: become BigUint64Array.
- `Manual`: Use an `ArrayBuffer` as your pointer

## Deref
If you just want the thing back:
```coffee
myPtr = rew::ptr::of 42
myValue = rew::ptr::deref(myPtr).as("i32")

rew::io::out.print myValue # 42

strPtr = rew::ptr::of "Rew Rocks!"
rew::io::out.print rew::ptr::string(strPtr) # RewRocks!
# or
rew::io::out.print rew::ptr::deref(strPtr).toString() # RewRocks!
```

## Structs
Structs are where it gets more fun. Define a layout, then pull fields out:
```coffee
person = {
  id: "i32",
  age: "i16",
  name: "string:16"
}

ptr = rew::ptr::of new Uint8Array(24)
data = rew::ptr::readStruct(ptr, person)

rew::io::out.print data
# => { id: 0, age: 0, name: "" }
```

Supported types:
- `i32`, `f32`, etc.
- `string:N` for fixed-size strings
- `str` for C-strings
- Nested struct objects


## Misc functions
- `ptr.val(ptr)` → gives you the raw address number
- `ptr.view(ptr)` → low-level memory view
- `ptr.buff(ptr, len) / ptr.toBytes(ptr, len)` → turn memory into buffers/Uint8Arrays
- `ptr.sizeOf(type)` → how big a type is in bytes
- `ptr.fn(params, result, cb)` → wrap functions as native callbacks

## Syntaxes
You don’t have to call `rew::ptr::of` everywhere. Rew has pointer operators built-in:

- `&` → make a pointer
- `*` → dereference
- `^` → “to bytes” (mainly for strings)

```coffee
myNumber = &1
myString = &"hello"
myBool   = &true

# typed
myNumberTyped = &(1, "i32")

# you can also wrap expressions
myComplexPointer = &(
  something ? "" : 1
)

# ^ turns strings into byte arrays
strBytes = ^"To Bytes\0"
strBytesComplex = ^("To Bytes\0")

byteArrayPtr = &strBytes

# deref with *
rew::io::out.print *myNumber
rew::io::out.print *myString
rew::io::out.print *myBool
rew::io::out.print *(byteArrayPtr).toString()
```
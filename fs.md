# Files
`#std.fs`

## Example
```coffee
rew::fs::read './path/to/file.txt'

# with rew namespace it gets unwrapped.
using namespace rew::ns;
read './path/to/file.txt'
exists './path/to/place'
mkdir '...'
readdir '...'
```

## Class Def
```coffee
read(string, { binary: boolean ]}) -> Uint8Array | string
open(string, options: Object) -> Writable | Readable
async write(path: string, content: string | Uint8Array, { binary: boolean, create_dirs: boolean }) -> void
sha(string) -> sha # the sha
exists(string) -> boolean
async rm(string, recursive: boolean) -> void
stats(string) -> Object
async mkdir(string, recursive: boolean) -> void
readdir(path) -> void
copy(string, string) -> void
rename(string, string) -> void
isDirectory(string) -> boolean
isFile(string) -> boolean
```
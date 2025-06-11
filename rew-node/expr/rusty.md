# Rusty Rew
<code><img style="display: inline-block; margin-bottom: -7.5px; margin-right: 5px;" src="../../assets/logo.png" alt="Logo" width="22"> **Rew**</code> is being remade with <code><img style="display: inline-block; margin-bottom: -3.5px; margin-right: -5px;" src="../../assets/rust.png" alt="Logo" width="22"> rust</code>. The transition was only a matter of time, but this would change the whole focus of rew as a runtime.

## Why Rust?
By now, it's fair to assume you're aware of rust, it's one of the most powerful programming languages out there. It comes with a feature at almost all corners and is generally a good language. 

The true reason behind the recreation of rew with rust is to give rew a new purpose. 

## Rew's future
So far, rew has been just another npm package with no purpose to serve. Not an independent language on it's own, nor is it powerful enough to be. It was mostly utilities on top of nodejs with poor architecture and messy code.

But-- Now, i want rew to be something actually usable. Hence; the new rew: where rust touches the remnants of the past; `coffeescript`.

Basically, I am gonna make it so you can connect rust code with coffeescript/rew to create basically anything. 

## History and the cause
I like making desktop apps. Not only that they serve a lot of purpose but they also run independently on your machine. A luxury we're losing as web technology evolves.

But as i made apps with rust, it became a hard job to maintain them. Simply put you would have to:
    - Make a windows executable
    - Make a linux static executable
    - Release for AUR
    - Release for `nixpkgs`
    - Release for debian in however way you can
    - Release for .deb, .rpm and .zst
    - Release on flathub if possible
    - Release for `nixpkgs` with something like `home-manager` if you want your nix users satisfied (i am a nix user this is a must)
    - Global linux portable release
    - Global appimage release 

After looking at all that, it became hard for a knucklehead like me not only to get approved by all these repositories that your app is worth being in their list but also maintaining that. To add that you're probably alone if you're a solo dev like me.

To add salt to injury, rust is by no means an easy language. Sometimes my carelessness leads to segfaults which forces me to go over and debug the whole code to see where it happens. I can never hate rust, but it's a double edged sword.

## Main point
Imagine using the power of rust, with a simple code and a simple package manager that requires too little work to release? Well that's the main goal with new rew.

## Progress check
As of now, main rew has already been ported over. it compiles basic coffeescript with extra rew syntaxes and executes it. But there's still a lot more to be done.

| Feature            | Possible     | Progress       | Level   |
|--------------------|---------------|----------------|---------|
| Node.js Support    | ❌ No         | ❌ Not Started  | —       |
| FFI                | ✅ Yes        | ✅ Done         | Low     |
| Module Resolution  | ✅ Yes        | 🔄 In Progress  | High    |
| App Management     | ✅ Yes        | 🔄 In Progress  | High    |
| Bundling           | ✅ Yes        | ❌ Not Started  | —       |
| STDLIB             | ✅ Yes        | 🔄 In Progress  | Low     |
| JSX                | ✅ Yes        | ❌ Not Started  | —       |
| Qrew               | ✅ Yes        | ❌ Not Started  | —       |
| Secrets            | ✅ Yes        | ❌ Not Started  | —       |
| Rune               | ✅ Yes        | ❌ Not Started  | —       |
| Web                | ✅ Yes        | ❌ Not Started  | —       |
| Serve              | ✅ Yes        | ❌ Not Started  | —       |
| Conf               | ✅ Yes        | 🔄 In Progress  | Low     |


## Architectures
There are a few methods i wanna follow when remaking rew with rust. 

### File Stack
Let's say there's a huge file stack that loads in files into it and keeps them in check, where you manage your files and replace them dynamically if ever needed. That's the main component of the new runtime.

### Mounter
#### (not called that in code)
For the sake of communication, let's call "loading" a script as mounting. Let's say mounting includes: `loading`, `scanning`, `compiling`, `attaching`. 
-   **`loading`:**
    -   This stage is where your first initial file is loaded, it is just reading a file from the path to a string.
-   **`scanning`:**
    -   At this stage, the loaded file is scanned for files it requires. Then the loader get's into the game and loads the files required and scans them too.
-   **`compiling`:**
    -   After the scanning, based on priority it compiles each file that was scanned
-   **`attaching`:**
    -   Finally, the compiled file is attached to the [File Stack](#file-stack) and kept in check

It might seem complicated when i call it `Mounter` but i hope these 4 steps clear all the confusion.

Now, our file is filled with files. And a structure that would resemble this:
```
{
  "/main.coffee": "compiled_code",
  "/utils.coffee": "compiled_code"
}
```

### Module manager
Now that we have a proper file system, we need a proper way to execute them and help them interact with each other. 

This structure assures that the files remain modular and replacable in case of change for future hmr support.

```
Modules["/main.coffee"] = function(options) { return whatever_exported_from_main }
Modules["/utils.coffee"] = function(options) { return whatever_exported_from_utils }
```

### Why this structure instead of js modules?
Simple answer: Compilation. Yes; Having everything in one file means it could be slower, but it also would mean your one single file could be compiled, bundled and in the end executed as a singular file. This means you can attach that single file to a rew binary and make your rew app into a binary bound app.

Another reason: hmr. Having hmr would mean you can change your code and see the changes in real time. This is a must for any app that requires real time changes. For example: GUI apps.

### V8 Optimization cancelling
#### (assuming you know a little bit about the core of js)
With `"use strict"` any js code would be optimized by v8. But with this structure, it would be hard to optimize the code. So, we would have to cancel the optimization. This would mean that the code would be slower, but it would be more flexible. 

The main reasons why `"use strict"` or **strict mode** is not used in the main code because of:
-   **Namespaces and function callers:**
    -   This is a significant part of rew. Not forcing the base code over any namespace like how web js forces you to the `DOM` by default or nodejs forces you to another means you just got a bunch of bloated functions that don't need exist in your main namespace.

    -   That's why with rew, namespaces are important. But while getting namespaces to work, we lose the ability to optimize the code hence with namespaces we are giving free access to repeated and uncontrolled object access- meaning no v8 optimizations
-   **Freedom of true js:**
    -   JS is a sandbox environment, and will always be. No way around it. But **strict mode** sandboxes it even harder. 

    -   While JS doesn't need all of those "forbidden" functionalities locked by **strict mode**. Sometimes, you might find yourself scratching your head trying to do something that is possible but not allowed.

In the mean time, i will try to actually get v8 optimizations over free namespace access to work while still maintaining namespaces and function callers.

### About the runtime environment
The currently going project uses [`deno_core`](https://crates.io/crates/deno_core) which is just the root of the javascript runtime [`Deno`](https://github.com/denoland/). 

`deno_core` is a really easy to use crate that really makes it easy to do anything with js.

### FFI
My favorite part of all of this. FFI(Foreign Function Interface) is basically just including functions from something like `C` for example in your code from other languages.

In my case, i used `deno_ffi` since it had a few things that could help without rewriting the whole extension with something `libloading` in rust.

Here is the current structure:
```coffee
import "#std.ffi!"

using namespace rew::ffi;
using namespace rew::ptr;

myLib = ffi::open "/path/to/lib", instantiate class
  ffi_type(ffi::ptr, ffi:ptr) add_string: -> ffi:pre ffi:ptr, ptr::to_string
  ffi_type(ffi::i32, ffi:i32) add_number: -> ffi:pre ffi:i32, parseInt

print myLib.add_number(1, 2)
print myLib.add_string(
  ptr::of("Hello "),
  ptr::of("World")
)
```
::: details More
This basically just opens a C library and then uses it to "add_number" and "add_string"
:::

## Support for nodejs
Support for nodejs is one of the things that i can't wrap my head around. I thought of adding it, but then it would mean i would be making the whole environment yet another nodejs environment with less support for nodejs.

Besides, the fact that adding nodejs support could potentially break the current system should not be ignored-

So, for now, i won't be making support for nodejs. Rew will have it's own module resolution, and and it's own library management away from nodejs. but that doesn't mean it will lack in functionality, but it WILL lose on the nodejs environment side- 

I might however, sooner or later, add a support for nodejs through workarounds and other fuckery maybe even through ffi. But for now, it won't have nodejs support.

## Help and support
If you like the idea, and would like to either see the code or even contribute, Here is the [github](https://github.com/kevinj045/rew-rust). Otherwise, if you have any questions or want feature additions/have better ideas. Feel free to reach out.
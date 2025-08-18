# Rew Building
Building in `rew` is only possible with `pimmy`. As it gives a lot of utility for package management without affecting the size or performance of rew.

To build a simple file from `coffee` to `brew`, you can do so with `rew`:
```bash
rew brew input.coffee output.brew
```

## What is a `brew` file?
A brew file is just a bundle of all modules in an app, with externals unbundled. .brew files have a built in support to run as entries, be imported/exported, or just ran.

## Building with pimmy
To build with pimmmy, you need a `build` field in your `app.yaml`. 
```yaml
build:
  - input: entry.coffee
    output: output.brew
    using: brew
    cleanup: entry.coffee
  - input: another.coffee
    output: another.brew
    using: brew
    cleanup:
      - another.coffee
      - somefolder
```
**Explanation**:
So, basically you take an input from your app root `entry.coffee`, and build it to output `output.brew` at the root of your app. This uses `brew` to build, then after it finishes, it deletes `entry.coffee`.

## Pimmy Builders
As of now, pimmy only supports two builders, `brew` and `qrew`. `qrew` is a binary executable that uses a `brew` file to render your `brew` to an executable `qrew` that runs without needing to install `rew`.

To use builders, just add a `using: BUILDER_NAME` in your build entry.

## Custom Builders
To add custom builders, you need to register `cakes` field in your `app.yaml` as so:
```yaml
cakes:
  - _build.coffee
```
And from your cake file, you just need to export `builders`, as so:
```coffee
builders = {}

builders.demo_builder = (app_path, config, input, output) ->
  rew::io::out.print app_path, config, input, output

export { builders }
```

Now to use this, just add a `using: demo_builder` to your entry to test it out.

::: details More about cakes
You can use cakes as preinstall scripts too
:::
::: details Why cakes
I called them cakes to stay true to the original coffeescript `cakefile` concept.
:::

## Prefetch URLs
Before build starts, you can `prefetch` a set of URLs and add output them to a file into the current app.
```yaml
prefetch:
  - url: https://example.com/path/to/file
    output: .artifacts/file
  # you can also use the file+ schema here
  - url: file+.+sha(SHA-AAA)+https://example.com/path/to/file-with-sha
    output: file.with.sha
  # platform specific
  - url: https://example.com/path/to/file-for-unix
    system: unix # unix|linux|macos|windows|...
    output: file.for.unix
```
### Using unarchiver with prefetch
You can download and extract archives with:
```yaml
prefetch:
  - url: file+zip+sha(SHA)+https://example.com/path/to/file.zip
    output: file.zip
    extract: output_folder
    # If this is an app, you can do this to build it:
    build: true
```

## Cargo Crates
You can build cargo crates in your app, this whole process simplifies the use of [FFI](/ffi) in your app. To register crates all you need to do is add `crates` field in your `app.yaml` as follows:
```yaml
crates:
  - name: demo_crate
    path: ./demo_crate
    build: true
    files:
      - input: ./demo_crate/target/release/libdemo_crate.dll
        output: .artifacts/libdemo_crate.dll
        system: windows
        # Fallback prefetches are prefetch entries that
        # are only applied when cargo is not found
        fallback_prefetch:
          url: https://example.com/files/libdemo_crate.dll
          output: .artifacts/libdemo_crate.dll
      - input: ./demo_crate/target/release/libdemo_crate.so
        output: .artifacts/libdemo_crate.so
        system: unix
    cleanup: ./demo_crate
    # You can also use fallback prefetches here, but here it should be an array
    fallback_prefetch:
      - url: https://example.com/files/libdemo_crate.dll
        output: .artifacts/libdemo_crate.dll
```

### Crate triggers
If you want a crate to build let's say for example after `main.brew` has been built, you can do this:
```yaml
crates:
  - name: demo_crate
    path: ./demo_crate
    build: true
    trigger: my_trigger_id
build:
  - input: main.coffee
    output: main.brew
    id: my_trigger_id
```

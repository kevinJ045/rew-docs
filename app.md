# Rew app
A `rew` app is the project structure, along with the app's requirements and the app's information.

Every app has to have a package name, like `app.package.name`, and that's how you create your app.

Once an app is made, it's package name along with the entry file is put in the `app.yaml` file at the
root of the project.

## App Config
The app config, `app.yaml`, holds information about you app, like the entry file which is the file to export/run the app.

Example:
```yaml
---
package: example.package
entry: main.coffee
---
```

## Running an app
When running apps, you can either put the path to the root of the app, or the package name(only if installed).
```bash
rew run .
```

## Installing an app
To install a package, you can use the built in [package manager](/pacman.html), you can either specify the `app root path`, the `github repo`, or the repo id. Installed apps are put in the [conf](/conf.html) [root](/conf.html#Root).

This is how you install paths:
```bash
rew install .
```
> Keep in mind that you should be in the root of your app for this to work.
More about this in the [package manager](/pacman.html)

## Usin' `qrew` Binary in apps
[Qrew](/qrew.html) binaries can be quite confusing to work with when it comes to publishing apps, Here's how.

## `qrew` as entry in configs
In your `app.yaml`, you can put the following data to tell the runner to run `main.qrew` instead of `main.coffee`:
```yaml
# app.yaml
---
package: example.package
entry: main.qrew
---
```
Now when you run your app, you might run into errors saying **main.qrew not found**, so you can use the `--dev` flag to run an app but change the `.qrew` entry file to `.coffee`, here's how:
```bash
rew run . --dev
```

## Building `qrew` on run
If you want to build and run instead, you can use the `--dev --build` flag instead. Here's how:
```bash
rew run . --dev --build
```

## Translating to `js`
If you want to build and run, but to a `js` format, you can add the `--translate` flag instead. Here's how:
```bash
rew run . --dev --build --translate
```
More about translating [here](/build.html#translate-to-js)

## Building on install
You might want to build your code and install for security purposes, so you can put your build options in your `app.yaml` to make it build on install
```yaml
---
package: example.package
entry: main.qrew
install:
  build:
    file: main.coffee
    remove: true
    # Other build options
---
```

## Running installed apps
To run installed apps, you can do as follows:
```bash
rew run example.package
```
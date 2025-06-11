# Rew app
A `rew` app is the project structure, along with the app's requirements and the app's information.

Every app has to have a package name, like `app.package.name`, and that's how you create your app.

Once an app is made, it's package name along with the entry file is put in the `app.yaml` file at the
root of the project.

## App Config
The app config, `app.yaml`, holds information about you app, like the entry file which is the file to export/run the app.

Example:
```yaml
manifest:
  package: example.package
entries:
  main: main.coffee
```

## Running an app
When running apps, you can either put the path to the root of the app, or the package name(only if installed).
```bash
rew run .
```

## App Entries
Your app has an entry of `main.coffee` by default, and it uses that entry for everything, but you can change that or add other entries
```yaml
manifest:
  package: example.package
entries:
  main: main.coffee
  test: test.coffee
  lib: lib/lib.coffee
```

## Running other entries
When you run an app, by default the entry name it runs is `entries.main`. so instead you can add another entry and run it with the `--entry` flag, or just '-e'.
```bash
rew run . --entry test # It will run exec.test
```

## Installing an app
To install a package, you can use [pimmy](/pacman.html) the package manager for rew, you can either specify the `app root path`, the `github repo`, or the repo id. Installed apps are put in the [root](/conf.html#Root).

This is how you install paths:
```bash
pimmy -Aa .
```
> Keep in mind that you should be in the root of your app for this to work.
More about this in the [package manager](/pacman.html)

## Running installed apps
To run installed apps, you can do as follows:
```bash
rew run example.package
```
You can use the `-e` flag here too

## App dependencies
When apps are installed, to hook pimmy to install dependencies, you can add a `dependencies` field to your app.yaml like so:
```yaml
manifest:
  package: example.package
entries:
  main: main.coffee
dependencies:
  - "@rewpkgs/my.dependency.app"
  - github:someone/dependency
```
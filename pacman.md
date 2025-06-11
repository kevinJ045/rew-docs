# Rew's Package Manager
[Pimmy](https://github.com/kevinj045/rew.pimmy) is a simple package manager made in rew for rew. It does a few things to help you manage your rew apps such as: building, installing and uh- that's it.

So to use pimmy, you first have to:
```bash
git clone https://kevinj045/rew.pimmy # or download source code
rew run main.coffee -- -Ab .
rew run main.coffee -- -Aa .
```
::: details Requirements
You will need `cargo` so that you can build the crates in pimmy.
:::
When that is done, pimmy will tell you to add the rew bin path to your `PATH`. If you want executables to work, you have to pass this step.

Once that is all done, You can just run pimmy as:
```bash
pimmy --version
```
A simple test to see if pimmy is available and working.

## Pimmy majors
Pimmy has 5 majors (only two work currently).
- Repo
- App
- Types (upcoming)
- Caches (upcoming)
- Artifacts (upcoming)
Majors are the subjects in which pimmy acts as/on. You'll understand this as we go on.

## Pimmy actions
There are various actions in pimmy, such as `build`, `add`, `remove`, `bla bla bla`. And each action should be wrapped by a mode so that the action knows what to work with. Actions are also known as **minors**.

For example, let's say you wanna install an app. You just have to do:
```bash
pimmy -Aa @rewpkgs/app.package.name
```
**Explanation**: The `-A` basically tells it to go to app mode, and the `-a` is short for add. If we extracted this it would be more like:
```bash
pimmy --app @rewpkgs/app.package.name --add
```
I hope that makes sense.

## Pimmy minors
So, now that you know all actions, let's see how many actions there are:
```bash
-S or --sync   ---- To synchronize the specified object(like app or repo or whatever)
-a or --add    ---- To add stuff
-b or --build  ---- To build (only works with apps)
-c or --cache  ---- To cache an app
  -- Caching basically copies your app away to a cache entry and
     builds it there so all the build artifacts and alike won't be
     in your dev environment.
-r or --remove ---- To remove stuff
-l or --list   ---- To list stuff
-N or --new    ---- New project
```

## Other minors
These minors are simply just helpers for actions, like `verbose` and such.
```bash
-s or --safe     ---- Safe mode, which means no cleanups on builds and alike
-g or --git      ---- Only for creating new projects, use git or not
-t or --types    ---- Only for creating new projects, use types or not
-i or --ignore   ---- Only for creating new projects, do not input
```

## Examples.
Here's how you'd normally start pimmy
### Synchronizing Repositories
```bash
pimmy -SR # synchronizes all the repositories
pimmy -SR rewpkgs # synchronizes only rewpkgs
```

### Installing apps
```bash
pimmy -Aa @rewpkgs/package.name
pimmy -Aa github:username/mygithubrepo
pimmy -Aa github:username/mygithubrepo@branch
pimmy -Aa github:username/mygithubrepo@branch#commit
pimmy -Aa file+zip+sha(SHA-256-sum)+https://example.com/path/to/file.zip
pimmy -Aa /path/to/folder
# all of these are just ways to "ADD" apps
# to actually add apps 
```

### Upgrade/Install apps
```bash
pimmy -AS @rewpkgs/package.name
```

### Remove apps
```bash
pimmy -Ar package.name
```

### Building your current app
```bash
pimmy -Ab /path/to/app
```
Keep in mind that this will clean up files and you might not want that, so you can simply do this:
```bash
pimmy -Abs /path/to/app # enabled safe mode. no clean ups.
```
More about this at [Building](/building).

### Others
More sub-commands are coming soon, to support:
- Cache management
- Type management for typescript
- Artifact management
- Building methods

## App install hooks
You can put install hooks for `pimmy` to modify your app on install.

### Build
This is important and maybe required if you want pimmy to build your app on install. you can add it to your `app.yaml` as such:
```yaml
install:
  build: true
```

### Bin
The `bin` option lets you make executables at the rew bin path(which pimmy will tell you) so that you can use them or call them as commands or whatever.
```yaml
entries:
  # you should add this for windows
  pimmy: pimmy.qrew
install:
  ...
  bin:
    pimmy: pimmy.qrew
```

### preinstall and postinstall
You can add preinstall and postinstall scripts for when your app is installed. Add the like so:
```yaml
install:
  ...
  preinstall:
    - myscript.coffee
  postinstall:
    - myscript.coffee
  # optional but you can also use
  cleanup:
    - myscript.coffee
    - path/to/dir
```
# Rew's Package Manager
Rew has a built-in package manager (starting from 0.0.64). You can use it to basically install/build/uninstall/stuff your apps/packages.


## Examples.
Here's how you'd normally start pimmy
### Synchronizing Repositories
```bash
rew repo rewpkgs -s
```

### Installing apps
```bash
rew app -a @rewpkgs/package.name
rew app -a github:username/mygithubrepo
rew app -a github:username/mygithubrepo@branch
rew app -a github:username/mygithubrepo@branch#commit
rew app -a file+zip+sha(SHA-256-sum)+https://example.com/path/to/file.zip
rew app -a /path/to/folder
# all of these are just ways to "ADD" apps
```

### Remove apps
```bash
rew app -r package.name
```

### Building your current app
```bash
rew build /path/to/app
```
Keep in mind that this will clean up files and you might not want that, so you can simply do this:
```bash
rew build /path/to/app -s # enabled safe mode. no clean ups.
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
  preinstall: |
    rew run myscript.coffee
  postinstall: |
    rew run myscript.coffee
  # optional but you can also use
  cleanup:
    - myscript.coffee
    - path/to/dir
```

## Github Sources
You can fetch github repos and resolve/build them and install the result as apps. To do that, here is the format of the github urls you have to put:
```bash
# normal
github:username/repo
# selective branch
github:username/repo@branch
# selective branch with commit
github:username/repo@branch#commit
# Commit pinning with default branch
github:username/repo@main#commit
```
### Usage:
```bash
rew app -a github:username/repo
```
::: details Usecases
You can put it raw like this, or you can put this as a [repo](#repos) url too. 
:::

## `file+` schema
If your app has been archived anywhere as an archive, you can use the `file+` schema to download, unarchive and build + install them.

Here is how you would use the schema:
```bash
file+unarchiver+https://some_url_here
```
Where `unarchiver` can be:
  -   **zip**
  -   **tar**
  -   **tar_gz**
  -   **tar_xz**
  -   **tar_bz2**
  -   **tar_zst**
  -   **rar**
  -   **sevenz**
  -   **.**: to ignore unarchiver

### Using `sha256` with the schema
To add a sha256 you can simply add a `sha(THE-SHA)` after the `unarchiver`.
```bash
file+zip+sha(some-sha)+https://my-url.com/file.zip
```


## Repos
If you want to create your own repo, you can use a yaml format, and this is it's structure:
```yaml
name: repo_name
packages:
  example.name: github:myUserName/MyRewApp 
  another.example: file+zip+https://example.com/example.zip
```
You can also import other files in your repo, just so you can separate between packages.
```yaml
name: repo_name
imports:
  - https://somesite.io/myrepo.yaml
  - ./myrepo.yaml
packages:
  example.name: github:myUserName/MyRewApp
```

### Repo package structure
A package could have either just a straight `url`(either github or `file+` schema only) or could have more properties like such:
```yaml
packages:
  my.package.name: github:myUserName/MyRewApp
  my.other.package:
    url: file+zip+https://example.com/example.zip
    readme: https://example.com/readme.md
    description: bla bla bla
    version: 0.0.1
    tags: [
      a
      b
      c
      d
      e
    ]
```

### Adding/Removing repos
You can add/remove repos to pimmy with:
```bash
# add/overwrite
rew repo -a repo_name //website.com/path/to/repo.yaml
# remove
rew repo -r other_repo
```
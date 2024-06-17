# Rew Package/App Manager
**Rew** comes with a default package manager used to install/uninstall apps.

## Basic install
To install an app from a local project clone, you can do this:
```bash
rew install .
```
It will ask you for prompt if you want to install it or not.

## Install from [Github](https://github.com)
So, if you want, you can put your app in github, and then use the `git` command along with the `npm` command to `clone` and `npm i` to setup the project and install it.
```bash
rew install github:username/repo
```
This will look for the repo and conig it locally in a temporary folder before it installs it.
### Specific branch
To select a branch, you can use `@branch-name`.
```bash
rew install github:username/repo@branch-name
```
### Pinning packages
To pin a specific commit, you can use `#sha-AAAA`
```bash
rew install github:username/repo#ea543e11e34abbb7d0aeafe64ee99f441e282cfa
```
If you want to pin a commit with a specific branch:
```bash
rew install github:username/repo@branch-name#ea543e11e34abbb7d0aeafe64ee99f441e282cfa
```

## Repos
Repos are basically json/yaml collections of package urls, to make it easy to look for packages and install them too.

Rew comes with [this](https://github.com/kevinJ045/rewpkgs/blob/main/main.yaml) repo by default.

## Install from Repo
To install from a repo, you must first make sure to add the repo to your repo list at your default [conf](/conf.html).

First look at all your repos with:
```bash
rew repo view
```

To add a repo, you can:
```bash
rew repo add repoid https://URL-to-repo-json-or-yaml
```

To change a repo url:
```bash
rew repo set repoid https://URL-to-repo-json-or-yaml
```

To get a repo url:
```bash
rew repo get repoid
```

To view all packages in a repo:
```bash
rew repo view repoid
```

To delete a repo:
```bash
rew repo delete repoid
```

## Repo structure
If you want to create your own repo, you can use either a json or a yaml format, and this is it's structure:
```yaml
---
name: Repo Name
packages:
  example.name: github:myUserName/MyRewApp 
---
```
You can also import other files in your repo, just so you can separate between packages.
```yaml
---
name: Repo Name
include:
  - https://somesite.io/myrepo.yaml
  - ./myrepo.yaml
  - ./something.json
packages:
  example.name: github:myUserName/MyRewApp 
---
```

## Install triggers
Install triggers are what run after you have installed an app

## Build Install Trigger
If you have made your app open-source, and you want to probably [build](/build.html) it to [qrew](/qrew.html) for security, you can use the `install.build` trigger in your [app config](/app.html#app-config) like below:
```yaml
package: example.package
entry: main.qrew
install:
  build:
    file: main.coffee
    remove: true # remove flag to remove source codes on build
```

## Command Install Trigger
If you want to run some custom commands after install, you can use the `install.commands` trigger like below:
```yaml
install:
  commands: 
    # $installPath will be resolved to the root of the app
    - echo Installed at $installPath
```

## Run file Trigger
If you want to run a script in your app after install, you can use the `install.file` trigger, like below:
```yaml
install:
  file: ./post-install.coffee
```

## Requirements Trigger
To install other apps as requirements, you can use the `install.requirements` trigger, like below:
```yaml
install:
  requirements: [
    '@rewpkgs/my.app.package',
    'github:username/repo'
  ]
```

## Uninstalling apps
When you uninstall apps, you can either uninstall the app and keep it's config(like databases and such) or remove it entirely.

To remove app only:
```bash
rew uninstall example.package
```

To remove everything:
```bash
rew uninstall example.package --all
```

## Rew package manager website
The [Rew Package Manager website](https://kevinj045.github.io/rewpkgs/) offers tools to search for packages within repositories and provides installation instructions.

You first need to add a repository if it's not in the list and then `sync` to download all the package information, once done you can search for packages.

Explore it here: [Open Rew Package Manager](https://kevinj045.github.io/rewpkgs/)

## Submitting packages
To submit to `rewpkgs` which is the official rew repository, all you need to do is to fork [the rewpkgs repo](https://github.com/kevinj045/rewpkgs/) and then add your package and the github repository of the package to either the `main.yaml` or any yaml/json file with the [structure shown above](#repo-structure) and submit a pull request.
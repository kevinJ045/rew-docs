# Rew Conf
The `rew` conf module is the root structure of `rew`, it not only manages the local data for `rew`, like [repos](/pacman.html#repos), but it also stores your installed apps and all data for each app.

## Root
The `conf` root is the path where all your `conf` data is put, it is located at `~/.local/share/rew`, and every app you install and it's settings along with it's database is put there.

## Managing the `conf`
The built in `conf` command helps manage your `conf`.

Listing/Getting:
```bash
rew conf get [packagename]/[?folder]
```

Setting/Removing:
```bash
rew conf remove|set [packagename]/[?folder]
```

## Conf Api
You can use the `conf` module in your code by importing the `conf` module.

Example:
```coffee
conf = imp 'conf'
# when you import this,
# you automatically create a config center
# at the rew root

# this just puts this at _default.yaml
conf.set 'mySetting', 'myValue'

# this creates a animations.yaml, with the
# default value of the second argument
animations = conf.optionCenter 'animations',
  enable: true,
  speed: '1x',
  easing: 'linear'

print 'speed is', animations.get 'speed'

# You can also create static files
# and store it at your conf
conf.staticFile 'path/to/staticFile.txt'
	# When you write, you can even pass
	# buffers
	# if you pass true in the end here, you will
	# only write this if the file doesn't exist
	.write 'this is the default value', true
	.read()
	# returns a buffer, unless you pass a string
	# to the read function.
	# returns a json if you pass an empty object
```
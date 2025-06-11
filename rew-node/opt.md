# Rew Runtime Options
You can set the runtime options straight from your code, like filename resolutions, context privacy, use the native require, etc... all using the `opt`


## Option `sharedContext`
Allows/Disallows sharing contexts between parents and imported children
```coffee
opt.set 'sharedContext', false
```

## Option `resolveExtensions`
Allows/Disallows sharing contexts between parents and imported children
```coffee
opt.push 'resolveExtensions', '.jsx'
opt.push 'resolveExtensions', ext: '.tsx', options: { assertion: 'still possible' }
```

## Option `jsx` and `jsxPragma`
- The `jsx` option lets you enable jsx for all the files imported after it has been declared
- The `jsxPragma` option lets you use your own `createElement` when the jsx is transpiled.
```coffee
opt.set 'jsx', on
opt.set 'jsxPragma', 'myCreateElementFunction`
```


## Access to `opt` 
Only the main module(the file you ran with `rew`) gets access to `opt`, but other imports with the
access from the main using the `as: 'main'` can also get access to `opt`.
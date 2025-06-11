# Building
You can build `rew` `.coffee` files into either a [qrew](/qrew.html) or just translate it into `js`. 

## Building to [qrew](/qrew.html)
```bash
rew build ./path/to/file.coffee
```

## Translating to `js`
```bash
rew build ./path/to/file.coffee --translate
```

## Single Build
Single building means to not build every single file imported in the target file.
```bash
rew build ./path/to/file.coffee --single
```

## Removing code files
You can optionally remove files after building them.
```bash
rew build ./path/to/file.coffee --remove
```

## Outputting to a certain directory
You can output the build files into a new directory to separate your source and your binaries
```bash
rew build ./path/to/file.coffee --output ./path/to/output
```
# Rogue rew files
You can run `rogue` rew files, which are files without an app, basically how you would run a rew file, but the difference is they won't have access to some core utilities. and won't be able to be imported once built to [qrew](/qrew.html).

## Running rogue files
```bash
rew ./file.rew
```

## Building rogue files
You can [single build](/build.html#single-build) your rogue file to compile it to either a [qrew](/qrew.html) or [translate to js](/build.html#translate-to-js).
```bash
rew build ./file.rew --single
```
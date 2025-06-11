# Core APIs
Rew core APIs include the following.

## `io`
`rew:io` is a simple io module that has `STDIN`, `STDOUT` and `STDERR`.

**Example**:
```coffee
rew::io::out.print "Hello"
```

**Class Def**:
```typescript
io: {
  out: Stdout extends Writable & {
    print: (...any[]) => void,
    printf: (string) => void,
    err: (error) => void
  },
  in: Stdin extends Writable & {
    input: (string) => string
  },
  err: Stderr extends Writable
}
```

## `channel`
`rew::channel` is basically just a fancy `setTimeout` and `setInterval`.
```coffee
rew::channel::new ->
  if something
    @stop()

interval_time = 1000
rew::channel::new interval_time, ->
  if something
    @stop()

t = rew::channel::timeout 1000, ->
  ...

i = rew::channel::interval 1000, ->
  ...

rew::channel::timeoutClear t
rew::channel::intervalClear i
```


## `env`
`rew::env` is how you would manage environment variables. nothing else special about it.
```coffee
rew::env::get('KEY')

rew::env::set('KEY', 'VALUE')

rew::env::has('KEY')

rew::env::keys()

rew::env::env # all env vars
```

## `process`
`rew::process` is exactly what you would expect it to be. Just a manager for the current process.
```coffee
rew::process::pid # PID
rew::process::ppid # PPID
rew::process::cwd # current working dir
rew::process::args # argv
rew::process::onExit -> {...} # function on exit to prevent exiting or something idk
rew::process::exit(code) # exit the current process
```

## Others
Every other std module has to be imported through either `#std.blablabla` or to import all `#std`
```coffee
import "#std.fs";
import "#std!";
```
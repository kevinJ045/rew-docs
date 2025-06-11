# Module `shell`
This built module is an easy access to the node's `child_process` module.

```coffee
exec 'echo hi'

exec.background 'long-task-command', () -> # when done
```
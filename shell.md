# Shell
`#std.shell`

## Example
```coffee
using namespace rew::ns;
myChild = shell::spawn 'my-command my-arg' # or rew::shell;
{ stdout } = await shell::wait(myChild)

# does it sync, same stdout
shell::exec 'my-command my-arg'
# async but quicker, piped
await shell::fexec 'my-command my-arg'
```
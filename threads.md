# Threads
`#std.threads` is a module that can be used to yk do things in other threads.

## Example
```coffee
import "#std.threads";

myWorker = rew::threads::create ->
  total = 0
  
  onmessage (data) ->
    postMessage({ my_data: "My Value", ...data })

myWorker.onmessage (event) ->
  print "Message from worker:", event.data

myWorker.postMessage { somedata: "some value" }

rew::io::out.print "Active threads:", rew::threads::list().length

rew::channel::timeout 3000, ->
  print "Terminating the worker..."
  myWorker.terminate()
```
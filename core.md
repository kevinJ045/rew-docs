# Rew Core
Rew comes with a standard library of built in functions, most core functions are functions you would use more frequently.

## `print`
A simple STDOUT.
```coffee
print 'something'

i = 'Bla Bla'
print "Bla #{i}"

printf "The same line" # prints out without a line break
```

## `struct`
A simple structure manager.
```coffee
file = struct name: '', content: '', length: 0

myTextFile = file name: 'myfile'

print myTextFile
```

## `future`
A simple promise manager.
```coffee
longTask = future (resolve, reject) -> ### long task here ###
  .pipe (data) -> print data # As a promise.then
  .last (data) -> print data # As a promise.finally
  .catch (data) -> print data # As a promise.catch
  .sync() # synchronizes the promise without awaiting
  .sync (promise) -> promise.then (result) -> result + 'something'
  # synchronizes the promise and gives you the promise to play around with

otherTask = await longTask.wait() # To await

# to resolve later externally
longTask.resolve "customData"
```

## `curl`
A simple `fetch` replacement. Returns a future.
```coffee
response = wait curl 'http://example.com'
print wait response.text() # Response.text() => string

curl url: 'http://example.com/text', text: true # auto string
curl url: 'http://example.com/json', json: true # auto json
curl url: 'http://example.com/file', o: realpath './some.file' # Outputs the response buffer to the path
```

## `emitter`
A simple event target.
```coffee
target = emitter()
target.on 'something', (data) -> print data
tatget.emit 'something', 'Data'

target.on ['something', 'anotherthing'], (data) -> ...
```

## `sleep`
A simple waiter for the parent thread.
```coffee
print 'Waiting...'
await sleep 1000
print 'Done!'
```

## `match`
A simple switch statement.
```coffee
myString = 'Hello!'

match myString,
  # Matches what the value is calls the match
  'Hello!': () -> print 'Hey!!'
  'Hi!': () -> print '...hey?'
```
### `match` with  `struct`
When using match with values that are not strings, we have to use maps, or arrays mapped like this:
```coffee
myStruct = struct foo: 'bar'

myInstance = myStruct foo: 'not bar'

match myInstance, [
  [myStruct, () -> print 'myInstance is an instance of myStruct']
]
```

### `match` with `map`
```coffee{5}
class myClass

myInstance = new myClass

match myInstance, map myClass, () -> print 'myInstance is a myClass'
```

## `map`
A simple map implementation.
```coffee
myMap = map 'key', 'value', 
  'key2', 'value2'

print myMap
```

## `imp`
A simple `require` implementation only for `rew` modules.
```coffee
{ LinkedList } = imp 'data'
list = new LinkedList

list.add('value')
```
### importing files
```coffee
myFile = imp './myfile.coffee'
myJs = imp './myfile.js', type: 'js'
myJson = imp './myfile.json', type: 'json'
myYaml = imp './myfile.yaml', type: 'yaml'
myText = imp './myfile.txt', type: 'text'
```

## `exports`
A simple export implementation.
```coffee
# You can use module.exports
myVariable = ""
module.exports = { myVariable }
# or
exports { myVariable }
```

## `input`
Take user input
```coffee
name = input 'Your name: '
print 'Your name is', name

num = int input 'Age: '
print num, 'years old'
```

## `require`
NodeJS's require
```coffee
fs = require 'fs'
path = require 'path'
```

## `clear`
Clear the stdout
```coffee
print 'This will be cleared'
clear()
```

## `json` and `yaml`
Parsing json and yaml.
```coffee
# Parse JSON
json '{ "myJson": "input" }'
# Object to JSON string
jsons { myObject: 'value' }

# Parse YAML
yaml 'myProp: value'
# Object to YAML string
yamls { myprop: "myValue" }
```

## `scheduleFrame`
Basically, it's a `requestAnimationFrame` function.
```coffee
num = 0
myFunc = () -> 
  clear()
  print num
  num++
  scheduleFrame myFunc
scheduleFrame myFunc
```

## `getters` and `setters`
Define getters and setters
```coffee
myObj = {}
getters myObj, prop: () -> 'some-value'
setters myObj, prop: (val) -> print 'setting to', val
```

## `wait`
Makes async functions to sync.
```coffee{3}
axios = require 'axios'

json = wait curl, 'https://api.github.com'
print json # It will return the response
```
For functions declared inside your `rew` context, you can do this:
```coffee
myAsyncFunc = () -> 
  await sleep(1000)
  'Done'

print myAsyncFunc.wait() # will print Done
```
using the `-wait` [directive](/compiler-directives.html), you can remove the use of commas.
```coffee{1}
-wait curl 'https://api.github.com'
# Which will translate to
wait curl, 'https://api.github.com'
```
Can also be used with futures or promises:
```coffee
wait new Promise (r) -> r someResult
wait future (r) -> r someResult
```
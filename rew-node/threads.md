# Module `threads`
The `threads` module is used to create and controls sub threads in a process. `threads` run on a nodejs
worker context, meaning that the variables and functions in your context won't be shared.

```coffee{1}
{ thread } = imp 'threads'
```

## Running a thread
```coffee{4}
myThread = thread (myData) -> 
	print myData

myThread.start "Custom Data"
```

## Thread Functions
```coffee
{ on, off, emit, get, stop } = myThread.start "Custom Data"
```

## Thread Return Value
```coffee{3,6}
myThread = thread (myData) ->
	# process data
	@process.finish 'Result Data'

myThread.start "My Data"
	.get()
		.then (result) ->
			print(result)
```

## Thread Events
```coffee
myThread = thread () ->
	@process.on 'myEvent', (data) =>
		print(data)
		@process.emit 'myEventBack', data: 'smn'

runningThread = myThread.start()

runningThread.on 'myEventBack', (data) ->
  print data, 'back'
  runningThread.stop()

sleep 1000
	.then () ->
		runningThread.emit 'myEvent', data: 'Hello'
```

You can also stop it using the `thread.stop()` function.

```coffee{4}
...
runningThread.on 'myEventBack', (data) ->
  print data, 'back'
  runningThread.stop()
...
```
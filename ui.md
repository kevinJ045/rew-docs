# ~~Module `ui`~~

> Removed since 1.2.3

The `ui` module is pretty straight forward, it's used to create and manage **UI**, currently this module
only works on linux, and still in beta.

## Usage
```coffee
ui = imp 'ui'

{ Text } = await ui.start()

new Text 'Hello!',
  parent: 'null'
```

## Widgets
When you set the parent to `null` for a widget, it gets added directly to the root of the ui
```coffee{5}
ui = imp 'ui'

{ Widget, Text } = await ui.start()

new Widget 
  parent: 'null',
  children: [
    new Text 'Hello!'
  ]
```

## Element
To change the element from `div` to anything, do:
```coffee{3}
new Widget 
  parent: 'null',
  element: 'p',
  children: [
    new Text 'Hello!'
  ]
```

## CSS classes
```coffee{3}
new Widget 
  parent: 'null',
  class: 'my-class',
  children: [
    new Text 'Hello!'
  ]
```

## Set ID
```coffee{5}
{ Widget, Text, findElement } = await ui.start()

new Widget 
  parent: 'null',
  id: 'my-id',
  children: [
    new Text 'Hello!'
  ]

print await findElement 'my-id'
```

## Set Style
```coffee
new Text 'Hello!',
  style:coffee{5}
    color: 'red'
# OR
new Widget style:
  background: 'blue'
```

## Set Attribute
```coffee
new Text 'Hello!',
  attr:
    title: 'Hey! i am a title!'
```

## Add default style
This is like a `<style>` tag
```coffee{2}
{} = await ui.start
  style: """ body { background: black } """
```

## Add multiple style sheets
```coffee
{ StyleSheet } = await ui.start
new StyleSheet """ .myText { color: red } """ # Automatically added.
```

## Custom script execution
```coffee{2}
{} = await ui.start
  exec: (ctx) -> 
    ctx.log('This is running in the client')
```
Keep in mind that the `exec` here runs on the client js, so you can't use variables from this context on it

## Events
```coffee{2}
w = new Widget ### ... ###
w.on 'click', () -> print 'Clicked #{w.id}'
```


## Control after init
```coffee
w = new Widget ### ... ###

w.text "NewText"

w.add new Text "New Text Element", id: "newtext"

w.remove "newtext"

w.data 'key', 'val'

w.style
  color: 'red'

w.attr
  title: 'This is a title'
```

## Transmitter
To transmit data with the UI client.
```coffee
{ Transmitter } = await ui.start
  exec: (ctx) -> 
    ctx.onRecieve (data) ->
      ctx.log 'recieve', data
      setTimeout () -> ctx.send data: 'fromClient', 1000

Transmitter.send data: 'value'
Transmitter.recieve (data) -> print 'recieved data', data
```

## Custom Bin
A custom binary file to run as a communicator and display manager.
```coffee
{} = await ui.start
  bin: realpath './myUiBin'
```
You can actually build one using the `rew ui-bin` command

## Notes
The `ui` module has been removed since `rew@1.2.3`, meaning that it is no longer used and is in progress to be replaced by a better ui module.
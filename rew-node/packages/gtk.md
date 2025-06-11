# Rew X Gtk
::: warning
This library is still under development and testing, there will often be breaking changes as well as many new features.
:::
Integration of [The GTK Project](https://www.gtk.org/) with `rew` using [`node-gtk` bindings](https://www.npmjs.com/package/node-gtk).

## Installing
You can install [**Rew/Gtk**](https://github.com/kevinJ045/rew.gtk) from `github:kevinJ045/rew.gtk` with either [pimmy](/packages/pimmy.md) or `rew`.
```bash
# pimmy
pimmy -Sa rew.gtk
# rew
rew install github:kevinJ045/rew.gtk
# rewpkgs
rew install @rewpkgs/rew.gtk
```

## Basic Usage
The library needs you to pass the config as an [import assertion](/import-export.md#imp-assertions) when you import it.
```coffee
ui = imp 'rew.gtk', gtk: '4.0'

start = ->
  window = ui.Window::create title: 'MyTitle'

  btn = new ui.Gtk.Button( label: 'Click Me' )
  window.setChild btn

  window.show()
  ui.appLoop.run()

ui.gtk_app.on 'activate', start

ui.startMain()
```
In this example:
-   `imp 'rew.gtk'`: Import
    - We import the library first
    - `gtk: '4.0'` will require `gtk` version `4.0` from the `gi` repository
-   `start = ->`: Main function
    - We declare the main function and inside of it we create a window
-   `ui.startMain`: Start mainloop
    - We start the mainloop for the app
The basic example shows the basic usage for the Gtk binding

## Exports
Exports from the `rew.gtk` library:
-   **UI:**
    -   The main export, can be imported as:
        ```coffee
        UI = imp 'rew.gtk'
        # or
        import * as UI from 'rew.gtk'
        ```
    -   It is a [Usage](/using.md#usage), and can be used with [using](/using.md), takes a function and calls it with a [UI Context](#ui-context) as an argument.
-   **`init`:**
    -   The sub export, a function to force-get a [UI Context](#ui-context) without a [using](/using.md).
        ```coffee
        UI = imp 'rew.gtk'
        UICtx = UI.init gtk: '4.0', package: app.config.manifest.package
        
        UICtx.Gtk 
        ```
    -   Takes a [UI Config](#ui-config) and returns a [UI Context](#ui-context)

## UI Config
The UI Config can be used to create a **UI Context** and it influences the way the context behaves.
```yaml
package: string # Package name
name: string # Name

# GTK Version
gtk: '4.0' | '3.0'
```

## UI Context
The UI Context holds all the functions and Gtk as well.
```yaml
config: uiConfig # UI Config
Gtk:
  # The entire require result from
  # gi.require 'Gtk'
gtk_app: Gtk.Application
appLoop: Gtk.MainLoop
startMain: Function # Start mainloop
require: Function # gi.require

Registry: {
  register: Function # To register elements
}

elements: {} # All registered elements
Widget: Class # A custom wrapper widget class
Component: Class # To declare custom elements
Window: Usage # A usage to create windows
createClass: Function # depricated

refine: Function # Beautify the using syntax
setup: Function # Returns a setup for a usage 
```

## Using as a usage
Using the default usage, we can get a **UI Context** to work with.
```coffee
using imp('rew.gtk'), (ui) ->
	start = ->
	  window = ui.Window::create title: 'MyTitle'
	
	  btn = new ui.Gtk.Button( label: 'Click Me' )
	  window.setChild btn
	
	  window.show()
	  ui.appLoop.run()
	
	ui.gtk_app.on 'activate', start
	
	ui.startMain()
```

## Using as a namespace
By using import assertions to get a **UI Context** on import, we can use the context we get as a namespace.
```coffee
using namespace imp('rew.gtk', gtk: '4.0'), ->
	start = ->
	  window = Window::create title: 'MyTitle'
	
	  btn = new Gtk.Button( label: 'Click Me' )
	  window.setChild btn
	
	  window.show()
	  appLoop.run()
	
	gtk_app.on 'activate', start
	
	startMain()
```

## Using `setup`
The setup function will help by setting up the `activate` event and calls the startMain after our function is called.
```coffee
using namespace imp('rew.gtk', gtk: '4.0').setup ->
	window = Window::create title: 'MyTitle'
		
	btn = new Gtk.Button( label: 'Click Me' )
	window.setChild btn

	window.show()
```

## Using the `Window` usage
The `Window` usage gives us a window context, and automatically calls the `window.show()` function. Takes in a function and calls it with a [Window Context](#window-context) as a caller. 
```coffee
using namespace imp('rew.gtk', gtk: '4.0').setup ->
  # Optionally, you can use using Window, ->
	using refine(Window) ->
		@setChild new Gtk.Button( label: 'Click Me' )

```

## Window Context
You can get the window context with either using the **[UIContext](#ui-context)/Window** as a Usage or calling the **[UIContext](#ui-context)/Window::create** function.
```yaml
window:
 - Gtk.Window if gtk is 3.0
 - Gtk.ApplicationWindow if gtk is 4.0
setChild: (Widget | Gtk.Widget) -> void 
 - Sets the child or adds a child to the window
show:
 - window.show
hide:
 - window.hide

on: From emitter
off: From emitter
emit: From emitter

setTitle: (string) -> void
  - Sets the title
setTitleBar: (Widget | Gtk.Widget) -> void 
  - Sets the title bar

# Only for JSX
Store: Store
ref: () -> State
state: (value: any) -> State
surge: (state: State, fn: Function) -> State

# Only on usage
render: () -> void
```

## Using `elements`
You can use the `elements` namespace to create elements.
```coffee
using namespace imp('rew.gtk', gtk: '4.0').setup ->
	using Window, ->
		new elements.button 'hi'
```

## Using `JSX`
To use JSX, We will be using the [JSX usage operator](/using.md#default-using-options) and `Window`.
```coffee
using namespace imp('rew.gtk', gtk: '4.0').setup ->
	using JSX, Widget::create
	using refine(Window) ->
		<button>Click Me</button>
```

## Using States with `JSX`
Once we get our window context, we can use the WindowContext.state function to create states.
```coffee
using namespace imp('rew.gtk', gtk: '4.0').setup ->
	using JSX, Widget::create
	using refine(Window) ->
		count = @state 1
		<box>
			<text>{count}</text>
			<button on:click={() -> count.set(count.get() + 1)}>Increment</button>
		</box>

```
::: details More
One widget can only hold one state as it's child, and can hold multiple states as properties/attributes.
:::

## Widgets as states
You can store anything in states, even widgets.
```coffee
using namespace imp('rew.gtk', gtk: '4.0').setup ->
	using JSX, Widget::create
	using refine(Window) ->
		count = @state 1
		widgetToChange = @state (<label>Default Widget</label>)
		<box>
			<box>
				{widgetToChange}
			</box>
			<button on:click={() -> widgetToChange.set(<text>{count}</text>)}>Show Count</button>
			<button on:click={() -> count.set(count.get() + 1)}>Increment</button>
		</box>
```

## Refs
A ref is a reference to a widget saved in a state. Using `ref`s you can reference a child in the jsx nest inside of the same nest.
```coffee
using namespace imp('rew.gtk', gtk: '4.0').setup ->
	using JSX, Widget::create
	using refine(Window) ->
		popupRef = @ref()
    <box>
      <popover useRef={popupRef}>
        <text>Hello</text>
      </popover>
      
      <button on:click={() -> popupRef.widget.popup()}>
        <image icon="list-add" />
      </button>
    </box>
```

## Refs with `useBy` prop
You can alternatively call a function after the creation of the widget.
```coffee
using namespace imp('rew.gtk', gtk: '4.0').setup ->
	using JSX, Widget::create
	using refine(Window) ->
		<box>
			<text useBy={() -> @widget.setLabel('Changed')}>This will be immediately changed</text>
		</box>
```

## Using states with attributes
To use states with attributes:
```coffee
using refine(Window) ->
  orientation = @state 'horizontal'
  <box orientation={orientation}>
    <button on:click={() -> orientation.set 'vertical'}>Set vertical</button>
  </box>
```

## Using `surge`
`surge` can be used to map/format/transform a state value to a different value.
```coffee
using refine(Window) ->
  percent = @state 1
  <box>
    <text>{@surge percent, (percent) => percent + '%'}</text>
    <button on:click={() -> percent.set(percent.get() + 1)}>Progress</button>
  </box>
```

## Array State
Handling arrays might be a bit difficult, so the ArrayState class or `@states` function solves most issues with it.
```coffee
using refine(Window) ->
  alphabet = @states [1..10]
  <box>
    {
      alphabet
        .filter (letter) => letter isnt 'm'
        .map (letter) => <text>{letter}</text>
    }
  </box>
```
::: info Notice
Keep in mind to keep most states in their own component or wrapper element. As they might re-order your widget tree on update.
:::

## Window Context Events
-   **ready**:
    -   The `ready` event fires once the rendering is done. can be used for many usecases such as the below example:
    ```coffee
    # A simple progress bar
    using refine(Window) ->
      # Define a state
      progressVal = @state 0

      # When the app is ready, it fires
      @on 'ready', _update = async =>
        if progressVal.get() < 71
          await sleep 10
          progressVal.set progressVal.get() + 1
          _update()
      <box>
        <progress-bar show-text={true} fraction={@surge progressVal, (val) -> val / 100}>
          {progressVal}
        </progress-bar>
      </box>
    ```
    - Simpler example:
    ```coffee
    using refine(Window) ->
      @on 'ready', ->
        print 'app is ready'
      <box>
        <text>Check console</text>
      </box>
    ```
## Store
A Store is a set of States, it can hold many states and be a center of a related group of states.
```coffee
using refine(Window) ->
  store = @Store::new ->
    @count = 1
    @reference = @ref()
  <box>
    <text>
      {store.count}
    </text>
    <button on:click={() -> store.count = store.$count + 1}>Increment</button>
  </box>
```
#### Explanation:
- `@Store::new` takes a function, and when we can declare states in the store itself but as raw values except if it's a widget ref. 
- To get the value of a store item as a state, we use the `store.item`. 
- To get the value of a store item as the value itself, we use the `store.$item`. 
- To set the value of a store item we simply do: `store.item = newValue`

## Using `bind`
The `bind` attribute can be used for a variety of widgets, such as `entry`, `check`, `toggle-button` and many more. To use `bind` we just pass `bind={state}`.
```coffee
using refine(Window) ->
  isTrue = @state true
  inputVal = @state 'default value'
  <box>
    <text>{isTrue}</text>
    <check bind={isTrue}>Toggle</check>

    <text>{inputVal}</text>
    <input bind={inputVal}></input>
  </box>
```

## Widget Events
GTK Widgets all have different signals/events. and to listen to an event, you simply can do this:
```coffee
<widget on:event-name={() -> 'function'} />
```

## Window Props
We can set special window props inside of widgets for special use. Like title bars for example. Using the `window-prop` attribute, we can set it to a string which can determine where and how the widget will be configured.
```coffee
<header-bar window-prop='title_bar'></header-bar>
```
### Available Props:
-   **`title_bar`**:
    -   Sets the widget as a title bar

## Custom Elements
You can declare custom elements as either a Component or a registered element.

### Custom GTK Classes
You can declare custom wrapper classes.
```coffee
using namespace UI, () ->
  MyClass = Widget::class {
    gtk: Gtk.[ClassName]
    # constructor
    constructor: (widget, options) -> ...
    # a function to fix creation arguments
    factorArguments: () -> ...
    # name for registry
    name: 'my-el'
    # A function to run before the creation of the class
    onCreate: (WidgetClass) ->
      WidgetClass::MyProp = ...
      WidgetClass.onProp 'text', () ->
        @widget.doSomething
    # this will be a normal method.
    method: () ->
      # @widget is the Gtk Widget instance
      @widget.doSomething()
  }
```
Later on, you can use this custom class as:
```coffee
using refine(Window) ->
  ...
  <MyClass>...</MyClass>
```
Or you can just register it:
```coffee
Registry.register MyClass
# now you can access it with
new elements['my-el']
# or use jsx with it
using refine(Window) ->
  ...
  <my-el>...</my-el>
```

### Component as function
```coffee
CustomEl = (props, ...children) ->
  <box>
    {children}
  </box>

...
using refine(Window) ->
  ...
  <CustomEl>...</CustomEl>
```
### Component as a `Component`
```coffee
CustomEl = Component 'my-element', (props, ...children) ->
  <box>
    {children}
  </box>

...
using refine(Window) ->
  ...
  <CustomEl>...</CustomEl>
```
### Component as an element
Using the element Registry, you can define the component as an element.
```coffee
CustomEl = Component 'my-element', (props, ...children) ->
  <box>
    {children}
  </box>
Registry.register CustomEl
...
using refine(Window) ->
  ...
  <my-element>...</my-element>
```
### Example
Let's make two files, and let's make one of the files a place to declare components while the other for actual usage.
```coffee
# main.coffee
using namespace imp('rew.gtk', gtk: '4.0').setup ->
	imp('./components').start(UI)
	using JSX, Widget::create
	using refine(Window) ->
		myState = @state 'my state value'
		<box>
			<my-component orientation='horizontal'>
				<text>{myState}</text>
			</my-component>
		</box>
```
Now let's make the `components.coffee`
```coffee
# components.coffee
export start = (UI) ->
  using namespace UI, ->
    using JSX, Widget::create
    El = Component 'my-component', (props, ...children) ->
      <box orientation={props.orientation}>
        {children}
      </box>
    Registry.register El
```

## Phantom Syntax
`rew.gtk` comes with a header file for [Phantom Syntax](/expr/phantom.md).
```coffee
using namespace imp('#rew.gtk', gtk: '4.0').setup ->
  using JSX, Widget::create
  Component('my-component') comp = (props, ...children) ->
      <box orientation={props.orientation}>
        {children}
      </box>
  Registry.register comp
  using refine(Window) ->
    @state myState = 'my state value'
    @surge(
      (val) => val + ' surged'
    ) mySurge = myState
    @ref Myref
    <box useRef={Myref}>
      <my-component orientation='horizontal'>
        <text>{mySurge}</text>
      </my-component>
    </box>
```

## Advanced Example
In this example, there are complex structures and almost all working and available widgets that have been refactored for `rew.gtk`.
```coffee
using namespace imp('rew.gtk',
  gtk: '4.0',
  package: packageName
).setup ->
  using JSX as Widget::create
  using refine(Window) ->
    using refine(
      @Store::flux ->
        @active = true
        @popoverRef = @ref()
        @isOnToggle = true
        @isOnCheck = false
        @isOnSwitch = false
        @radioSwitch = 'one'
        @inputVal = 'This is a state'
        @progressVal = 0
    ) ->

      @on 'ready', _update = async =>
        if @store.$progressVal < 71
          await sleep 10
          @store.progressVal = @store.$progressVal + 1
          _update()

      <scrolled-window>
        <header-bar window-prop='title_bar'>
          <text>Start</text>
          <text>Title</text>
          <action-bar>
            <button><image icon="list-add" /></button>
            <button><image icon="edit-find" /></button>
            <button><image icon="open-menu" /></button>
          </action-bar>
        </header-bar>
        <box>
          <notebook on:switch-page={() => @store.progressVal.set(0) && _update()}>
            <box>
              <label>Tab 1</label>
              <box spacing={10}>
                <progress-bar show-text={true} fraction={@surge @store.progressVal, (val) -> val / 100}>
                  {@store.progressVal}
                </progress-bar>
                <level-bar inverted={true} min-value={0} max-value={100} value={@store.progressVal}></level-bar>
              </box>
            </box>
            <box name="t2">
              <box orientation="horizontal" spacing={10}>
                <image icon="edit-copy" />
                <label>Tab 2</label>
              </box>
              <box>
                <image pixel-size={100} file={realpath './assets/rew.png'} />
                <grid maxCols={10}>
                  <button>item1</button>
                  <button>item2</button>
                  <button>item3</button>
                  <button>item4</button>
                </grid>
                <stack active={@store.active}>
                  <button on:click={() -> active.set 'Second'} name="First">Switch Two</button>
                  <button on:click={() -> active.set 'Third'} name="Second">Switch Three</button>
                  <button on:click={() -> active.set 'First'} name="Third">Switch One</button>
                </stack>
                <overlay>
                  <text>Hello</text>
                  <box>
                    <text>Overlay</text>
                  </box>
                </overlay>
              </box>
            </box>
            <box name="hello">
              <label>Tab 3</label>
              <box>
                <popover useRef={@store.popoverRef}>
                  <box>
                    <label>Popover Content</label>
                  </box>
                </popover>
                <flow-box>
                  <box>
                    <label>{@store.isOnToggle}</label>
                    <toggleButton bind={@store.isOnToggle}>Toggle</toggleButton>
                  </box>
                  <box>
                    <label>{@store.isOnCheck}</label>
                    <check bind={@store.isOnCheck}>Check</check>
                  </box>
                  <box>
                    <label>{@store.isOnSwitch}</label>
                    <switch bind={@store.isOnSwitch}></switch>
                  </box>
                  <box>
                    <label>{@store.radioSwitch}</label>
                    <radio-group bind={@store.radioSwitch}>
                      <radio name="one">One</radio>
                      <radio name="two">Two</radio>
                    </radio-group>
                  </box>
                  <box>
                    <spin-button adjustment:lower={1} adjustment:upper={10} adjustment:step-increment={1}></spin-button>
                  </box>
                </flow-box>
                <label>{@store.inputVal}</label>
                <search bind={@store.inputVal}></search>
                <button
                  on:click={() => @store.popoverRef.widget.popup()}>Open</button>
              </box>
            </box>
          </notebook>
          <paned position={30} orientation='horizontal'>
            <box>
              <text>Left</text>
            </box>
            <box>
              <text>Right</text>
            </box>
          </paned>
        </box>
      </scrolled-window>
```

## More about RewXGtk
You can see [the github repo](https://github.com/kevinJ045/rew.gtk) for more information. You can try looking at the code or report issues.
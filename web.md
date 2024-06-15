# Module `web`
The `web` module is a simple virtual DOM manager, it creates a virtual and manages it based on a simple state.

## Usage
```coffee
Web = imp 'web'

page = Web::create title: 'Page Title'

page.add <div>This is a div</div>
page.add <p>A paragraph</p>

page.render() # Render to html
```

## Page
The `Web::Page` class is a node containing all the data for the page as well as the root element, it has all the needed methods to be rendered to html.

### Page Functions
-   **`add`:**
    -   Adds a series of elements to the body of the page
-   **`find`:**
    -   Finds and returns a Node from the tree 
-   **`render`:**
    -   Renders the entire page to either a static html or a dynamic js that manages states
        **Example**:
        ```coffee
        page.render() # Renders dynamic JS
        page.render true # Renders static HTML
        ```
-   **`clone`:**
    -   Clone the entire page into a new node
-   **`style`:**
    -   Add a css style string to the head or a link tag to a css
        **Example**:
        ```coffee
        page.style """ body { back } """
        page.style href: "https://example.com/path/to/style.css"
        ```
-   **`script`:**
    -   Add a script js to the body
        **Example**:
        ```coffee
        page.script """ alert("hi") """
        page.script src: "https://example.com/path/to/script.js"
        ```
-   **Creating a page:**
    -   You can use the `Web::create` to create a page
        **Example**:
        ```coffee
        page = Web::create title: "Title", viewportMeta: true
        ```

## State management
`Web` comes with a small state manager used to manage state in **dynamic** pages.

### Creating state
```coffee
name = Web::state "John"

page.add <div>{name}</div>
```
### Changing state
```coffee
name = Web::state "John"

page.add <div>{name}</div>

# ...

name.value = '...'
```
### Changing state in the client
To change the state in the client, you need to wrap your function to give it access to the state in the client.
```coffee
name = Web::state "John"

changeName = Web::invokeState [name], (event, name) ->
  name.value = "Jane"

page.add <div onClick={changeName}>{name}</div>
```
To use local variables, you can do:
```coffee
localVar = "Jane"
changeName = Web::invokeState [name, localVar], (eventm name, localVar) ->
  name.value = localVar
```
::: details More
Remember that only serializable data can be passed here. The `Web::invokeState` function creates a string from a function that will be parsed into a function in the client js. So whatever you pass is gonna be parsed into a string.
:::


## The `Web` namespace
The below are all the functions in the module.
-   **`isNode`:**
    -   Checks wether the given item is a node or not
-   **`createElement`:**
    -   Creates nodes
        **Example**:
        ```coffee
        div = Web::createElement 'div', { attribute: "value" }, Web::createTextNode "Child"
        page.add div
        ```
-   **`createTextNode`:**
    -   Creates a simple text node.
        **Example**:
        ```coffee
        Web::createTextNode "Child" # Doesn't take anything else
        ```
-   **`bundle`:**
    -   Bundles a file into a browser js
        **Example**:
        ```coffee
        Web::bundle './file.coffee'
        ```

## Example
This example shows a full usage of the `Web` module along with the [serve module](/serve.html).
```coffee
# @jsx Web.prototype.createElement 
Web = imp 'web'
Svr = imp 'serve'

router = Svr::router type: 'auto'

router
  .get '/ssr', (req) ->
    page = Web::create title: 'SSR Rendered page'

    buttonText = Web::state 'Click to show'
    show = Web::state false

    indices = [1..10]

    changeStates = Web::invokeState [buttonText, show],
      (buttonText, show) ->
        buttonText.value = 'Showing'
        show.value = true

    page.add <div data-only-if={show}>{indices.map((i) -> <p>{i}</p>)}</div>
    page.add <p onClick={changeStates}>{buttonText}</p>

    Svr::html page.render()
  .get '/client', () ->
    page = Web::create title: 'Client rendered page'

    page.script await Web::bundle realpath './client.coffee'

    Svr::html page.render true


svr = Svr::create fetch: router.fetch

svr.port 3000
  .listen
  .log 'Listening on $port'
```
# Module `serve`

The `serve` module is a basic server module used to create and control an HTTP server. It leverages [IttyRouter](https://itty.dev/itty-router/) for routing.

## Overview

The `serve` module simplifies the process of creating an HTTP server by providing a streamlined interface for handling requests, managing routes, and serving files. It includes methods for starting the server, setting the port, and logging messages.

## Usage

Here's a quick example of setting up a basic server using the `serve` module:

```coffee
Svr = imp 'serve'

Svr::create fetch: () -> Svr::text "Hello, World!"
  .port 3000
  .listen
``` 

### Explanation

-   **`imp 'serve'`**: Imports the `ModuleServe` class.
-   **`Svr::create`**: Creates a new server instance.
-   **`fetch: () -> Svr::text "Hello, World!"`**: Defines a `fetch` function to handle incoming requests and return a plain text response.
-   **`.port 3000`**: Sets the server to listen on port 3000.
-   **`.listen`**: Starts the server and begins listening for requests.

## API Reference

### `Svr::create(options)`

Creates and configures a new server instance.

#### Parameters:

-   **`options`**: An object with the following optional properties:
    -   **`handler`**: A function `(req, res) ->` to handle requests directly. Overrides `fetch` if both are provided.
    -   **`routers`**: An array of routers to be used by the server.
    -   **`fetch`**: A function `(req) -> ResponseType` or `(req) -> Promise<ResponseType>` to fetch responses for requests.

#### Returns:

-   A `ModuleServeServer` instance with methods to set up and control the server.

#### Example:

```coffee
server = Svr::create
  fetch: (req) -> Svr::text "Hello from Fetch"

server.port 8080
  .listen
  .log "Server running on port $port"
``` 

### `Svr::createFileRouter(options)`

Creates a file router to serve files from a directory based on request paths.

#### Parameters:

-   **`options`**: An object with the following properties:
    -   **`root`**: The root directory for file serving.
    -   **`basePath`**: (Optional) The base path for routing.
    -   **`resolveExtensions`**: (Optional) An array of file extensions to resolve.
    -   **`bundlerOptions`**: (Optional) Options for the bundler.
    -   **`bundlerEntry`**: (Optional) Custom function for bundler entry.
    -   **`ssrBundlerEntry`**: (Optional) Custom function for SSR bundler entry.
    -   **`onError`**: (Optional) Function to handle errors.

#### Returns:

-   A function `(req) -> ResponseType | Promise<ResponseType>` for handling file requests.

#### Example:

```coffee
fileRouter = Svr::createFileRouter
  root: './app'

server = Svr::create fetch: fileRouter
server
  .port 3000
  .listen
``` 

#### Usage with routers
```coffee
router = Svr::router
fileRouter = Svr::createFileRouter
  root: './app'
  basePath: '/app'

router.all '/app', fileRouter

server = Svr::create fetch: router.fetch
server
  .port 3000
  .listen
``` 

### Renderable Files

File routers defined in the `serve` module are designed to handle different types of files and scenarios based on the naming conventions and their content.

#### 1. `path/route.[coffee|js]`

If a file named `route.coffee` or `route.js` exists in the specified path (`path`), the file router will import it. This file is expected to contain route handlers or middleware logic that defines how incoming requests to specific routes should be processed and responded to.
    
-    ```coffee
    export GET = -> 
      Svr::text 'This will be returned on get`
    ``` 

#### 2. `path/page.[coffee|js|jsx]`

When a file named `page.coffee`, `page.js`, or `page.jsx` exists in the specified path (`path`), the file router treats it as a page that needs to be rendered into HTML. Here's how it's processed:

-   **Bundle and Render**: The file, along with any layout files associated with it, is bundled using the `web` module's bundling capabilities (typically via `bundle()` method). This step prepares the script that will be executed on the client side to render the page dynamically.
    
-   **Usage of `render()` Function**: The `render()` function is called during this process. It's responsible for generating the HTML content of the page. Here's a typical pattern of how `render()` might be used:
    
    ```coffee

    export render -> 
      div = document.createElement 'div'
      div.innerText = 'Hello'
      document.body.appendChild div
      div
    ``` 

#### 3. `path/page.s.[coffee|js|jsx]`

If a file named `page.s.coffee`, `page.s.js`, or `page.s.jsx` exists, it indicates that Server-Side Rendering (SSR) is enabled for this page. Here's how it's processed:

-   **SSR Bundling and Rendering**: Similar to the previous scenario, but with a focus on server-side rendering. This involves:
    
    -   Calling `render()` function within the SSR context to generate the HTML content server-side.
    
    Here's a conceptual example of how SSR and File Router might be used:
    
    ```coffee
    # @jsx Web.prototype.createElement
    Web = imp 'web'

    export render ->
      <div>Hello</div>
    ```
    

### `render()` Function Call

The `render()` function plays a crucial role in both client-side and server-side rendering scenarios:

-   **Client-Side Rendering**: When bundling `page.coffee`, `page.js`, or `page.jsx`, `render()` is called to generate HTML content that will be dynamically inserted into the DOM on the client side.
    
-   **Server-Side Rendering**: When handling `page.s.coffee`, `page.s.js`, or `page.s.jsx`, `render()` is used within the SSR context. It generates the HTML content on the server side, which is then sent as a fully rendered page to the client.



## Props Structure

The `props` structure is utilized differently based on whether it's used for CSR, SSR, or within `route.coffee`. Here's a detailed explanation of each key within the `props` structure:

#### Common Keys

-   **`url`**: Represents the current URL of the page being rendered.
-   **`query`**: Contains the current page to be rendered(only on SSR).
-   **`page`**: Contains the query parameters parsed from the URL.
-   **`method`**: Specifies the HTTP method used in the request (e.g., GET, POST).
-   **`params`**: Holds route parameters extracted from the URL path. Parameters can be defined using dynamic segments (e.g., `/home/:id`) or folder-based routing (e.g., `root/[slug]` where `[slug]` is a parameter).

#### Key Specific to Routes (`route.coffee`)

-   **`page`**: Refers to the page or component that is intended to be rendered. This allows routes to determine which page component to render based on the requested URL and parameters.

### Usage in Different Contexts

#### Client-Side Rendering (CSR)

In client-side rendering, the `render()` function is typically exported from `page.coffee`, `page.js`, or `page.jsx`. It accepts `props` as its sole parameter since it operates without direct access to the server request object. Here’s how it looks in CoffeeScript:

```coffee
# Example in page.coffee or page.js or page.jsx
export render = (props) ->
  console.log(props.url)     # Outputs current URL
  console.log(props.query)   # Outputs query parameters
  console.log(props.method)  # Outputs HTTP method (e.g., GET)
  console.log(props.params)  # Outputs route parameters
``` 

-    **When on Layout**:
      ```coffee
      # Example in layout.coffee or layout.js or layout.jsx
      export render = (props, previousRender) ->
        console.log props, previousRender
      ```

#### Server-Side Rendering (SSR)

For server-side rendering, the `render()` function is exported from `page.s.coffee`, `page.s.js`, or `page.s.jsx`. It accepts both the `request` object and `props`. This allows SSR to access server-specific details along with the rendering parameters. Here’s an example in CoffeeScript:

```coffee
# Example in page.s.coffee or page.s.js or page.s.jsx
export render = (req, props) ->
  print(req.headers)  # Access server request headers
  print(props.url)    # Outputs current URL
  print(props.query)  # Outputs query parameters
  print(props.method) # Outputs HTTP method (e.g., GET)
  print(props.params) # Outputs route parameters

  props.page.add <p>Example</p> # Adds to the currently rending page
``` 

-    **When on Layout**:
      ```coffee
      # Example in layout.s.coffee or layout.s.js or layout.s.jsx
      export render = (props, previousRender) ->
        props.page.style href: "https://example.com/style.css" # Adds style to the currently rending page
        props.page.script src: "https://example.com/script.js" # Adds script to the currently rending page
      
        <div>{previousRender}</div>
      ```

#### Routes (`route.coffee`)

Routes defined in `route.coffee` handle incoming requests and direct them to appropriate pages or components based on the URL and route parameters. They also receive `props`, which exclude the `page` attribute. Here’s how it might look:

```coffee
# Example in route.coffee
export GET = (req, props) ->
  print(props.url)    # Outputs current URL
  print(props.query)  # Outputs query parameters
  print(props.method) # Outputs HTTP method (e.g., GET)
  print(props.params) # Outputs route parameters
```

### SSR Static Rendering
[Static rendering](/web.html#page-functions), which means rendering to a static HTML string, can be useful incase you want to make your page completly static when rendered. To do that you can just export this form your `page.s.coffee`:
```coffee
export staticRendering = false
```


### Layout Files

Layout files named `layout.s.coffee`, `layout.s.js`, or `layout.s.jsx` play a crucial role in the `serve` module, especially when handling Server-Side Rendering (SSR). Here's a detailed explanation of their purpose and how they interact within the application architecture:

#### Purpose of Layout Files

Layout files are used to define the structure and common elements that are shared across multiple pages or components within a web application. In the context of the `serve` module:

-   **Server-Side Rendering (SSR)**: Layout files (`layout.s.*`) are employed to encapsulate common HTML structure, such as headers, footers, navigation bars, etc., that should be consistently rendered across different pages.

#### Exporting `render` Function

Each layout file (`layout.s.*`) is expected to export a `render` function. This function is essential because:

-   **Composition**: It allows the composition of multiple layout files. Each layout can modify or enhance the content passed to it before passing it to the next layout in the stack.
    
-   **Consistency**: By exporting a `render` function, layout files adhere to a standardized interface that ensures they can be seamlessly integrated into the SSR rendering pipeline.
    

#### Rendering Stack

When handling a page that requires SSR and utilizes layout files:

1.  **Finding Layout Files**: The application identifies and collects relevant layout files (`layout.s.*`) based on their presence in the directory structure relative to the main page file (`page.s.*`).
    
2.  **Rendering Order**: Layout files are rendered in reverse order, starting from the outermost layout to the innermost. This approach allows each layout to wrap its content with additional markup or functionality.
    
3.  **Data Propagation**: The `render` function of each layout receives data and content from the preceding layout or the main page file. It processes this data, potentially modifying or enhancing it, and then passes it down to the next layout in the stack.
    
4.  **Final Output**: The final HTML content, after being processed by all relevant layout files, represents the fully rendered page content. This content is then sent as a response to the client's request.
    

#### Example Scenario

Consider a scenario where a web application has the following files:

-   `page.s.coffee`: Represents the main page that requires SSR.
-   `./layout.s.coffee`: An outer layout file providing a common header and footer structure.
-   `../layout.s.coffee`: A nested layout file providing additional navigation elements.

Here's how the rendering stack might look:

-   `page.s.coffee` imports `./layout.s.coffee`.
-   `./layout.s.coffee` imports `../layout.s.coffee`.

The sequence of rendering would be:

1.  **`page.s.coffee`**:
    
    -   Executes its own SSR logic and prepares initial content.
2.  **`./layout.s.coffee`**:
    
    -   Imports `page.s.coffee` and receives its content.
    -   Executes its `render` function, potentially modifying or enhancing the content from `page.s.coffee`.
    -   Passes the updated content to `../layout.s.coffee`.
3.  **`../layout.s.coffee`**:
    
    -   Imports `./layout.s.coffee` and receives its content.
    -   Executes its `render` function, further modifying or enhancing the content.
    -   Produces the final HTML output, including all layout elements and the content from `page.s.coffee`.

### `Svr::router(options)`

Creates a new router for defining custom routes. More about the routers in here: [IttyRouter](https://itty.dev/itty-router/)

#### Parameters:

-   **`options`**: An object with the following properties:
    -   **`id`**: (Optional) The ID of the router.
    -   **`type`**: (Optional) Type of the router: `"auto"`, `"normal"`, or `"default"`.
    -   **Other properties**: (Optional) Additional properties for router configuration.

#### Returns:

-   A `ModuleServeRouter` instance for managing routes.

#### Example:

```coffee
router = Svr::router
  id: 'main'
  type: 'normal'

router.get '/api/hello', (req) ->
  Svr::text 'Hello API'

server = Svr::create routers: [router], fetch: 'router'
# or you can use: 
# server = Svr::create fetch: router.fetch

server
  .port 3000
  .listen
``` 

## Built-in Helpers

#### `Svr::text(string, options)`

Returns a plain text response.

#### Example:

```coffee
Svr::create fetch: () -> Svr::text "Plain text response"
``` 

#### `Svr::json(object, options)`

Returns a JSON response.

#### Example:

```coffee
Svr::create fetch: () -> Svr::json key: "value"
``` 

#### `Svr::html(string, options)`

Returns an HTML response.

#### Example:

```coffee
Svr::create fetch: () -> Svr::html "<h1>Hello, World!</h1>"
``` 

#### `Svr::status(code, options)`

Sets the HTTP status code.

#### Example:

```coffee
Svr::create fetch: () -> Svr::status 404, "Not Found"
``` 

## Full example
A simple example to showcase the usage of `serve`
```coffee
Svr = imp 'serve'

router  
  .get '/', -> Svr::text 'hello'
  .get '/html', -> Svr::html "<b>Hello!</b>"
  .get '/json', -> Svr::json { myJson: "value" }

  .post '/json', (req) ->
    print req
    Svr::json { done: true }

svr = Svr::create fetch: router.fetch

svr.port 3000
  .listen
  .log 'Listening on $port'
```
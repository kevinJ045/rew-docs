# STDLIB
The **Rew** STDLIB is different from the `js` stdlib, along with `js`'s core APIs, **Rew** has a few core functions that build up the **Rew [Context](./context)** 

## STD Functions
All functions in the [core](/core) are `stdlib` functions, and can be accessed with either `std.` or without it.

## The std and global scope
The `std` and global scopes are two different scopes as the global scope/context includes the `std` namespace while `std` doesn't include the global namespace/context.

## STD specific functions
The `std` namespace comes with a few functions that aren't in the global scope, they are set to be `prototype` functions, and can only be used using `std::`. Most of these functions are use-specific, and aren't generally useful.
-   **`std::define`:**
    -   Defines an item into the global context, allowing you to define items quickly.
        **Example**:
        ```coffee
        std::define 'something', 'value'
        print something # value
        ```
-   **`std::out`:**
    -   STDOUT or a nodejs `process.stdout` with sub functions.
        **put**:
        ```coffee
        std::out.put 'this is a', 'print'
        ```
        **write**:
        ```coffee
        std::out.write 'takes only one argument'
        ```
        **strace**:
        ```coffee
        std::out.strace 'Only will putput', 'on strace mode'
        ```
-   **`std::in`:**
    -   STDIN or a nodejs `process.stdin` with sub functions.
        **read**:
        ```coffee
        std::out.read 'this is an', 'input'
        ```
-   **`std::attach`:**
    -   Attaches/injects an object into the global context.
        **Example**:
        ```coffee
        std::attach something: 'value'
        print something # value
        ```
-   **`std::Main`:**
    -   Can only be used with `std::define`, can be used to define the main function/class that will run on execution.
        **Example**:
        ```coffee
        std::define std::Main (argv) ->
          print argv
        ```
    -   ### STD::Main
        The `std::Main` along with `std::define` gives you the ability to define and export the main function from any context without you needing to export it. 

        While you can use functions with `std::Main`, you can also use classes.
        #### Functions
        Using functions is simple, all you have to do is calling the `std::Main` with a function as an argument, you can pass `argv` as a parameter which is completely optional.
        **Example**:
        ```coffee
        std::define std::Main (argv) ->
          print argv
        # or
        std::define std::Main -> print 'Hello, World!'
        ```
        #### Classes
        Using classes with `std::Main` gives you the ability to organize your script, and do everything in the class definition.
        Keep in mind that the class you pass to `std::Main` has to have a static class method called `main`, which will behave as the main function. It can also optionally take the `argv` parameter.
        **Example**:
        ```coffee
        std::define std::Main class
          @main: (argv) ->
            print argv
        ```
        You can also use more static methods in the class, to use them inside of the `main` function.
        ```coffee
        std::define std::Main class
          @name: 'World'
          @printHello: ->
            print "Hello, #{@name}!"
          @main: ->
            @printHello()
        ```
        To predefine other objects/imports into the main class. You can use the `@prepare` or `prepare` static function.
        ```coffee
        std::define std::Main class
          @prepare: (merge) ->
            @myImport = imp '/path/to/file'
            # or
            merge { name: 'MyName' }
            # or
            merge imp 'something' # will merge the results of the import to the class
          @main: ->
            @print @myImport, @name
        ```
        > Note: The parameter passed into `@prepare` is only the function `merge`, used to inject objects into the class, meaning they will be accessible in every other function with `this.[name]` or `@[name]`.
-   **`std::ns`:**
    -   Gives you the `std` namespace with all the `std` specific functions, as well as the global context. Can only be used with [`using`](/using) [`namespace`](/using#usage-namespaces).
        **Example**:
        ```coffee
        using namespace std::ns ->
          define Main class
            @prepare: (merge) ->
              merge imp './myfile.coffee'
            @main: (argv) ->
              attach { argv }
        ```
-   **`std::__`:**
    -   A special `getter` that gets all the files with their corresponding `package` or `filename` from `approot/_` or `approot/(config.assets.globals)`.
        This introduces a new concept, where you can create files in the global folder which is either `approot/_` or any folder you put at `assets.globals` in your [config](/app.html#app-config), and it will load it either with the filename or the package of the file.
        **Example**:
        Put this in `main.coffee`:
        ```coffee
        std::__::hello_world()
        ```
        Put this in `approot/_/hello.coffee`:
        ```coffee
        package 'hello_world' # or appPackage 'hello_world'

        export default hello ->
          print 'Hello, World!'
        ```
        Then run `main.coffee`. It should say "Hello, World!".
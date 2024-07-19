# <img style="display: inline-block; margin-bottom: -7.5px; margin-right: 5px;" src="./assets/logo.png" alt="Logo" width="32"> **Rew**
Rew is basically a coffeescript runtime, it's simple and... "efficient". it's a project made with
the goal of potentially ***maybe*** reviving coffeescript.

In our current time, CoffeeScript is used barely or not at all. Many developers have moved on to other languages and frameworks, but there's still something charming about CoffeeScript's syntax and style. Rew aims to bring back some of that charm by making it easier to run and manage CoffeeScript projects.

The name "rew" is derived from "brew", echoing the coffee theme associated with CoffeeScript. Just as "brew" brings to mind the process of brewing coffee, "rew" evokes the idea of rapidly running and serving up CoffeeScript code.

Here, take a cup of coffee as you explore more about [**Rew**](#):
```coffee
package 'brewery' 
import '#std'

using namespace std::ns ->
  define Main class
    @main: (argv) ->
      typef(str) brew = (coffee, sugar) ->
        coffee + sugar + 'ml'

      int @coffee = '30ml'

      sugar = input 'How much sugar(g)? ' |> int
      print 'Cup of coffee', brew @coffee, sugar
```
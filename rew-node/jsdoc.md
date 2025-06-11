# JSDoc and CoffeeScript
After switching to civet, we have now an option in rew to use civet types, but the main target remains coffeescript, and since we can't actually declare types in coffeescript, we can use `JSDoc`.

Example:
```coffee
###*
 * A function that prints something
 * @param {string} str The string to print.
*###
myFunc = (str) -> print str
```
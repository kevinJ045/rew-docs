# JSDoc and CoffeeScript
CoffeeScript has a history of ups and downs when it comes to type annotations, the `coffeescript` maintainers ended up not really making a syntax for type annotations, so just as in `javascript`, we can use `JSDoc` to not only include types but also descriptions and such to out code.

Example:
```coffee
###*
 * A function that prints something
 * @param {string} str The string to print.
*###
myFunc = (str) -> print str
```
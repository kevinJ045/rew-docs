# Rew with coffee
::: info Notice
Rew's coffeescript compiler has changed from the official [coffeescript](https://https://coffeescript.org/) into [civet](/lang-civet.html) since **1.2.57**.
:::
Rew mainly compiles coffeescript, and while rew uses coffeescript by default, so you can whenever just use coffee files and run them natively.

## Special rew syntaxes
Rew introduces some special syntaxes for coffeescript, like for `pub` and `import` [translations](/import-export.html#using-js-import-syntax), as well as the [`using` compiler directive](/using.html).
```coffee
pub myvar = 'myvalue' 
# translated to:
pub "myvar", myvar = 'myvalue'
```

## Using coffee files
By default, rew works with `.coffee` files, so you can either just run any coffee file in it as long as it's built for the rew [context](/context.html) or just import it.
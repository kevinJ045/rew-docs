# JSX
`JSX` comes by default in rew, to enable it all you have to do is:
```coffee
using JSX, my_jsx_function

function my_jsx_function(element, props, ...children) 
  {
    element,
    props,
    children
  }

myElement = <>
  <div prop="value"><p>Text</p></div>
</>
```
::: details Notes
You strictly need to put your jsx in `<>` and `</>` to work.
:::
## Pubic JSX
To publicate `jsx`, use `public`.
```coffee
using public JSX, my_jsx_function
```
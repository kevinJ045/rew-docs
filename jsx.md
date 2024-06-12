# JSX In rew
JSX is disabled by default, all for performance purposes. To enable it, you can just add a comment with `@jsx` anywhere in your file.
```coffee{1}
# @jsx
element = <div></div>
```

## JSX Pragma with comments
To change the [JSX Pragma](https://www.gatsbyjs.com/blog/2019-08-02-what-is-jsx-pragma/) you can either look at [JSX Options](/opt.html#option-jsx-and-jsxpragma) or use comments as below:
```coffee{1}
# @jsx myCreateElementFunction
element = <div></div>
```

## More about JSX
More about this in the [JSX Options](/opt.html#option-jsx-and-jsxpragma)
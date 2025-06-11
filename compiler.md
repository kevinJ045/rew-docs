# Compiler
Rew has 3 compilers, yes too much but all serve a different purpose.

## Rew Compiler
A simple compiler written in rust that parses your syntax and fixes otherwise non-existent syntax. It parses mostly rew-specific syntaxes such as [declarations](/declarations) and such.
```coffee
#declare* "sayhello" = print "hi"
sayhello # will be turned to sayhello
```

## Civet Compiler
This is the main compiler that turns your coffescript/civet code to normal usable js code. This compiler is bootstrapped and written in js making it significantly slower- but it is necessary to compile your code. This compiler is taken from [Civet](civet.dev).
```coffee
number = "1" |> parseInt
```
Can be used with the [Compiler Directive](/compiler-directive)

## JSX Compiler
A simple JSX compiler written in rust. Optional and only runs when needed. Can be used with the [JSX Directive](/jsx). 
```coffee
using JSX, my_jsx_function

export function main()
  render <>
    <my-element />
  </>
```
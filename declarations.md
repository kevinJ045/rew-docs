# Declarations
In rew, there is a special syntax called declarators.

#### Example:
It mostly works like the `C`'s declare function. 
```coffee
#declare "sayhello" = print("Hello");
```
::: details Showcase
```coffee
sayhello
# will be converted to
print("Hello")
```
:::


## Declaration Scopes
When you declare a syntax, you are declaring it only to the local file, meaning that it'll only work on the same file that it's written on. To pass that, you can use `declare*`.
```coffee
# Public Declare
#declare* "myKey" = replacementValue;
```


## Declarators
A declarator is a function that can be used to declare a variable.
```coffee
#declare* "=myDeclarator" = myDeclarator;
```
This will define a test case that tests for anything with `myDeclarator variableName = ...` and converts it to `variableName = myDeclarator ...`.

#### Example:
```coffee
#declare* "=myClass" = createMyClass;
myClass myInstance = 'my value'
```
**This will translate to**:
```coffee
myInstance = createMyClass 'my value'
```


## Passing parameters in Declarators
You can pass parameters for declarators to define them.
```coffee
myClass('some value') myInstance = 'my value'
```
Which translates to:
```coffee
myInstance = createMyClass('my value', 'some value')
```

## Known Problems
- Spaces are required during declaration when using a declarator
- Strings don't work well with declare
- The entire feature can make unexpected syntax errors.
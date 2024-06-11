# Rew and Intellisense
Rew, while using **CoffeeScript** also has it's own [context](/context.html). Making it difficult to use the convetional intellisense. 

So to use intellisense, you can use a `jsconfig.json` or a `tsconfig.json` to load [`runtime.d.ts`](https://github.com/kevinJ045/rew/blob/main/runtime.d.ts) as follows:
```json
{
  "compilerOptions": {
    "checkJs": true,
    "lib": ["ESNext"],
    "module": "Node16"
  },
  "include": [
    "./runtime.d.ts"
  ],
  "typeAcquisition": {
    "include": ["./runtime.d.ts"]
  }
}

```

Once you loaded that, it should work if you have a coffeescript LSP plugin that translates your coffeescript into clean js.


## Rew's Intellisense Option
By default, when creating a project with rew, it asks you if you want to use intellisense or not, which will create the necessary files by default.

## The future of `Rew` and Intellisense
So far, coffeescript has been using some crafty ways for type annotations which are the root of any intellisense but none seemed to work well. Type annotations are on [my](https://github.com/kevinj045) mind and i might try some ways to implement types into `rew`.

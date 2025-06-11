# Typing you modules
Typing your modules can be done by introducing a `types.d.ts` file in your root project, you can declare whatever you want in it, and then to require those types in other projects, install your project as an app first then add it to your `types` section in your `app.yaml` with the app package name only, once you do that run:
```bash
rew misc types .
```

If the types for your module are declared in your `types.d.ts` file, then when you import that module the types will be loaded as well.

::: info Notice
Always remember to run the `misc types` command when you install npm packages as it will always update your `types` for your rew runtime.
:::
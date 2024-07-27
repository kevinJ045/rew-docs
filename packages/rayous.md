# Rew X Rayous
Integration of [**Rayous**](https://github.com/kevinJ045/guilib) with **Rew**.

## About Rayous
**Rayous** is a simple typescript framework that renders `.ts` and `.tsx` files into html using `js`. It uses components to render pages and uses classes to make and control the elements.
```typescript
import {  Component, Widget, Text } from "rayous";
export default class extends Component {
  build(){
    return new Widget({
      children: [
        new Text('Hello, World!')
      ]
    });
  }
}
```
> More about [Rayous](https://kevinj045.github.io/guilib/)

## Installation
```bash
# pimmy
pimmy -Sa rew.rayous
# rew
rew install github:kevinJ045/rew.rayous
# rewpkgs
rew install @rewpkgs/rew.rayous
```

## Node Dependencies
You will need to install `rayous` to your app with `npm` before you procees, since it will be using your `node_modules` folder to bundle the client side scripts.
```bash
npm i rayous
```

## Usage
First, you will need to create a server with [`serve`](/serve). **rew.rayous** will give you a [`Serve.FileRouter`](/serve#svr-createfilerouter-options). Because of the `FileRouter` it gives you, it also has all the [features](/serve#renderable-files) that the `FileRouter` has.

```coffee
import createRouter from "rew.rayous"
import Svr from "serve"

server = Svr::create fetch: createRouter realpath './app'

server
  .port 3456
  .listen
  .log 'Listening $port'
```

## Creating the app
Once you created the folder you want to use, in this example it's the `./app` folder, you can start by creating a `page.coffee`. In it, you can start using **Rayous**.
```coffee
import { Component, Widget, Text } from "rayous";

export default class extends Component
  build: (props) ->
    new Widget children: [
      new Text 'Hello, rayous X rew!'
    ]
```

## Features
As you would have guessed, not all **Rayous** features are supported inside of `rew.rayous`, since most features of **Rayous** are specific to it's server and can't be used in other environments. But the below are supported features:
+   [Layout Files](https://kevinj045.github.io/guilib/page/Layouts/)
+   Component Rendering
+   [All Widgets](https://kevinj045.github.io/guilib/page/Widget/)

## Features Replaced by Rew
Some features are replaced by rew's `serve` module. like:
-   [Build Props](https://kevinj045.github.io/guilib/page/Component/#buildprops) replaced by [`Serve.props`](http://localhost:5173/rew-docs/serve.html#props-structure)

## Example App
In [the repo](https://github.com/kevinJ045/rew.rayous/) there is a file named `test.coffee` and `test-app` folder, you can explore those to see more about how `rew.rayous` works.
# Forge3D
[Forge3D](https://github.com/kevinJ045/rew.forge3d) is a library to make 3D desktop apps within `rew`. Forge3D is built on top of [the node-3d project](https://github.com/node-3d/node-3d).

## Installing
You can install Forge3d from `github:kevinJ045/rew.forge3d` with either [pimmy](/packages/pimmy.md) or `rew`.
```bash
# pimmy
pimmy -Sa rew.forge3d
# rew
rew install github:kevinJ045/rew.forge3d
# rewpkgs
rew install @rewpkgs/rew.forge3d
```

## Basic Usage
Forge3D comes as a [Usage](/using.md#usage) by default, but by using the Weld function, you can use it naturally.
```coffee
import * as Forge3D from "rew.forge3d";
{ Mesh, BoxGeometry, Scene } = Forge3D.Weld()

{ scene, camera, animate } = Scene::create()

box = new Mesh(new BoxGeometry)

scene.add box
animate()
```

## Using with directives
By default, to use Forge you need 3 [using](/using.md) [directives](/compiler-directives.md).
```coffee
using imp('rew.forge3d'), (Forge3D) ->
  using namespace Forge3D, ->
    using Scene, ->
      box = new Mesh(new BoxGeometry)

      @scene.add box
      @animate()
```
### Explanation
First, we import `forge3d` and use it as a [usage](/using.md#usage). when we use it, it returns the Forge3D Context we get when we call `Weld`.
-   First, we import `forge3d` and use it as a [usage](/using.md#usage), when we use it, it returns the **Forge3D Context** we get when we call `Weld`, we also pass a function as a callback to pickup the **Forge3D Context**.
    ```coffee
    using imp('rew.forge3d'), (Forge3D) ->
    ```
    
-   Using the Forge3D namespace, we will not need to write Forge3D everytime we want to do something     involving the Forge3D Context, like `Forge3D.Mesh` or `Forge3D.BoxGeometry`. We then pass the function which is where we can use our namespace.
    ```coffee
    using namespace Forge3D, ->
    ```
    
-   Next, instead of doing `Scene::create` as we did in the [above example](#basic-usage), we use the `Scene` from Forge3D, and since we are using a namespace, this means `Forge3D.Scene`. The `Scene` usage requires a function to be passed, which is where we will be able to access our scene context, like `camera`, `renderer`, `animate`.
    ```coffee
    using Scene, ->
    ```
-   Finally, we can use everything we have so far to make a basic box and render it.
    ```coffee
    box = new Mesh(new BoxGeometry)

    @scene.add box
    @animate()
    ```

## Forge3D Context
The Forge3D Context provides every single class from [three.js](https://threejs.org), in addition to the returns from [3d-core-raub](https://github.com/node-3d/node-3d)'s init function.
```yaml
document: Document
window: Window
requestAnimationFrame: Function
gl: GL
... More raub stuff
... More three stuff
```

## The `Scene` Context.
The scene context is the one you get when you either `Scene::create` or `using Scene`.
```yaml
camera: THREE.PerspectiveCamera
renderer: THREE.WebGLRenderer
scene: THREE.Scene
animate: Function
# with Scene::create
listener:
  on: Function
  off: Function
  emit: Function
# with using Scene
on: Function
off Funciton
emit: Function
```
### Conditional Methods
If you're using the `Scene::create` method, you will have an additional `listener` object with an [emitter](/core.md#emitter) type, while if you use the `using Scene` method, you will get the listener as a part of the context.

## Using `Scene`
When you use `Scene` with the [using](/using.md) [directive](/compiler-directives.md), the function you pass is called with the scene's context as a caller. Therefore; You can use `@` or `this.` to access the context's properties.
```coffee
using Scene, ->
  @camera.far = 1000

  @on 'animate:render', (time) ->
    print 'One frame'

  @scene.add ...
  @animate()
```

## Scene events
So far, there is only one event, which is the `animate:render` event which is emitted on each frame. It gives you the current time which is a `Date.now()` value
```coffee
@on 'animate:render', (time) ->
  print time
```

## The `With` function
The `With` function can be used to merge other properties to your **Forge3D Context**.
```coffee
Forge3D.With(
  { myProperty: 'something' }
)

Forge3D.myProperty # 'something'
```

## Importing threejs modules
To import three.js modules, you can use the `With` function on your context.
```coffee
Forge3D.With(
  'controls/OrbitControls.js'
  'loaders/GLTFLoader.js'
)
```

## Using `With`
You can use it with `Weld` if you are using the normal approach to get your Forge3D Context
```coffee
import * as Forge3D from "rew.forge3d";
{ OrbitControls, Mesh, BoxGeometry, Scene, document } = Forge3D.Weld().With 'controls/OrbitControls.js'

{ scene, camera, animate } = Scene::create()
new OrbitControls camera, document

box = new Mesh(new BoxGeometry)

scene.add box
animate()
```

## Using `With` with `using`
Once you get access to your Forge3D Context, you can use the context with `With` since it returns the context itself.
```coffee
using imp('rew.forge3d'), (Forge3D) ->
  using namespace Forge3D.With(
    'controls/OrbitControls.js',
    { myBoxName: 'Boxy' }
  ), ->
    using Scene, ->
      box = new Mesh(new BoxGeometry)
      box.name = myBoxName
      print box.name

      @scene.add box
      @animate()
```

## Using `Weld` with `using`
When you nest `using`s, it becomes more and more annoying to deal with it, so you can use a welded forge context instead. This way, you save up on one line and indentation level.
```coffee
using namespace imp('rew.forge3d').Weld().With(
  'controls/OrbitControls.js'
), ->
  using Scene, ->
    box = new Mesh(new BoxGeometry)
    box.name = myBoxName
    print box.name

    @scene.add box
    @animate()
```
::: details Why use `namespace`?
The reason we are using `namespace` here is because we are instantly imporing `Forge3D`, initating a context with other modules, then passing it as a namespace so we don't have to access the context through `Forge3D`.
:::

## The `Compose` function
It's not a necessary function but rather more useful when you are trying to beautify your code, it returns either a [namespace group](/using.md#namespace-groups) or a [usage group](/using.md#usage-groups) based on what you pass.
```coffee
using namespace imp('rew.forge3d').Weld().Compose ->
  using Compose(Scene) ->
    box = new Mesh(
      new BoxGeometry 1, 1, 1
      new MeshStandardMaterial color: 0xff1234
    )

    @scene.add new AmbientLight 0xd1d1d1, 1
    @scene.addAt [100, 50, 50], new DirectionalLight 0xffffff, 0.4

    @on 'animate:render', (time) ->
      box.rotation.x = time * 0.0005;
      box.rotation.y = time * 0.001;

    @scene.add box

    @animate()
```

## Example
```coffee
using namespace Forge3D = imp('rew.forge3d').Weld().With(
  'controls/OrbitControls.js'
).Compose ->
  using Compose(Scene) ->
    new OrbitControls @camera, document

    box = new Mesh(
      new BoxGeometry 1, 1, 1
      new MeshStandardMaterial color: 0xff1234
    )
    @scene.add box

    @scene.add new AmbientLight 0xd1d1d1, 1
    @scene.addAt [100, 50, 50], new DirectionalLight 0xffffff, 0.4

    @on 'animate:render', (time) ->
      box.rotation.x = time * 0.0005;
      box.rotation.y = time * 0.001;

    @animate()
```
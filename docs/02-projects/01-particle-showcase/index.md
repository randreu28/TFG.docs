# Particle Showcase

:::info
Check out the live version [here](https://particle-showcase.vercel.app/)
:::

[![image](/img/particleShowcase.png)](https://particle-showcase.vercel.app/)

## Installation

```bash
git clone https://github.com/randreu28/TFG.particle-showcase.git
cd TFG.particle-showcase
yarn install
yarn dev
```

## Overview

The project consists of a partcle system made with a particle shader, that changes its internal state every x seconds, alongside some text. Then there are [Leva controls](/docs/common-libraries#leva-controls) for manipulating some aspects of the scene. Let's see how the `<Canvas/>` looks like:

```tsx title="/src/App.tsx"
<Canvas>
  <PerspectiveCamera makeDefault position={camPosition} />
  <color attach="background" args={[backgroundColor]} /> // A simple solid background
  color
  <EffectComposer>
    <Vignette eskil={true} opacity={vignette} offset={0.1} darkness={1.5} />
  </EffectComposer>
  <OrbitControls />
  <Buffer />
</Canvas>
```

Later, on the same file, there's a `<DynamicText/>` component outside of the canvas that is responsible of rendering the changing texts.

```tsx
<h1 className="...">
  <span>{title}</span>
  <br />
  <DynamicText />
</h1>
```

## The Canvas

Let's review the `<Canvas/>`. There's a perspective camera with a position managed by the `camPosition` with a position handled by the [Leva controls](/docs/common-libraries#leva-controls). But you'll notice that there's also an `<OrbiControls/>`, which in theory lets you zoom in and out, as well as orbit around the target. Wouldn't these two conflict?

```tsx title="/src/App.tsx"
<Canvas>
  // highlight-next-line
  <PerspectiveCamera makeDefault position={camPosition} />
  <color attach="background" args={[backgroundColor]} />
  // highlight-next-line
  <OrbitControls /> /* Why does this work? */
  <Buffer />
  ...
</Canvas>
```

This is because the `<OrbitControls/>` is in reality just taking over the transform properties of the default canvas camera. This camera in R3F is implicit, and adding the `<PerpectiveCamera/>` component with these properties makes it so we can modify the default values of the camera.

:::info
The `transform` of an object is both the position and rotation of a given 3D object.
:::

Next, there is the `<EffectComposer/>` from [React Three Postprocessing](https://docs.pmnd.rs/react-postprocessing/introduction), which allows us to add a subtle vignette to the scene:

```tsx
<Canvas>
  {/* ... */}
  <EffectComposer>
      <Vignette eskil={true} opacity={vignette} offset={0.1} darkness={1.5} />
  </EffectComposer>
<Canvas/>
```

:::info
Eskil's vignette technique works from the outside inwards rather
than the inside outwards, so if this is 'true' set the offset
to a value greater than 1.
:::

## Modeling workflow

The focus of this thesis was not specifically on the modeling, but on this project I decided to take care of it personally, as they were basic models. To do so, it was important to have real-time feedback on how it would look on the particle system. Fortunatey, [Blender](https://www.blender.org/), the 3D modeling software of choice, has a CLI where you can pass-in Python script to create automations and workflows.

These two (horrible looking) scripts on the `package.json` allowed to run `yarn model` or `yarn watch` to have constant feedback while modeling on Blender.:

```json title="package.json"
  "scripts": {
    "model": "blender modeling/king.blend --background --python modeling/export_glb.py -- public/models/king.glb && blender modeling/lightbulb.blend --background --python modeling/export_glb.py -- public/models/lightbulb.glb && blender modeling/rocket.blend --background --python modeling/export_glb.py -- public/models/rocket.glb",
    "watch": "watch 'yarn model' ./modeling"
  },
```

```python
import bpy
import sys

print("")
print(" Blender export scene in GLB Format in file "+sys.argv[-1])

# https://docs.blender.org/api/current/bpy.ops.export_scene.html
bpy.ops.export_scene.gltf(
    filepath=sys.argv[-1],
    check_existing=False,
    export_format='GLB',
    ...
    )
```

What the `watch` script allowed was to run this Python script on the different models so the R3F scene was always in sync with the `.blend` file, which allowed quick iterations for the modeling process.

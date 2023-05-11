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

The project consists of an object made with a particle shader, that changes its internal state every x seconds, alongside some text. Then there are [leva controls](https://github.com/pmndrs/leva) for manipulating some aspects of the scene. Let's see how the `<Canvas/>` looks like:

```tsx title="/src/App.tsx"
<Canvas>
  <PerspectiveCamera makeDefault position={camPosition} />
  <color attach="background" args={[backgroundColor]} /> // A simple solid background color
  <EffectComposer>
    <Vignette eskil={true} opacity={vignette} offset={0.1} darkness={1.5} />
  </EffectComposer>
  <OrbitControls />
  <Buffer />
</Canvas>
```

Later, on the same file, there's a `<DynamicText/>` component outside of the canvas that is responsible of rendering the changing texts. 

```tsx
<h1 className="text-white p-20 text-5xl font-['Righteous'] leading-relaxed text-center">
  <span>{title}</span>
  <br />
  <DynamicText />
</h1>
```

Simple enough, right? Hang in there.

## The Canvas

Let's head back to the `<Canvas/>` and start digging. There's a perspective camera with a position managed by the `camPosition` (we'll get there later, with the Leva controls). But you'll notice that there's also an `<OrbiControls/>`, which in theory lets you zoom in and out, as well as orbit around the target. Wouldn't these two conflict?

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

This is because the `<OrbitControls/>` is in reality just taking over the transform properties of the default canvas camera. This camera in R3F is implicit, and adding the `<PerpectiveCamera/>` component with these properties makes it so we can modify the default values of the camera

:::info
The `transform` of an object is both the position and rotation of a given 3D object.
:::

Next, there is the `<EffectComposer/>` from [React Three Postprocessing](https://docs.pmnd.rs/react-postprocessing/introduction), which allows us to add a subtle vignette to the scene.

```tsx
<Canvas>
  ...
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

Usually, I wouldn't take care of the modeling myself, but this time I decided to give it a try, as they were basic models. To do so, I wanted to have real-time feedback on how it would look on the particle system I created, so I managed to do a little Python script to help me automate the workflow.

These two  (horrible looking) scripts on the `package.json` allowed me to run `yarn model` or `yarn watch` to have constant feedback while modeling on Blender, the 3D modeling software of choice:

```json title="package.json"
  "scripts": {
    ...
    "model": "blender modeling/king.blend --background --python modeling/export_glb.py -- public/models/king.glb && blender modeling/lightbulb.blend --background --python modeling/export_glb.py -- public/models/lightbulb.glb && blender modeling/rocket.blend --background --python modeling/export_glb.py -- public/models/rocket.glb",
    "watch": "watch 'yarn model' ./modeling"
  },
```

This was done due to the [Blender CLI](https://docs.blender.org/manual/en/latest/advanced/command_line/index.html), which allowed me to pass a Python script to automate the export process and have a `.glb` file that could be readable to R3F:

```python
import bpy
import sys

print("")
print("Blender export scene in GLB Format in file "+sys.argv[-1])

# https://docs.blender.org/api/current/bpy.ops.export_scene.html
bpy.ops.export_scene.gltf(
    filepath=sys.argv[-1],
    check_existing=False,
    export_format='GLB',
    ...
    )
```
hat the `watch` script allowed me was to run this Python script on the different models I had so the R3F scene was always in sync with my `.blend` file, which allowed quick iterations for the modeling process.
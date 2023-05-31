---
title: Particle showcase
pagination: 4
---

# 4 Particle Showcase

[![Image](/img/particleShowcase.png)](https://particle-showcase.vercel.app/)

<div class="flex justify-between w-full">
  <a href="https://github.com/randreu38/TFG.particle-showcase">Repository</a>
  <a href="https://particle-showcase.vercel.app/">Live version</a>
</div>

## 4.0.1 Installation

To set up the project, follow these installation steps:

```bash
git clone https://github.com/randreu38/TFG.particle-showcase.git
cd TFG.particle-showcase
yarn install
yarn dev
```

## 4.0.2 Project Overview

The project consists of a particle system made with a particle shader, that changes its internal state every x seconds, alongside some text. The project incorporates [Leva controls](/docs/common-libraries#leva-controls) for manipulating various aspects of the scene. The following code snippet showcases the structure of the `<Canvas/>` component:

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

Furthermore, outside the canvas, the `<DynamicText/>` component is responsible for rendering dynamic text elements:

```tsx
<h1 className="...">
  <span>{title}</span>
  <br />
  <DynamicText />
</h1>
```

## 4.0.3 The Canvas

Let's delve into the details of the `<Canvas/>` component. It includes a perspective camera with a position managed by the Leva controls. Notably, there is also an `<OrbitControls/>` component present. One might wonder how these two elements coexist without conflicting:

```tsx title="/src/App.tsx"
<Canvas>
  <PerspectiveCamera makeDefault position={camPosition} />
  <color attach="background" args={[backgroundColor]} />
  <OrbitControls />
  <Buffer />
  ...
</Canvas>
```

The reason for their compatibility lies in the fact that the `<OrbitControls/>` component merely modifies the transform properties of the default canvas camera. In React Three Fiber, the default camera is implicit. By introducing the `<PerspectiveCamera/> `component with specific properties, we can modify the default camera's values.

> In the context of 3D objects, the term `transform` encompasses both position and rotation.

Additionally, the `<EffectComposer/>` component from [React Three Postprocessing](https://docs.pmnd.rs/react-postprocessing/introduction) is employed to apply a subtle vignette effect to the scene:

```tsx
<Canvas>
  {/* ... */}
  <EffectComposer>
      <Vignette eskil={true} opacity={vignette} offset={0.1} darkness={1.5} />
  </EffectComposer>
<Canvas/>
```

> In Eskil's vignette technique, the effect originates from the outside and moves inwards, as opposed to the traditional inside-out approach. When the `eskil` prop is set to true, the offset value should be greater than 1.

## 4.0.4 Modeling workflow

In this project, although the primary focus of the thesis was not on modeling, the author took personal responsibility for creating basic models. To achieve this, it was crucial to have real-time feedback on how the models would appear within the particle system. Fortunately, [Blender](https://www.blender.org/), the chosen 3D modeling software, offers a command-line interface (CLI) that allows the execution of Python scripts to automate workflows.

To enable constant feedback during the modeling process, the project utilized two scripts defined in the `package.json` file: `yarn model` and `yarn watch`. These scripts allowed the execution of the Python script while maintaining synchronization between the Blender scene and the R3F scene. Here are the scripts declared on the `package.json` file:

```json title="package.json"
  "scripts": {
    "model": "blender modeling/king.blend --background --python modeling/export_glb.py -- public/models/king.glb && blender modeling/lightbulb.blend --background --python modeling/export_glb.py -- public/models/lightbulb.glb && blender modeling/rocket.blend --background --python modeling/export_glb.py -- public/models/rocket.glb",
    "watch": "watch 'yarn model' ./modeling"
  },
```

The model script executes Blender commands, invoking the Python script for each model, resulting in the export of the models to the GLB format in the specified output directory. Here is the Python script that is executed:

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

The `watch` script enables the continuous execution of the Python script on different models, ensuring that the R3F scene remains synchronized with the corresponding `.blend` files. This iterative workflow enables quick iterations and feedback during the modeling process.

# Buckle up

:::info
Check out the live version [here](http://tfg-buckle-up.vercel.app/)
:::

[![image](/img/buckleUp.png)](http://tfg-buckle-up.vercel.app/)

## Installation

```bash
git clone https://github.com/randreu28/TFG.buckle-up
cd TFG.buckle-up
yarn install
yarn dev
```

## Overview

:::info
This project wouldn't be possible without the help of [dila](https://www.shadertoy.com/user/dila), the creator of the shader on which this project relies.
:::

This project was meant to explore shaders. To be more concrete, the R3F approach to using [Shadertoy's](https://www.shadertoy.com/). Shadertoy is a library of shaders created by the community, and it offers a lot of different options with shaders.

:::tip
As the era of WebGPU approaches, the community for shaders is too. If you're interested in the next generation of shaders, check out [Compute Toys](https://compute.toys/), a library made only for WebGPU shaders.
:::

The goal of this project was to figure out a way to connect these pure GLSL shaders into a React application and make interesting use of it.

Let's take a look at how the app is structured:

```tsx title="/src/App.tsx"
<Suspense fallback={<Loading />}>
  <div className="...">
    <Canvas>
      <Shader />
    </Canvas>
  </div>
</Suspense>
```

## Shader uniforms

:::tip
In case you are not familiar with shaders, it is recommended that you've read the [Particle showcase project](/docs/projects/particle-showcase/shader), as it gives the base understanding of them.
:::

The `<Shader/>` component is a simple `<Plane/>` geometry that occupies the whole viewport, and the custom shader material.

```tsx title="/src/components/Shadert.tsx"
<Plane
  ref={ref}
  args={[
    document.documentElement.clientWidth,
    document.documentElement.clientHeight,
  ]}
>
  <shaderMaterial key={ShaderMaterial.key} />
</Plane>
```

First, we have to make sure the shader material is getting the proper `uniforms`, and we can start by creating the correct types for it by extending the base R3F types:

```tsx
interface myMaterial extends THREE.Material {
  uniforms: {
    iTime: { value: number }; //Intenal time state of the shader
    iResolution: { value: THREE.Vector3 }; // Resolution of the shader (viewport dimensions)
    iChannel0: { value: THREE.Texture }; // Textures for the shader rendering
    iChannel1: { value: THREE.Texture };
    iChannel2: { value: THREE.Texture };
  };
}

interface myMesh extends THREE.Mesh {
  material: myMaterial;
}
```

:::info
The `iVariableName` naming convention comes from shadertoy, and it is being respected to communicate with the shader the same way.
:::

Next, the `iTime` and `iResolution` need to be updated every frame, so we can use the `useFrame` custom hook from R3F:

```tsx
useFrame((state) => {
  ref.current.material.uniforms.iTime.value = state.clock.elapsedTime * speed; //Speed multiplier from the leva controls
  ref.current.material.uniforms.iResolution.value = new THREE.Vector3(
    document.documentElement.clientWidth,
    document.documentElement.clientHeight
  );
});
```

## Shader material

Now, it is time to declare the initial shader material:

```tsx
import fragment from "../shaders/fragment.glsl"; // From shaderToy
import vertex from "../shaders/vertex.glsl"; // From shaderToy

export default function Model() {
  //...
  const ShaderMaterial = shaderMaterial(
    {
      iTime: 0,
      iResolution: new THREE.Vector3(
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
      ),
      iChannel0: textures[activeTextures.iChannel0], // From the leva controls
      iChannel1: textures[activeTextures.iChannel1],
      iChannel2: textures[activeTextures.iChannel2],
    },
    vertex,
    fragment
  );
  //...
}
```

:::tip
When importing GLSL files, Typescript doesn't know what to make of them. To tell typescript to import them as strings, you can create a declaration file `glsl.d.ts`:

```ts title="glsl.d.ts"
declare module "*.glsl" {
  const value: string;
  export default value;
}
```

:::

Notice that the textures from the `iChannels` come from `activeTextures`. This comes from the [leva controls](/docs/common-libraries#leva-controls), which are set up in such a way that they can choose from 10 different textures. The textures chosen provide a wide range of colors and combinations that allow the user to explore the different ways the shader relies on the materials:

<img src="/img/buckleUpTextures.jpg"  width="60%"/>

## Presets

The leva controls presets offer the user the possibility to interchange between the textures, but there are some presets that the user could select.

```tsx title="Leva textures"
const [activeTextures, setActiveTextures] = useControls("Textures", () => ({
  //highlight-start
  iChannel0: {
    value: 0,
    options: textureControlOptions, //The list of materials
  },
  iChannel1: {
    value: 2,
    options: textureControlOptions,
  },
  iChannel2: {
    value: 0,
    options: textureControlOptions,
  },
  //highlight-end
}));
```

This already gives the user the ability to get all the combinations possible, but we'd like to create specific combination presets for the users to see:

```tsx title="Leva presets for the textures"
const [activeTextures, setActiveTextures] = useControls("Textures", () => ({
  iChannel0: {
    value: 0,
    options: textureControlOptions,
  },
  iChannel1: {
    value: 2,
    options: textureControlOptions,
  },
  iChannel2: {
    value: 0,
    options: textureControlOptions,
  },
  //highlight-start
  1: buttonGroup({
    label: "Presets",
    opts: {
      Hell: () => {
        setActiveTextures({ iChannel0: 0, iChannel1: 6, iChannel2: 0 });
      },
      Christmas: () => {
        setActiveTextures({ iChannel0: 6, iChannel1: 1, iChannel2: 0 });
      },
      Ghost: () => {
        setActiveTextures({ iChannel0: 0, iChannel1: 2, iChannel2: 0 });
      },
    },
  }),

  2: buttonGroup({
    label: "Presets 2",
    opts: {
      Purpule: () => {
        setActiveTextures({ iChannel0: 7, iChannel1: 10, iChannel2: 5 });
      },
      Metal: () => {
        setActiveTextures({ iChannel0: 0, iChannel1: 4, iChannel2: 9 });
      },
      Nightmare: () => {
        setActiveTextures({ iChannel0: 0, iChannel1: 0, iChannel2: 4 });
      },
    },
  }),
  //highlight-end
}));
```

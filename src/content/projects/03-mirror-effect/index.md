---
title: TODO
---

# Mirror effect

> An experimental reflective mirror cloud with post-processing effects

:::info
Check out the live version [here](https://tfg-mirror-effect.vercel.app/). Press alt + h to hide the controls!
:::

[![image](/img/mirrorEffect.png)](https://tfg-mirror-effect.vercel.app/)

## Installation

```bash
git clone https://github.com/randreu28/TFG.mirror-effect
cd TFG.mirror-effect
yarn install
yarn dev
```

## Overview

This project was meant to be an exploratory approach to reflections. The idea behind it was to play around with some mirrors and try to get an interesting effect on them. I used a Roman statue from the artist [engine9](https://sketchfab.com/engine9) that helped me get the style I aimed for.

## Consent bypass

As the project ended up becoming very _artistic_, I decided to add an intro message before the actual scene. Let's see how this looks like:

```tsx
export default function App() {
  ...
  //highlight-start
  const [consent, setConsent] = useState<boolean>(false);

  if (!consent) {
    return <Intro setConsent={setConsent} />;
  }
  //highlight-end

  return (
    <>
      <div className="w-screen h-screen absolute left-0 top-0 z-10">
        <Suspense fallback={<Spinner />}>
          <Canvas>
            <MyScene />
          </Canvas>
        </Suspense>
      </div>
    </>
  );
}
```

For this, it is as simple as creating a state that the `<Intro/>` component will use to go show the `<Scene/>` once the user gives consent.

## Mirror material

Before discussing the `<MyScene/>` component, let's explore how the mirror material looks like. Luckily, R3F offers us a reflector material with some props to configure to get the desired effect. To do so, the use of [Leva controls](/docs/common-libraries#leva-controls) was paramount. In matters like this, it is all about quick iterations and trial and error, and Leva excels at that.

```tsx
import { MeshReflectorMaterial } from "@react-three/drei";
import { useControls } from "leva";

export default function Mirror(props: JSX.IntrinsicElements["mesh"]) {
  const config = useControls({
    blur: [300, 100], // Blur ground reflections (width, heigt), 0 skips blur
    resolution: 256, // Off-buffer resolution, lower=faster, higher=better quality, slower
    mixBlur: { value: 1, min: 0, max: 1 }, // How much blur mixes with surface roughness (default = 1),
    mixStrength: 50, // Strength of the reflections
    roughness: 0,
    depthScale: 4, // Scale the depth factor (0 = no depth, default = 0)
    minDepthThreshold: 4, // Lower edge for the depthTexture interpolation (default = 0)
    maxDepthThreshold: 10, // Upper edge for the depthTexture interpolation (default = 0)
    color: "#743d8d",
    metalness: { value: 0, min: 0, max: 1 },
    mirror: 0,
  });

  const { size } = useControls({ size: [0.05, 3, 3] });

  return (
    <mesh {...props}>
      <boxGeometry args={size} />
      <MeshReflectorMaterial {...config} />
    </mesh>
  );
}
```

## Mirror generation

For the positioning of the mirror, the mirrors were initially placed according to the vertices of an Icosaedron geometry. Each vertex was the center of the geometry, alongside their Euler angle. Each mirror _looked at_ the center of the Icoshaderon. Take, for example, the Three.js example of the Icosahedron and try to imagine the coordinates of each vertex:

<iframe src="https://threejs.org/docs/scenes/geometry-browser.html#IcosahedronGeometry" width="100%" height="500"/>

:::tip
The **Euler angles**, in contrast to the common radiant angles, describe a rotational transformation by rotating an object on its various axes in specified amounts per axis, and a specified axis order.

![Euler](/img/Euler2.gif)
:::

Let's take a look at how this is done in React. First, we need a function to generate the mirror cloud based on a float32Array:

```tsx
/**
 * Generates a cloud of points based on the data array of an object.
 *
 * @param data - The raw data array of an object
 * @param length - The length on which the data array must be subarrayed
 * @returns an array of transform elements
 */
function generateMirrorCloud(data: any, length: number, scale: number) {
  let mirrors: mirror[] = [];
  for (let i = 0; i < data.length; i += length) {
    const dataArray = data.subarray(i, i + length);
    const newPosition = new THREE.Vector3(
      dataArray[0] * scale, // x
      dataArray[1] * scale, // y
      dataArray[2] * scale // z
    );
    const newRotation = new THREE.Euler().setFromVector3(newPosition);
    mirrors.push({ position: newPosition, rotation: newRotation });
  }
  return mirrors;
}
```

This, in combination with the `THREE.Icosahedron` class and the `useMemo` hook for performance purposes, we generate the cloud of mirrors:

```tsx
function MyScene(){
const mirrors = useMemo(() => {
  const _Icoshaderon = new THREE.IcosahedronGeometry().attributes.normal;
  let Icosahedron: ArrayLike<number> | undefined;

  if (_Icoshaderon instanceof THREE.Float32BufferAttribute) {
    Icosahedron = _Icoshaderon.array;
  } else {
    throw Error("Type error");
  }

  return generateMirrorCloud(Icosahedron, 3, 6);
}, []);

...

return (
  ...
  <group ref={mirrorGroup}>
    {mirrors.map((mirror, key) => {
      return (
        <Mirror
          position={mirror.position}
          rotation={mirror.rotation}
          key={key}
        />
      );
    })}
  </group>
);
}
```

## Animations

The animations of the mirror cloud are rather simple. We take advantage of the `Math.sin()` to create a waving effect to the y-axis of the `Vector3` of the whole group, as well as their Euler rotation.
:::info
The sinus animation is perfect for creating simple _floating_ animations, as they are infinite and require almost no effort to code up the algorithm.

![image](/img/sin.gif)
:::

```tsx
const mirrorGroup = useRef<THREE.Group>(null!);

useFrame((state) => {
  const t = state.clock.elapsedTime;
  const currentPosition = mirrorGroup.current.position;
  const currentRotation = mirrorGroup.current.rotation;

  currentPosition.set(
    currentPosition.x,
    //highlight-next-line
    currentPosition.y + Math.sin(t) * 0.005,
    currentPosition.z
  );
  //highlight-next-line
  currentRotation.set(t * 0.025, t * 0.025, t * 0.025);
});
```

## Post-processing

Lastly, with the help of [React-Postprocessing](https://docs.pmnd.rs/react-postprocessing/introduction), we will include some glitch effects:

```tsx
<EffectComposer>
  <Glitch // Vector2 as they indicate min amd max values
    strength={new Vector2(1, 1)}
    duration={new Vector2(0.25, 0.25)}
    delay={new Vector2(5, 5)}
  />
</EffectComposer>
```

:::tip
You can play around with the `<Glitch/>` props to see how they modify the effect on this playground:
:::

<iframe src="https://codesandbox.io/embed/glitch-demo-bs1i1?fontsize=14&hidenavigation=1&theme=dark" width="100%" height="500"
     title="Glitch Demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   />

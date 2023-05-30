---
title: The buffer
pagination: 2.3
---

# 2.3 Buffer

In the `<Buffer/>` component, there are two main aspects: the geometry and the material. These are defined within a `<points>` element, like so:

```tsx title="src/Buffer.tsx"
<points ref={ref}>
  <bufferGeometry>...</bufferGeometry>
  <shaderMaterial>...</shaderMaterial>
</points>
```

## 2.3.1 The shader material

The material of this object is nothing like any other. Luckily, R3F allows us to create materials of our own, by creating a `shaderMaterial` and passing our own fragment and vertex shaders, as well as any uniforms we might need:

```tsx
import fragShader from "./shaders/fragment.glsl";
import vertShader from "./shaders/vertex.glsl";
import { shaderMaterial } from "@react-three/drei";

 const [params, setParams] = useControls("Particles",()=>...)

 const ShaderMaterial = shaderMaterial(
    {
      particleSize: params.particleSize,
      bufferColor: new THREE.Color(params.bufferColor),
      time: 0,
      transparencyState: params.transparencyState,
      randomState: params.randomState,
      state1: params.state1,
      state2: params.state2,
      state3: params.state3,
    },
    vertShader,
    fragShader
  );

```

> When importing GLSL files, Typescript doesn't know what to make of them. To tell typescript to import them as strings, you can create a declaration file `glsl.d.ts`:

```ts title="glsl.d.ts"
declare module "*.glsl" {
  const value: string;
  export default value;
}
```

One might have noticed that `time` is also uniform. This is to keep an internal state of how fast animations go internally, as GLSL does not have access to the frames per second of our `<Canvas/>`. To keep track of this, we use the `useFrame` hook of R3F:

```tsx
const ref = useRef<myPoints>(null!); // Will later be referenced on the JSX
useFrame((state) => {
  ref.current.material.uniforms.time.value = state.clock.elapsedTime;
});
```

## 2.3.2 The geometries

Following up on what was discussed in the [chapter 2.1](/projects/particle-showcase/shader), the Buffer contains different `position` values, that store the different vertices that compose the geometry. For declaring these values, R3F offers us **Computed Attributes**, which look like this:

```tsx
<ComputedAttribute
  name="position"
  compute={() => {
    const geometry1 = new THREE.BoxGeometry(1, 1, 1, 16, 16, 16);
    const geometry1Attribute = new THREE.BufferAttribute(
      geometry1.attributes.position.array,
      3
    );

    return geometry1Attribute;
  }}
  usage={THREE.StaticReadUsage}
/>
```

This previous example stores in the `position` variable a simple Box Geometry divided in 16 for each axis (x,y and z). Now, in order to create the initial effect of assemblin the geometry, we need a cloud of points.

In order to achieve this effect,we need to create another box geometry and randomize the vertice's position and return it as a `THREE.BufferAtribute`:

```tsx
<ComputedAttribute
  name="position2"
  compute={() => {
    const geometry1 = new THREE.BoxGeometry(1, 1, 1, 16, 16, 16);
    const geometry2 = new Float32Array(geometry1.attributes.position.count * 3);

    for (let i = 0; i < geometry1.attributes.position.count * 3; i++) {
      geometry2[i] = (Math.random() - 0.5) * 10;
    }
    const geometry2Attribute = new THREE.BufferAttribute(geometry2, 3);
    return geometry2Attribute;
  }}
  usage={THREE.StaticReadUsage}
/>
```

> The `THREE.BufferAttribute` takes two arguments, the Float32 array, and the item size to decode it. As we're working with 3 dimensions (a.k.a `Vector3`'s), we declare as second parameter a `3`

The rest of the models simply come from our `.glb` files and we compute them the same way:

```tsx
import { GLTFLoader } from "three";

const king = useLoader(GLTFLoader, "models/king.glb");
const lightBulb = useLoader(GLTFLoader, "models/lightbulb.glb");
const rocket = useLoader(GLTFLoader, "models/rocket.glb");

const models = [king, lightBulb, rocket];

...

{models.map((model, index) => {
          return (
            <ComputedAttribute /
              name={`position${index + 3}`}
              compute={() => {
                const geometryAttribute = new THREE.BufferAttribute(
                  model.nodes.targetModel.geometry.attributes.position.array,
                  3
                );
                return geometryAttribute;
              }}
              usage={THREE.StaticReadUsage}
            />
          );
        })}
```

> The `targetModel` node was specifically called like so in our 3D object inside the .`blender` files. Otherwise, the iteration would have to access different names.

## 2.3.3 Animations

For the animations, we use the `useEffect` hook to manage our shader uniforms and change the position with the `tic` variable:

```tsx
 let interval = setInterval(() => {
      if (tick == 3) {
        tick = 0;
        resetTick();
      } else {
        ++tick;
        incTick();
      }
```

Then we use [Gsap](https://greensock.com/gsap/) to interpolate the values and create smooth animations based on the `tick` value.

```tsx
switch (tick) {
   case 0:
     gsap.to(params, {
       state1: 1.0,
       state2: 1.0,
       state3: 1.0,
       duration: 1.25,
       ease: "circ.out",
       onUpdate: () => {
         setParams({
           state1: params.state1,
           state2: params.state2,
           state3: params.state3,
         });
       },
     });
    break;
    ...
```

> Gsap is an animation library. Their API can be quickly explained with this graph:

<iframe height="800" width="100%" scrolling="no" title=" Preview: GreenSock Ease Visualizer" src="https://codepen.io/Wpitallo/full/KKwLqLd" frameBorder="no" loading="lazy"/>

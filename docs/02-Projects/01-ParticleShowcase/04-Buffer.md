# Buffer

The `<Buffer/>` component is composed of two main aspects: The geometry and the material.

```tsx title="src/Buffer.tsx"
<points ref={ref}>
  <bufferGeometry>...</bufferGeometry>
  <shaderMaterial>...</shaderMaterial>
</points>
```

## The shader material

The material of this object is nothing like any other. Luckily, R3F allows us to create materials of our own, by creating a `shaderMaterial` and passing our own fragment and vertex shaders, as well as any uniforms we might pass onto them:

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

:::tip
When importing GLSL files, Typescript doesn't know what to make of them. To tell typescript to import them as strings, you can create a declaration file `glsl.d.ts`:

```ts title="glsl.d.ts"
declare module "*.glsl" {
  const value: string;
  export default value;
}
```

:::

You might have noticed that `time` is also uniform. This is to keep an internal state of how fast animations go internally, as GLSL does not have access to the frames per second of our `<Canvas/>`. To keep track of this, we use the `useFrame` hook of R3F:

```tsx
const ref = useRef<myPoints>(null!); // Will later be referenced on the JSX
useFrame((state) => {
  ref.current.material.uniforms.time.value = state.clock.elapsedTime;
});
```

## The geometries

Following up on what we talked about in the [shader](/docs/Projects/ParticleShowcase/Shader) section, the Buffer contains different `position` values, that store the different vertices that compose the geometry. For, that, R3F offers us **Computed Attributes**, which look like this:

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

Great! Now we have the first geometry: The box. What about the cloud of points? Let's first create Float32Array from a simple cube

```tsx
<ComputedAttribute
  name="position2"
  compute={() => {
    // highlight-next-line
    const geometry1 = new THREE.BoxGeometry(1, 1, 1, 16, 16, 16);
    // highlight-next-line
    const geometry2 = new Float32Array(geometry1.attributes.position.count * 3);
    ...
  }}
  usage={THREE.StaticReadUsage}
/>
```

Now, in order to make those vertex _explode_ into a cloud of points, we need to randomize their position and return it as a `THREE.BufferAtribute`.

```tsx
<ComputedAttribute
  name="position2"
  compute={() => {
    const geometry1 = new THREE.BoxGeometry(1, 1, 1, 16, 16, 16);
    const geometry2 = new Float32Array(geometry1.attributes.position.count * 3);
    // highlight-start
    for (let i = 0; i < geometry1.attributes.position.count * 3; i++) {
      geometry2[i] = (Math.random() - 0.5) * 10;
    }
    const geometry2Attribute = new THREE.BufferAttribute(geometry2, 3);
    return geometry2Attribute;
    // highlight-end
  }}
  usage={THREE.StaticReadUsage}
/>
```

:::info
The `THREE.BufferAttribute` takes two arguments, the Float32 array, and the item size to decode it. As we're working with 3 dimensions (a.k.a `Vector3`'s), we use a 3.
:::

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

:::info
The `targetModel` node was specifically called like so in our 3D object inside the .`blender` files. Otherwise, the iteration would have to access different names.
:::

## Animations

For the animations, we use the `useEffect` hook to manage our shader uniforms and change the position with the `tic` variable.

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

:::tip
Gsap is an animation library. Their API can be quickly explained with this graph:
:::

<iframe height="800" width="100%"  scrolling="no" title=" Preview: GreenSock Ease Visualizer" src="https://codepen.io/Wpitallo/full/KKwLqLd" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
</iframe>
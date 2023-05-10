# An introduction

Before diving into the projects, we should first discuss the tech stack that we'll be using and a bit about them.

:::info
You don't need to know about 3D engines of any of that sort. However, this documentation will assume you know the basics of [React.js](https://react.dev) and TypeScript. 
:::


## The tech stack

It's important to have a scope of what the layers of abstraction exist between what we write and what we see on the screen. In our case, we start with WebGL, the standard way of having 3D graphics on our navigators(at least until [WebGPU](https://developer.chrome.com/blog/webgpu-release/) takes over).

[WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) offers very low-level control over the rendering process, and it is all encapsulated in the familiar HTML `<canvas>` element.  

[Three.js](https://threejs.org/), the next layer of abstraction, makes it simple to create 3D graphics with JavaScript classes. This makes it simple to create simple geometric shapes, such as cubes, spheres, among others.


Naturally, Three.js takes an imperative coding approach, and what better than [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) to add the last layer of abstraction, where one can write simple React components with the familiar `jsx` code declaratively and achieve beautiful, modern, and interactive 3D components for the web.

![Image](/img/optIns.png)

## An Overview of Shaders

Some of the projects will lean heavily on shaders. Shaders are just a way of handling the rendering of certain objects in a very low-level-abstraction way, directly to the WebGL compiler. It is quite complex at, first, and it is compiled in the GLSL programming language.

 It is often used for particularly peculiar tasks that require a very surgical control of the rendering process. As Patricio Gonzalez put it in his book [The Book of Shaders](https://thebookofshaders.com):

 > In shader-land we don’t have too many resources for debugging besides assigning strong colors to variables and trying to make sense of them. You will discover that sometimes coding in GLSL is very similar to putting ships inside bottles. Is equally hard, beautiful and gratifying.

 ![image](/img/shaderBook.png)




## What does a React 3D component look like?


Fortunately, not everything will require to be handled in GLSL. React-three-fiber can greatly help us simplify the interactivity and rendering process. I'll take a great example from React Three Fiber. If you're familiar with React, this will look familiar:


```tsx
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += delta))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

createRoot(document.getElementById('root')).render(
  <Canvas>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} />
  </Canvas>,
)
```

:::tip
Do you want to try it yourself? Check out this sandbox:
:::

[![Image](/img/basic-app.gif)](https://codesandbox.io/s/icy-tree-brnsm?file=/src/App.tsx)


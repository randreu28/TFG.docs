---
title: An introduction
---

# 1. An introduction

Hello! My name is and welcome to the documentation of my bachelor's thesis. The thesis is about the creation of a gallery of interactive applications with 3D components. This documentation will walk you through the different projects that I worked on, as well as the implementation and the decision-making of all the technological architecture. Feel free to check it out!

The purpose of this documentation is to present the findings and outcomes of [the author](https://randreu.dev)'s bachelor thesis. The thesis focuses on the development and implementation of a gallery comprising interactive applications with 3D components. This chapter provides an introduction to the thesis and outlines the structure of the documentation, as well as some key concepts that will later be of utility for the rest of the documentation.

## 1.1 Scope

This documentation assumes a basic understanding of [React.js](https://react.dev) and TypeScript, while no prior knowledge of 3D engines is required.

## 1.2 Technology stack

It is essential to understand the layers of abstraction that exist between the code and the visual output on the screen. The following technologies are utilized:

### 1.2.1 WebGL

[WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) serves as the primary framework for rendering 3D graphics in web browsers. It offers low-level control over the rendering process and is encapsulated within the HTML `<canvas>` element.

### 1.2.2 Three.js

[Three.js](https://threejs.org/) is a JavaScript library that provides a higher level of abstraction for creating 3D graphics. It simplifies the process of generating geometric shapes, such as cubes and spheres, by utilizing JavaScript classes.

### 1.2.3 React Three Fiber (R3F)

[React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) is a library that further abstracts the development process by enabling the creation of React components for modern and interactive 3D elements. It combines the declarative nature of React with the imperative approach of Three.js.

![Image](/img/optIns.png)

> It is worth mentioning that the current era of 3D visualization is changing. In this docuemntation's case, it was chosen to work with the currently established WebGL 3D render motor, which has been the standard for the web for many years now. <br/><br/>But do note that the upcoming [WebGPU](https://developer.chrome.com/blog/webgpu-release/) technology might replace it in the incoming years.

## 1.3 An Overview of Shaders

This chapter provides an overview of shaders, which play a significant role in several projects within the gallery. Shaders enable low-level control over the rendering of specific objects by interacting directly with the WebGL GLSL compiler.

<div class="hidden lg:block">

> Although shaders may initially appear complex, they possess a visual nature. The following example illustrates a shader code snippet:

<iframe height="550" width="1000" class="-translate-x-36"  title="Shaders" src="https://actarian.github.io/vscode-glsl-canvas/?glsl=buffers" frameBorder="no" loading="lazy"/>

<br/> <br/>

<div/>

Shaders are primarily used for tasks that require precise control over the rendering process. As expressed by Patricio Gonzalez in his book "[The Book of Shaders](https://thebookofshaders.com)":

> "In shader-land we don’t have too many resources for debugging besides assigning strong colors to variables and trying to make sense of them. You will discover that sometimes coding in GLSL is very similar to putting ships inside bottles. Is equally hard, beautiful and gratifying."

![image](/img/shaderBook.png)

## 1.4 React 3D Components

Fortunately, not all aspects of the project necessitate handling in GLSL. React Three Fiber provides significant assistance to developers in simplifying the interactivity and rendering process. To illustrate this, let's examine an exemplary code snippet from React Three Fiber. If you are familiar with React, you will find this code structure familiar:

```tsx
import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += delta));
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

createRoot(document.getElementById("root")).render(
  <Canvas>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} />
  </Canvas>
);
```

<iframe src="https://codesandbox.io/embed/icy-tree-brnsm?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="icy-tree-brnsm"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   />

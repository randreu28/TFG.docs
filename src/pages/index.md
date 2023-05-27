---
title: TFG Docs
---

# TFG Docs - A bachelor's thesis on 3D components

Welcome to my TFG Docs. This is the documentation of my bachelor's thesis. Feel free to check it out!

## What is this about?

The thesis is about the creation of a **gallery of interactive applications with 3D components**. This documentation will walk you through the different projects that I worked on, as well as the implementation and the decision-making of all the technological architecture.

## Can I see it?

Yes! The projects are very visual. You can check them out in the [showcase](/showcase) section

## Who is this for?

This is for everyone interested in knowing more about interactive 3D components for the web. It will be especially interesting to people with technical knowledge of software development and a base knowledge of [React.js](https://react.dev/).

## Special thanks

Special thanks to [Pau Fernandez](https://github.com/pauek) for mentoring me throughout the project!

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
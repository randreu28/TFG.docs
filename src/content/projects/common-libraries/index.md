---
title: Common libraries
pagination: 03
---

# 3. Common libraries

Throughout all the projects, there are some libraries that were used repeatedly that aren't meant to be the main focus of the thesis. This chapter intends to give a quick summary of how they work.

## 3.1 Leva Controls

[Leva](https://github.com/pmndrs/leva) is a GUI library commonly used alongside R3F to debug and have some visual controls over the parameters of your 3D scene.

These controls are commonly employed for debugging purposes, as it may be necessary to experiment with different values to achieve the desired outcome. Using an interactive user interface allows for easier adjustment of these values, eliminating the need to reload the application each time changes are made in order to validate their effects.

> Leva was created by the Pmndrs collective, the same open-source developer collective who created R3F. This is why there are many examples of 3D scenes with these controls:

<iframe class="print:hidden" src="https://codesandbox.io/embed/r3f-morphtargets-demo-n0wlx?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.jsx&theme=dark"
    width="100%" height="500"
     title="R3F MorphTargets Demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   />

<br/> <br/ >

## 3.2 Zustand / Jotai

[Zustand](https://github.com/pmndrs/zustand), as well as [Jotai](https://jotai.org/) are both state management libraries to create stores and share values across a React application. They are often used throughout the projects to avoid [Prop drilling](https://dev.to/codeofrelevancy/what-is-prop-drilling-in-react-3kol#:~:text=Prop%20drilling%20is%20the%20process,layers%20of%20a%20component%20hierarchy.). Here's a Zustand example:

<iframe class="print:hidden" src="https://zustand-demo.pmnd.rs/" class="-translate-x-12" width="800" height="600"/>

<br/> <br/>

## 3.3 @a7sc11u/scramble

@a7sc11u/scramble is a library that provides scrambling text animations with a simple React component.

```tsx
<TextScramble className="..." as="span" text={"Hello scramble"} />
```

> By the time this documentation was written, the the creator of this small library discontinuated it. Now, a new lightweight package (1KB) with the same creator was made, which offers a new recommended way with a custom hook approach, written in TypeScript:

<iframe class="print:hidden" src="https://www.use-scramble.dev/" width="100%" height="400" />

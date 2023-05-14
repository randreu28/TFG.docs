# Common libraries

Throughout all the projects, there are some libraries that I used repeatedly that aren't meant to be the main focus of the thesis. This section intends to give a quick summary of how they work.

## Leva Controls

[Leva](https://github.com/pmndrs/leva) is a GUI library commonly used alongside R3F to debug and have some visual controls over the parameters of your 3D scene.

These controls are often used as debugging porpuses, as sometimes you need to play around the values to get the perfect value, and it is way easier to do so on an interactive UI than to reload each time to see your changes.

:::info
Leva was created by the Pmndrs collective, the same open-source developer collective who created R3F. This is why there are many examples of 3D scenes with these controls:
:::

<iframe src="https://codesandbox.io/embed/r3f-morphtargets-demo-n0wlx?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.jsx&theme=dark"
    width="100%" height="500"
     title="R3F MorphTargets Demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   />

## Zustand / Jotai

[Zustand](https://github.com/pmndrs/zustand), as well as [Jotai](https://jotai.org/) are both state management libraries to create stores and share values across a React application. They are often used throughout the projects to avoid [Prop drilling](https://dev.to/codeofrelevancy/what-is-prop-drilling-in-react-3kol#:~:text=Prop%20drilling%20is%20the%20process,layers%20of%20a%20component%20hierarchy.). Here's a Zustand example:

<iframe src="https://zustand-demo.pmnd.rs/" width="100%" height="800"/>

## @a7sc11u/scramble

This is a library that provides scrambling text animations with a simple React component.

```tsx
<TextScramble className="..." as="span" text={"Hello scramble"} />
```

:::tip
By the time this documentation was written, the the creator of this small library discontinuated it. Now, a new lightweight package (1KB) with the same creator was made, which offers a new recommended way with a custom hook approach, written in TypeScript:

<iframe src="https://www.use-scramble.dev/" width="100%" height="400" />
:::

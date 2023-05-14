# Common libraries

Throughout all the projects, there are some libraries that I used repeatedly that aren't meant to be the main focus of the thesis. This section intends to give a quick summary of how they work.

## Leva Controls

[Leva](https://github.com/pmndrs/leva) is a GUI library commonly used alongside R3F to debug and have some visual controls over the parameters of your 3D scene.

For example, this example creates different values of all sorts (0 to 1 values, colors, or even Vector3's) in a folder called "Scene".

:::info
A [Vector3](https://threejs.org/docs/#api/en/math/Vector3) is the three.js way of describing tridimensional vectors, a point in space, etc. They are declared with an x,y, and z coordinate and are often used to describe positions.
:::

```tsx
const { vignette, backgroundColor, camPosition } = useControls("Scene", {
  vignette: { value: 0.5, min: 0, max: 1 },
  backgroundColor: "#191a2e",
  camPosition: [4, 3, 4],
});
```

![Image](/img/levaExample.png)

These controls are often used as debugging porpuses, as sometimes you need to play around the values to get the perfect value, and it is way easier to do so on an interactive UI than to reload each time to see your changes.

## Zustand / Jotai

[Zustand](https://github.com/pmndrs/zustand), as well as [Jotai](https://jotai.org/) are both state management libraries to create stores and share values across a React application. They are often used throughout the projects to avoid [Prop drilling](https://dev.to/codeofrelevancy/what-is-prop-drilling-in-react-3kol#:~:text=Prop%20drilling%20is%20the%20process,layers%20of%20a%20component%20hierarchy.). Here's a Zustand example:

<iframe src="https://zustand-demo.pmnd.rs/" width="100%" height="800"/>

## @a7sc11u/scramble

This is a library that provides scrambling text animations with a simple React component.

```tsx
<TextScramble
      className="..."
      as="span"
      text={"Hello scramble"}
    />
```

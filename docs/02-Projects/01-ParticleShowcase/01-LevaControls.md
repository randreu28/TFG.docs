# Leva controls

[Leva](https://github.com/pmndrs/leva) is a GUI library commonly used alongside R3F to debugg and have some visual controls over the parameters of your 3D scene.

For example, this example creates different values of all sorts (0 to 1 values, colors, or even Vector3's) in a folder called "Scene". 

:::info
A [Vector3](https://threejs.org/docs/#api/en/math/Vector3) is the three.js way of describing tridimensional vectors, a point in space, etc. They are declared with an x,y and z coordinate and often used to describie positions.
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

In this projcets, I initially installed it as a developement dependency, but found out that it was more clear how the project worked if you had the variabales visible and could see how the scene changed alongside them.

---
title: Model visualization
pagination: 5.2
---

# 5.2 Model Visualization

### 5.2.1 Animations

Loading unknown models can present challenges because the structure of the GLTF scene and its animations may vary. However, TriArt addresses this issue with its `<Model/>` component, which provides a solution for accessing animations:

```tsx title="src/components/Scene.tsx"
function Model({ url }: Props) {
  const { scene, animations } = useGLTF(url);

  // Animations
  const { animationClips, defaultAnimationsControls, mixer } = useMemo(() => {
    const mixer = new THREE.AnimationMixer(scene);
    const animationClips: any = [];
    let defaultAnimationsControls: any = {};

    for (let a of animations) {
      let action = mixer.clipAction(a);
      animationClips[a.name] = action;
      defaultAnimationsControls[a.name] = false;
    }

    return { defaultAnimationsControls, animationClips, mixer };
  }, [animations, scene]);
}
```

When working with unknown models, maintaining type-safety can become challenging because you lack information about the specific model's structure. In such cases, it becomes necessary to use the `any` type, which allows for flexibility in handling dynamic and unknown data.

By using the `any` type, you can bypass strict type-checking and handle the model data in a more generic and adaptable manner. This enables you to access properties and perform operations on the model without explicitly defining their types, accommodating the unknown nature of the data.

While relying on the `any` type sacrifices some level of type-safety, it becomes justified in situations where the model's structure is unknown or variable. It allows you to work with the data without imposing strict type constraints, ensuring compatibility with different model formats and variations.

The `useMemo` hooks from the previous code snippet gives us 3 variables: the `defaultAnimationsControls`, which allow us to create the [Leva controls](/projects/common-libraries#31-leva-controls) later, the list of `animationClips` available, and the `mixer`, which takes care of handling the animations.

Now let us not forget that the `THREE.AnimationMixer` needs to be updated with the frame rate of our `<Canvas/>`, so we use the `useFrame` hook from R3F to keep it updated:

```tsx
useFrame((_, delta) => {
  mixer.update(delta);
});
```

## 5.2.2 Scale normalization

Lastly, we need to take care of the size of the model. We don't know how big or small the model might be, but we want the user to be able to see it in a proportion that fits on the canvas. To do so, we check the size of it with `useEffect`:

```tsx
useEffect(() => {
  const sceneSize = new THREE.Box3()
    .setFromObject(scene)
    .getSize(new THREE.Vector3()); //Measures the scenesice with a box
  const maxExtent = Math.max(sceneSize.x, sceneSize.y, sceneSize.z);
  const scale = (1 / maxExtent) * 5; //Sets the max scale to one standard `<Canvas/> unit, and multiplies it by 5
  scene.scale.set(scale, scale, scale); //Sets the computed scale into the loaded scene
}, [scene]);
```

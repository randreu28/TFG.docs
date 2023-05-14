# Model Visualization

### Animations

Loading unknown models has some downsides, as you don't know what the GLTF scene will look like. So how would you access the animations, if they had any? That is TriArt `<Scene/>` component resolves:

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

:::info
As you might have noticed, the type-safety goes out the window once you don't have the information of the model you're working on. It's one of the rare cases where `any` is justified.
:::

This gives us 3 variables: the `defaultAnimationsControls`, which allow us to create the [Leva controls](/docs/common-libraries#leva-controls) later, the list of `animationClips` available, and the `mixer`, which takes care of handling the animations.

Now let us not forget that the `THREE.AnimationMixer` needs to be updated with the frame rate of our `<Canvas/>`, so we use the `useFrame` hook from R3F to keep it updated:

```tsx
useFrame((_, delta) => {
  mixer.update(delta);
});
```

## Scale normalization

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


# Particle Showcase

:::info
Check out the live version [here](https://particle-showcase.vercel.app/)
:::

[![image](/img/particleShowcase.png)](https://particle-showcase.vercel.app/)

```bash
git clone https://github.com/randreu28/TFG.particle-showcase.git
cd TFG.particle-showcase
yarn install
yarn dev
```

## Modeling workflow

```bash
yarn model
yarn watch
```

## Overview

```tsx title="/src/App.tsx"
<Canvas>
  <PerspectiveCamera makeDefault position={camPosition} />
  <color attach="background" args={[backgroundColor]} />
  <EffectComposer>
    <Vignette eskil={true} opacity={vignette} offset={0.1} darkness={1.5} />
  </EffectComposer>
  <OrbitControls />
  <Buffer />
</Canvas>
```

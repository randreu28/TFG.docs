---
title: TODO
---

# Dynamic text

The dynamic text component relys on the [scrambleUI](/docs/common-libraries#a7sc11uscramble) library.

From the `<Buffer/>` component, we cycle between the tick state, which is what marks the speed at which the buffer changes of geometry. We used a simple [zustand](/docs/common-libraries#zustand--jotai) store (Similiar to Redux) to get it and we attach it to the `<TextScramble/>` component that takes care of the rerendering animations.

```tsx
import { TextScramble } from "@a7sc11u/scramble";
import useStore from "./store/store";
import { useControls } from "leva";

export default function DynamicText() {
  let tick = useStore((state) => state.tick);

  const [params] = useControls("Texts", () => ({
    text1: "design experiences",
    text2: "love to innovate",
    text3: "think creatively",
    text4: "solve problems",
  }));

  const text: string[] = Object.values(params);

  return <TextScramble className="..." as="span" text={text[tick]} />;
}
```

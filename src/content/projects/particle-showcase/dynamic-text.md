---
title: Dynamic text
pagination: 4.2
---

# 4.2 Dynamic text

The dynamic text component in this project utilizes the [scrambleUI](/projects/common-libraries#33-a7sc11uscramble) library.for the text animations. To implement this, we cycle between different texts based on the tick state, which determines the speed at which the buffer changes its geometry.

To access the tick state, a [Zustand](/projects/common-libraries#32-zustand--jotai) store (similar to Redux) is used. The tick value is obtained from the store using the useStore hook. This tick value is then used to retrieve the corresponding text from an object of text values.

The `useControls` hook from the [leva](/projects/common-libraries#31-leva-controls) library is used to define the texts and their initial values in a control panel.

As seen beolow, the `<TextScramble/>` component receives the className prop for styling purposes, the as prop to specify the HTML element to be rendered, and the text prop, which is set to the current text based on the tick value:

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

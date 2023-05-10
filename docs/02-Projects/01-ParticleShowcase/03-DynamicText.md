# Dynamic text

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

  return (
    <TextScramble
      className="bg-[#ef079b] bg-gradient-to-br text-transparent from-[#f8665d] via-[#f8665d] bg-clip-text"
      as="span"
      text={text[tick]}
    />
  );
}
```

---
title: Project 1
---

# Project 1

This Markdown file creates a page

It probably isn't styled much, but Markdown does support:

- **bold** and _italics._
- lists
- [links](https://astro.build)
- and more!

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum enim nec enim porta blandit. Donec euismod massa justo. Donec aliquet euismod tellus, nec luctus metus vulputate non. Curabitur laoreet condimentum velit et rhoncus. Integer ut consequat nisi, at ultricies felis. Morbi sed felis non neque semper ullamcorper at eleifend nulla. Mauris pulvinar tristique ligula sit amet molestie. Nunc venenatis nulla vel cursus vulputate. Integer viverra quam ut libero cursus dignissim. Nulla non elit cursus, posuere ante tincidunt, mattis risus. Nulla efficitur elit eros, faucibus tristique tortor accumsan at. Suspendisse feugiat, augue vitae tincidunt sollicitudin, turpis eros ultrices arcu, sit amet ornare est nulla in lorem.

Curabitur vitae ante elit. Nam nec felis felis. Nullam quis dapibus felis, eget aliquet magna. Donec lacus augue, ullamcorper vitae mauris quis, ultricies tempor arcu. Cras dictum turpis sed ullamcorper rhoncus. Vivamus blandit ultrices dui, sed ultrices purus eleifend in. Mauris vel semper orci. Donec posuere et quam non varius. Donec erat ante, elementum at turpis vitae, consequat egestas erat. Nulla dictum suscipit viverra. Nam convallis ac sem eu consequat. Phasellus consequat aliquet magna. Mauris id imperdiet sem.

Phasellus fermentum turpis cursus velit aliquet, vel feugiat libero mollis. In ac fringilla lectus. In hac habitasse platea dictumst. Sed tellus orci, condimentum eu justo sit amet, dignissim pellentesque neque. Cras dapibus ipsum ut enim sodales, at porttitor lorem venenatis. Fusce luctus aliquet dui ac scelerisque. Donec bibendum pretium velit faucibus malesuada. Cras vel est consequat nisi dictum viverra eu ut dolor. Phasellus dictum efficitur interdum.

```tsx
import fragment from "../shaders/fragment.glsl"; // From shaderToy
import vertex from "../shaders/vertex.glsl"; // From shaderToy

export default function Model() {
  //...
  const ShaderMaterial = shaderMaterial(
    {
      iTime: 0,
      iResolution: new THREE.Vector3(
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
      ),
      iChannel0: textures[activeTextures.iChannel0], // From the leva controls
      iChannel1: textures[activeTextures.iChannel1],
      iChannel2: textures[activeTextures.iChannel2],
    },
    vertex,
    fragment
  );
  //...
}
```

# Shader

:::tip
This section relies heavily on GLSL. I will cover only the essential parts. If you're unfamiliar with shaders and want to learn more, check out the [Book of shaders](https://thebookofshaders.com)
:::

If you've scouted around the `<Buffer/>` component, you will know that there is a lot going on. Let's try to make sense of it all before diving into the code.

The reason why the component is called Buffer is that it works as a temporary "box" of information. Each 3D object has a lot of properties, such as its materials, its position and rotation relative to the 3D environment, its scale, and their opacity... But what we will focus here is on their geometry.
The geometry of a 3D object consists of two things: Vertices and Fragments.

:::info
**Vertices** are 3D points in space. They don't occupy real space, and they only function as connectors for the **Fragments**, which are what connect the vertices from one another, and paint pixels on the screen.
:::

This component is all about the Vertices, as they are particles, little dots in space that aren't connected between one another directly.

<img src="/img/shaderExplanation.png" size="50%" width="50%"/>

The vertices are saved in a [Float32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array), which saves thousands of numbers that are later decoded into what you see, in an attribute called `position`.

Now, our `<Buffer/>` is really not just one object, is it? It is rather all of them, but it changes every x time. So what I did was to have a box, where I initially declared different _positions_, a.k.a different objects: A lightbulb, a chess piece, a box... and I interchanged between these positions:

```glsl title="src/shader/vertex.glsl"
attribute vec3 position; // Box geometry
attribute vec3 position2; // Random cloud geometry
attribute vec3 position3; // Rocket geometry
attribute vec3 position4; // Lightbulb geometry
attribute vec3 position5; // Chess piece
...
```

We also need a way to change these geometries, as well as other aspects of the shader, such as the particle size, color, transparency, speed... And for that, we use **uniforms**, which will be changed on our tsx code as you normally would.

:::info
A `uniform` is the bridge between the GLSL code and the tsx code. They are _parameters_ that are passed onto the shader and computed to create the effects we see on the screen.
:::

These uniforms are then used to interpolate between the different geometries using the `mix` GLSL function.

```glsl
//Cycles between geometries
vec3 switchGeometry3 = mix(position5, position, state3);
vec3 switchGeometry2 = mix(position4, switchGeometry3, state2);
vec3 switchGeometry1 = mix(position3, switchGeometry2, state1);
vec3 switchGeometry = mix(position2, switchGeometry1, randomState);
```

Think of the mix function as a scale. The first two parameters are both sides of the scale. The third value (a number between 0 and 1) is what determines how left or how right will the balance end up going.

<img src="/img/mixer.png" size="80%" width="80%"/>

Finally, we add some idle animations to the geometries, as it is what makes the geometry look organic and alive. For that, we will use a simple sinus animation (up and down) and make use of the Perlin noise function, by Stefan Gustavson.

:::info
Perlin Noise is a mathematical function that uses interpolation between a large number of precomputed gradient vectors that construct a value that varies pseudo-randomly in space or time. It makes it appear as if the particles were moving in all directions randomly.
:::

```glsl
//IdleAnimation
float sinusAnimation = sin(modelPosition.x * 5.0 + time*2.5) * 0.02;
float perlinNoiseAnimation = cnoise(vec3(modelPosition.yz, time*0.5))*0.05;
float idleAnimation = mix(sinusAnimation,perlinNoiseAnimation, 0.5);
```

The fragment shader is a bit simpler. All you need to know is that it takes care of the color of the pixels (hence the buffer color and transparency are used here).

```glsl title="src/shader/fragment.glsl"
uniform vec3 bufferColor;
uniform float transparencyState;

void main()
{
    //make particles round
    vec2 xy = gl_PointCoord.xy - vec2(0.5);
    float ll = length(xy);
    float round = step(ll, 0.5);
    float finalAlpha = round;
    finalAlpha *= transparencyState;

    gl_FragColor = vec4(bufferColor, finalAlpha);
}
```

:::caution
You might have noticed that the particles, although we try to make them round, are nothing but little black squares with circles in the middle. This is because **transparency in the GLSL world is a myth**.

To truly create rounded circles, one would have to create lots of rounded circles squashed together to make the impression of truly "transparent" borders. For convenience purposes, in this case, we treated each circle as one vertex and one only.
:::

![image](/img/roundedShaders.png)

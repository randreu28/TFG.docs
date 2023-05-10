# Shader

```glsl
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

...

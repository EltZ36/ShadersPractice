#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.609);
}

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(-0.370,-0.430)))
                * 43758.489);
}

// Gradient Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/XdXGW8
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

float noise2(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f*f*(3.0-2.0*f);
    return mix( mix( random( i + vec2(0.0,0.0) ),
                     random( i + vec2(1.0,0.0) ), u.x),
                mix( random( i + vec2(0.0,1.0) ),
                     random( i + vec2(1.0,1.0) ), u.x), u.y);
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.0);

    float t = 0.1;
    // Uncomment to animate
    t = abs(1.0-sin(u_time*.1))*5.;
    // Comment and uncomment the following lines:
    st += noise(st*2.336) * t; // Animate the coordinate space
    color = vec3(0) * dot(st, vec2(noise2(st))); // Big black drops
    color += dot(vec2(0.740,0.680),vec2(noise2(st * 10.288))); // Black splatter
    color -= smoothstep(0.478,.4,noise2(st*10.224)); // Holes on splatter

    gl_FragColor = vec4(1.0 - color + vec3(0.316,0.554,0.680),1.0);
}
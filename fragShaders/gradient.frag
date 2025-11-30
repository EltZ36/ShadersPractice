//from book of shaders at https://thebookofshaders.com/06/

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

float easeInElastic(float x){
    return x < 0.5
    ? 0.5 * sin(+13.0 * PI * 2.0 * x) * pow(2.0, 10.0 * (2.0 * x - 1.0))
    : 0.5 * sin(-13.0 * PI * ((2.0 * x - 1.0) + 1.0)) * pow(2.0, -10.0 * (2.0 * x - 1.0)) + 1.0;
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    vec3 pct = vec3(st.x);

    //do the challenge for the style sunset;
    vec3 startColor = vec3(0.149,0.141,0.912);
    vec3 endColor = vec3(2.000,0.833,0.224);

    vec3 mixedColor = mix(startColor, endColor, pct);
    
    //color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(mixedColor,2.0);
}  
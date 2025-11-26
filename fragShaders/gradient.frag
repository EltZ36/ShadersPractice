//from book of shaders at https://thebookofshaders.com/06/

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_time;

float easeInElastic(float x){
    const c4 = ( 2 * PI) / 3.0;

    if(x == 0){
        return 0.0;
    }
    else if(x == 1){
        return 1;
    }
    else{
        return -pow(2.0, 10.0 * x - 10) * sin((x * 10 * 10.75) * c4)
    }
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    //do the challenge for the style sunset;
    vec3 startColor = vec3(0.0,0.0,0.0);
    vec3 endColor  = vec3(0.0,0.0,0.0);

    vec3 mixedColor = vec3(0.0,0.0,0.0);
    
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
} 
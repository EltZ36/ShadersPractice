// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

mat2 rotate2d2(float _angle){
    return mat2(sin(_angle),-tan(_angle),
                tan(_angle),sin(_angle));
}


float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
}

float cross(in vec2 _st, float _size){
    return  box(_st, vec2(_size,_size/4.)) +
            box(_st, vec2(_size/4.,_size));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    float x = 0.520;
    float x1 = 0.848;
    float y = 0.478;
    // move space from the center to the vec2(0.0)
    st -= vec2(x,y);
    // rotate the space
    //st = rotate2d( tan(u_time) * ((3.0) * (PI / 4.0))) * st;

    st += rotate2d(1.0 * (tan(u_time) * PI /4.0)) * st;
    
    color += vec3(cross(st, 0.5));
    
    st += vec2(x1); 
    
    color += vec3(cross(st, 0.4));
    
    st -= vec2(x1 + x, y); 

    gl_FragColor = vec4(color,1.0);
}

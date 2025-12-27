#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
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

vec2 createTile(vec2 st, float row, float col){
    //no pointers so make tiles equal to st 
    st.x *= row;
	st.y *= col;
    return fract(st);
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    //multipying st increases the grid space that you have on the canvas
    st *= 5.0;
    
    //st = createTile(st, 1.0, 2.0);
 	
    st += u_time*0.5;

    vec2 ipos = floor(st);  // integer
    vec2 fpos = fract(st);  // fraction
    
    vec2 something = vec2( random(fpos), random(ipos));
    //color += something; 
    
    //color = step(tile.x,tile.y); 
    //color = vec3(fpos,0.0);
    vec3 color = vec3(0.0, 0.0, 0.0);
    color += mix(vec3(0.010,0.010,0.010), vec3(0.986,1.000,0.989),  box( vec2 (random(st), random(st)) , vec2(0.190,0.730) ));
    //gl_FragColor = vec4(vec3(fpos,0.0),1.0);
    gl_FragColor = vec4(vec3(color),1.0);
}
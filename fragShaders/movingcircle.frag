#ifdef GL_ES
precision mediump float;
#endif

const float PI = 3.1415926535897932384626433832795;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 movingTiles(vec2 _st, float _zoom, float _speed){
    _st *= _zoom;
    float time = u_time*_speed;
    //if( fract(time)>0.5 ){
        if (fract( _st.y * 0.5) > 0.5){
            _st = rotate2D(_st, PI);
            _st.x += fract(time)*2.0;
        } else {
            _st.x += fract(time)*2.0;
        }
    //} 
    return fract(_st); 
}



float circle(vec2 _st, float _radius){
    vec2 pos = vec2(0.510,0.020)-_st;
    return smoothstep(1.0-_radius,1.0-_radius+_radius*0.2,1.-dot(pos,pos)*3.14);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    st = movingTiles(st,10.,0.5);
    
    vec3 color = vec3( 0.944-circle(st, 0.908 ) );
    color += vec3(0.515,0.228,0.051);
    color = mix(color, vec3(0.671,0.810,0.727), 1.880);  
    
    gl_FragColor = vec4(color,1.0);
}

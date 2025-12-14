#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l)*4.0);
}

vec2 createTile(vec2 st, float row, float col){
    //no pointers so make tiles equal to st 
    st.x *= row;
	st.y *= col;
    return fract(st);
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
    _size = vec2(0.5)-_size*0.5;
    vec2 aa = vec2(_smoothEdges*0.5);
    vec2 uv = smoothstep(_size,_size+aa,_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    return uv.x*uv.y;
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    st = createTile(st, 3.0, 3.0);
    vec2 st2 = createTile(st, 3.0, 3.0);
    color = vec3(circle(st,0.364));
    vec3 color2 = vec3(circle(st2, 0.2));
    //vec3 color2 = vec3(box(st,vec2(0.920,0.890),0.01));
	gl_FragColor = vec4((vec3(0.450,0.600,0.324) + color) * (vec3(0.865,0.297,0.239) + color2),1.0);
}
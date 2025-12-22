#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

float circle(vec2 _st, float _radius, float circleX, float circleY){
    vec2 l = _st-vec2(circleX, circleY);
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

vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}


//from book of shaders chapter 9 
vec2 rotateTilePattern(vec2 _st){

    //  Scale the coordinate system by 2x2
    _st *= 2.0;

    //  Give each cell an index number
    //  according to its position
    float index = 0.0;
    index += step(1., mod(_st.x,2.0));
    index += step(1., mod(_st.y,2.0))*2.0;

    //      |
    //  2   |   3
    //      |
    //--------------
    //      |
    //  0   |   1
    //      |

    // Make each cell between 0.0 - 1.0
    _st = fract(_st);

    // Rotate each cell according to the index
    if(index == 1.0){
        //  Rotate cell 1 by 90 degrees
        _st = rotate2D(_st,PI*0.5);
    } else if(index == 2.0){
        //  Rotate cell 2 by -90 degrees
        _st = rotate2D(_st,PI*-0.5);
    } else if(index == 3.0){
        //  Rotate cell 3 by 180 degrees
        _st = rotate2D(_st,PI);
    }

    return _st;
}


void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    st = createTile(st, 3.0, 3.0);
    vec2 innerCircleSt = createTile(st, 3.0, 3.0);
    
    innerCircleSt = rotate2D(innerCircleSt, (atan(u_time * 20.0)));
    innerCircleSt = rotateTilePattern(innerCircleSt);
    innerCircleSt = rotate2D(innerCircleSt, (cos(u_time * PI / 4.0)));

    color = vec3(circle(st,0.364, 0.580,0.490));
    
    vec3 innerCircleColor = vec3(circle(innerCircleSt, 0.2, 0.510,0.020));

    //vec3 innerCircleColor = vec3(box(st,vec2(0.920,0.890),0.01));
	gl_FragColor = vec4((vec3(0.450,0.600,0.324) + color) * (vec3(0.865,0.297,0.239) + innerCircleColor),1.0);
}
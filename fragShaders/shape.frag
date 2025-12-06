#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//strange custom shape that I made. It can't really be made into a function and was more hard coded fun
void strangeShape(vec2 st){
    vec3 color = vec3(0.810,0.671,0.058);

    vec2 bl = smoothstep(vec2(0),st, 0.7 - st);       // bottom-left
	vec2 tr = smoothstep(vec2(2.0, 5.0), vec2(-0.88, -0.5), st / 0.1);
    vec2 tb = smoothstep(vec2(9.0, -4.0), vec2(1.8, 1.0), st / 0.1);
	//top-right
	//color = vec3(bl.x * bl.y * tr.x * tr.y);
    color = floor(vec3(bl.x + bl.y - tr.x - 1.1 * ((tr.y) / tb.x) + tb.y - 1.152));

    gl_FragColor = vec4(color,1.0);
}

vec3 createRectangle(vec2 st, float edge1, float edge2){

    vec2 bl = step(vec2(edge1),st);       // bottom-left
    vec2 tr = step(vec2(edge1),edge2-st);   // top-right
    vec3 color = vec3(bl.x * bl.y * tr.x * tr.y);

    return color; 
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 rectColor = createRectangle(st, 0.2, 1.5);
    vec3 rectColor2 = createRectangle(st, 0.1, 1.0);
   //vec3 combinedColor = vec3(0.1,0.6,0.8);
    vec3 combinedColor = rectColor + rectColor2;
    gl_FragColor = vec4(combinedColor,1.0);
}

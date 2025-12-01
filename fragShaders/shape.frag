#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.810,0.671,0.058);

    vec2 bl = smoothstep(vec2(0),st, 0.7 - st);       // bottom-left
	vec2 tr = smoothstep(vec2(2.0, 5.0), vec2(-0.88, -0.5), st / 0.1);
    vec2 tb = smoothstep(vec2(9.0, -4.0), vec2(1.8, 1.0), st / 0.1);
	//top-right
	//color = vec3(bl.x * bl.y * tr.x * tr.y);
    color = vec3(bl.x + bl.y - tr.x - 1.1 * ((tr.y) / tb.x) + tb.y - 1.152);

    gl_FragColor = vec4(color,1.0);
}

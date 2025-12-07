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

/*vec3 createcreateRect(vec2 st, float blx, float bly, float tr_x, float tr_y){
    vec2 bl = step(vec2(blx, bly),st);       // bottom-left
    vec2 tr = step(vec2(tr_x, tr_y), 1.0-st);   // top-right
    vec3 color = vec3(bl.x * bl.y * tr.x * tr.y);
    return color; 
}*/

//taken from https://github.com/michaelbromley/shader-playground/blob/master/mondrian.glsl 
float createRect(vec2 st, float blX, float blY, float trX, float trY){
    // bottom-left
    vec2 bl = step(vec2(blX, blY),st);
    float pct = bl.x * bl.y;
    // top-right
    vec2 tr = step(1.0 - vec2(blX, blY)- vec2(trX, trY), 1.0 - st);
    pct *= tr.x * tr.y;
    return pct;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    vec3 combinedColor = vec3(0.0);
    combinedColor += createRect(st, 0.100,0.210, 0.080,0.750);
    combinedColor += createRect(st, 0.780,0.250, 0.110,0.680);
    combinedColor += createRect(st, 0.460,-0.020, 0.080,1.000);
    combinedColor += createRect(st, 0.030,0.190, 0.950,0.030);
    combinedColor += createRect(st, 0.040,0.360, 0.870,0.120);
    combinedColor += createRect(st, 0.040,0.760, 0.980,0.060);
    combinedColor += createRect(st, 0.050,0.590, 0.950,0.030);
    
    gl_FragColor = vec4(combinedColor,1.0);
}

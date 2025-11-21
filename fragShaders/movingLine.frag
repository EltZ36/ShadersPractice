precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
   y = (sin(u_time + x)) + floor(sin(x))/atan(x); 
  gl_FragColor = vec4(sin(u_time), 0.8, 0.0, 0.8);;
}
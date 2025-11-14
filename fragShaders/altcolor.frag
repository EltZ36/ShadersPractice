precision mediump float;

uniform float u_time;

void main() {
  gl_FragColor = vec4(sin(u_time), 0.8, 0.0, 0.8);;
}
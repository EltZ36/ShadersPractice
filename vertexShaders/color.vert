//lines 2 to 24 taken from https://github.com/aferriss/p5jsShaderExamples/blob/gh-pages/1_basics/1-1_red/basic.vert
// this is an attribute sent to the shader by p5 
// it contains all of our vertex position information
// it is a vec3, meaning it contains x, y, and z data
// attribute signals that this is a global variable sent by the sketch
// it is read only, meaning it cannot be changed directly (you can copy it though)
// attributes exist in vertex shaders only
attribute vec3 aPosition;


void main() {
  vec4 positionVec4 = vec4(aPosition, 8.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  gl_Position = positionVec4;
}
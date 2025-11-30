attribute vec3 aPosition;

void main(){
    vec4 positionVec4 = vec4(aPosition, 0.5);
    positionVec4.xy = positionVec4.xy;
    gl_Position = positionVec4;
}
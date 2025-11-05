//shader setup based off of https://github.com/aferriss/p5jsShaderExamples/blob/gh-pages/1_basics/1-1_red/sketch.js
var simpleShader;

async function setup() {
  simpleShader = await loadShader(
    "./vertexShaders/color.vert",
    "./fragShaders/color.frag"
  );
  createCanvas(400, 400, WEBGL);
}

function draw() {
  background(220);
  ellipse(0, 0, 50, 50);
  shader(simpleShader);
  simpleShader.setUniform("u_time", millis() / 1000.0);
}

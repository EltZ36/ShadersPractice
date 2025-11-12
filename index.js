//shader setup based off of https://github.com/aferriss/p5jsShaderExamples/blob/gh-pages/1_basics/1-1_red/sketch.js

const simpleSketch = (p) => {
  var simpleShader;

  p.setup = async () => {
    simpleShader = await p.loadShader(
      "./vertexShaders/color.vert",
      "./fragShaders/color.frag"
    );
    p.createCanvas(400, 400, p.WEBGL);
  };

  p.draw = () => {
    p.background(220);
    p.ellipse(0, 0, 50, 50);
    p.shader(simpleShader);
    simpleShader.setUniform("u_time", p.millis() / 1000.0);
  };
};

new p5(simpleSketch, "simpleSketchCanvas");

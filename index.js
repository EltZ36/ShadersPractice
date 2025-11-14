//shader setup based off of https://github.com/aferriss/p5jsShaderExamples/blob/gh-pages/1_basics/1-1_red/sketch.js

const simpleSketch = (p) => {
  var simpleShader;
  var additionalShader;

  p.setup = async () => {
    p.createCanvas(400, 400, p.WEBGL);
    simpleShader = await p.loadShader(
      "./vertexShaders/color.vert",
      "./fragShaders/color.frag"
    );
    p.shader(simpleShader);

    /*additionalShader = await p.loadShader(
      "./vertexShaders/color.vert",
      "./fragShaders/altcolor.frag"
    );*/
  };

  p.draw = () => {
    p.background(220);
    p.ellipse(0, 0, 50, 50);
    p.ellipse(0, 40, 40, 40);
    p.ellipse(-40, 0, 40, 40);
    p.ellipse(40, 0, 40, 40);
    p.ellipse(0, -40, 40, 40);
    p.shader(simpleShader);
    p.strokeWeight(8);
    p.stroke(0);
    p.point(-24, 0);
    p.point(-50, 200);
    p.stroke(255, 0, 0);
    p.strokeWeight(2);
    p.spline(-100, 0, -24, 0, -50, 200, -70, 200);
    simpleShader.setUniform("u_time", p.millis() / 1000.0);
    //additionalShader.setUniform("u_time", p.millis() / 1000.0);
  };
};

const lineSketch = (p) => {
  var lineShader;

  p.setup = () => {
    p.createCanvas(400, 400);
  };

  p.draw = () => {
    p.background(220);
  };
};

new p5(simpleSketch, "simpleSketchCanvas");
new p5(lineSketch, "lineSketchCanvas");

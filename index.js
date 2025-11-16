//shader setup based off of https://github.com/aferriss/p5jsShaderExamples/blob/gh-pages/1_basics/1-1_red/sketch.js

const simpleSketch = (p) => {
  var simpleShader;
  var additionalShader;

  p.setup = async () => {
    p.createCanvas(400, 400, p.WEBGL);
    p.background(220);
    simpleShader = await p.loadShader(
      "./vertexShaders/color.vert",
      "./fragShaders/color.frag"
    );
    /*additionalShader = await p.loadShader(
      "./vertexShaders/color.vert",
      "./fragShaders/altcolor.frag"
    );*/
  };

  p.draw = () => {
    //p.stroke(0);
    p.noStroke();
    var ellipseX = 0;
    var ellipseY = 0;
    var ellipseWidth = 40;
    var ellipseHeight = 40;
    p.fill(255, 192, 203);
    //outer flowers
    p.ellipse(ellipseX, ellipseY + 40, ellipseWidth + 10, ellipseHeight + 10);
    p.ellipse(ellipseX - 40, ellipseY, ellipseWidth + 10, ellipseHeight + 10);
    p.ellipse(ellipseX + 40, ellipseY, ellipseWidth + 10, ellipseHeight + 10);
    p.ellipse(ellipseX, ellipseY - 40, ellipseWidth + 10, ellipseHeight + 10);
    p.fill(255, 255, 255);
    p.ellipse(ellipseX - 20, ellipseY, ellipseWidth - 10, ellipseHeight);
    p.ellipse(ellipseX, ellipseY + 20, ellipseWidth - 10, ellipseHeight - 8);
    p.ellipse(ellipseX, ellipseY - 20, ellipseWidth - 10, ellipseHeight - 8);
    p.ellipse(ellipseX + 20, ellipseY, ellipseWidth - 10, ellipseHeight);

    //center of the flower
    p.shader(simpleShader);
    p.ellipse(ellipseX, ellipseY, ellipseWidth + 10, ellipseHeight + 10);
    p.stroke(0);
    p.strokeWeight(2);
    var splineX1 = -15;
    var splineY1 = 15;
    var splineX2 = -30;
    var splineY2 = 50;
    var splineX3 = -30;
    var splineY3 = 200;
    var splineX4 = -30;
    var splineY4 = 200;
    p.spline(
      splineX1,
      splineY1,
      splineX2,
      splineY2,
      splineX3,
      splineY3,
      splineX4,
      splineY4
    );
    simpleShader.setUniform("u_time", p.millis() / 5000.0);
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

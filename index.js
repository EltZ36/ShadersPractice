//shader setup based off of https://github.com/aferriss/p5jsShaderExamples/blob/gh-pages/1_basics/1-1_red/sketch.js

const simpleSketch = (p) => {
  var simpleShader;
  var additionalShader;
  const flowerColorArray = ["#FFC0CB", "#FFFFFF"];
  const ellipseWidth = 40;
  const ellipseHeight = 40;

  p.setup = async () => {
    p.createCanvas(400, 400, p.WEBGL);
    p.background(220);
    p.blendMode(p.BLEND);
    flowerTimeShader = await p.loadShader(
      "./vertexShaders/color.vert",
      "./fragShaders/color.frag"
    );
  };

  p.draw = () => {
    p.drawFlower(ellipseWidth, ellipseHeight, flowerTimeShader);
    flowerTimeShader.setUniform("u_time", p.millis() / 4000.0);
  };

  //next: make the flower more dynamic and be able to be copied and drawn in different locations
  p.drawFlower = (ellipseWidth, ellipseHeight, flowerShader) => {
    //p.noStroke();
    const ellipseSize = 100;
    const numPetals = 8;
    const sizeToDivide = 2;
    const circles = [
      [0, ellipseSize, ellipseSize, numPetals],
      [
        1,
        ellipseSize / sizeToDivide,
        ellipseSize / sizeToDivide,
        numPetals / sizeToDivide,
      ],
    ];

    circles.forEach(([colorIdx, dx, dy, petals]) => {
      p.fill(flowerColorArray[colorIdx]);
      p.drawCircle(
        ellipseWidth + dx,
        ellipseHeight + dy,
        petals,
        p.PI,
        sizeToDivide
      );
    });

    p.shader(flowerShader);
    p.strokeWeight(0.5);
  };

  p.drawCircle = (w, h, num_points, angle, sizeToDivide) => {
    //evenly spaced circles from https://www.alpharithms.com/evenly-spacing-objects-around-a-circle-in-p5js-processing-180222/
    for (let i = angle; i < p.TWO_PI + angle; i += p.TWO_PI / num_points) {
      let x = (w / sizeToDivide) * Math.cos(i) + 0 / sizeToDivide;
      let y = (h / sizeToDivide) * Math.sin(i) + 0 / sizeToDivide;
      p.ellipse(x, y, w, h);
    }
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

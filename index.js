//shader setup based off of https://github.com/aferriss/p5jsShaderExamples/blob/gh-pages/1_basics/1-1_red/sketch.js

const simpleSketch = (p) => {
  let flowerTimeShader;
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
  let lineShader;

  p.setup = async () => {
    p.createCanvas(400, 400, p.WEBGL);
    lineShader = await p.loadShader(
      "./vertexShaders/plotLine.vert",
      "./fragShaders/plotLine.frag"
    );
  };

  p.draw = () => {
    //lines 79 to 81 from https://github.com/leahoppe/p5js-shader-examples/blob/gh-pages/3_uniforms/3-1_mouse/sketch.js
    let mx = p.map(p.mouseX, 0, p.width, 0, 1);
    let my = p.map(p.mouseY, 0, p.height, 0, 1);
    p.background(220);
    p.shader(lineShader);
    lineShader.setUniform("u_mouse", [mx, my]);
    lineShader.setUniform("u_resolution", [p.width, p.height]);
    p.plane(1, 1);
  };
};

const gradientSketch = (p) => {
  let gradientShader;

  p.setup = async () => {
    p.createCanvas(400, 400, p.WEBGL);
    gradientShader = await p.loadShader(
      "./vertexShaders/gradient.vert",
      "./fragShaders/gradient.frag"
    );
  };

  p.draw = () => {
    p.background(220);
    p.shader(gradientShader);
    gradientShader.setUniform("u_resolution", [p.width, p.height]);
    gradientShader.setUniform("u_time", p.millis() / 1000.0);
    p.plane(1, 1);
  };
};

new p5(simpleSketch, "simpleSketchCanvas");
new p5(lineSketch, "lineSketchCanvas");
new p5(gradientSketch, "gradientSketchCanvas");

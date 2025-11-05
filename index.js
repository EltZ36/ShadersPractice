var simpleShader = loadShader("color.vert", "color.frag");

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellipse(200, 200, 50, 50);
  shader(simpleShader);
}

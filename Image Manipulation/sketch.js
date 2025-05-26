let img;
let clippedImg;
let maskedImg;

function preload() {
  img = loadImage("yourImage.jpg");
}

function setup() {
  createCanvas(800, 400);
  background(255);

  // Circle Mask
  let circleMask = createGraphics(400, 400);
  circleMask.ellipse(200, 200, 300, 300);

  clippedImg = img.get();
  clippedImg.mask(circleMask);
  image(clippedImg, 0, 0, 400, 400);

  // Custom Polygon
  let polyMask = createGraphics(400, 400);
  polyMask.beginShape();
  polyMask.vertex(100, 100);
  polyMask.vertex(300, 80);
  polyMask.vertex(350, 200);
  polyMask.vertex(250, 300);
  polyMask.vertex(150, 250);
  polyMask.endShape(CLOSE);

  maskedImg = img.get();
  maskedImg.mask(polyMask);
  image(maskedImg, 400, 0, 400, 400);

 // Text
  let centerX = 200;
  let centerY = 250;
  let radius = 250;

  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(64);
  textWrap(WORD);

  push();
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.arc(centerX, centerY, radius, 0, TWO_PI);
  drawingContext.clip();
  text("this is text.", centerX - radius + 20, centerY - 50, radius * 2 - 40);
  drawingContext.restore();
  pop();
  // Watercolor Effect
  for (let i = 0; i < 500; i++) {

    fill(random(20, 255), random(200, 220), random(200, 255), 30); // higher opacity
    noStroke();
    let x = random(width);
    let y = random(height);
    let d = random(30, 100);
    ellipse(x, y, d);
  }
  //Blur effect
  filter(BLUR, 2);
}

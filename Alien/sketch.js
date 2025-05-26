function setup() {
  createCanvas(400, 400);
  background(255);

  // Head
  noStroke();
  fill(100, 200, 100); // Green color
  ellipse(200, 150, 200, 230); // Top rounded head
  triangle(128, 230, 272, 230, 200, 330); // Pointy chin

  // Big round eyes
  fill(0);
  ellipse(150, 160, 60, 60); // Left eye
  ellipse(250, 160, 60, 60); // Right eye

  // Smile
  noFill();
  stroke(0);
  strokeWeight(5);
  arc(200, 250, 60, 30, 0, PI); // Smile
}

function setup() {
  createCanvas(400, 200);
  background(255);

  // Car body
  fill('red');
  rect(50, 100, 300, 50); // Lower body

  // Roof with windshield shape
  beginShape();
  vertex(100, 100);
  vertex(150, 70); // Front slope (windshield)
  vertex(250, 70); // Roof
  vertex(300, 100); // Rear slope (back window)
  endShape(CLOSE);

  // Windows
  fill(135, 206, 250); // Light blue
  rect(155, 75, 40, 20); // Front window
  rect(205, 75, 40, 20); // Rear window

  // Wheels
  fill(0);
  ellipse(100, 150, 40, 40); // Left
  ellipse(300, 150, 40, 40); // Right

  // Door handle
  stroke(0);
  strokeWeight(2);
  line(205, 120, 220, 120); // Handle
  line(135, 120, 150, 120); // Handle
}

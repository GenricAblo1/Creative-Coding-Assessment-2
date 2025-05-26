let trail = [];

function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  background(255, 50); // for fade effect

  fill(0, 100, 255, 150);
  noStroke();

  // Add new point
  trail.push({ x: mouseX, y: mouseY });

  // Limit number of trail points
  if (trail.length > 50) {
    trail.shift();
  }

  for (let i = 0; i < trail.length; i++) {
    let t = map(i, 0, trail.length, 0, 255);
    fill(0, 100, 255, t);
    ellipse(trail[i].x, trail[i].y, 20, 20);
  }
}

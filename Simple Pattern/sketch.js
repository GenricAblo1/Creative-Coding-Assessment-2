function setup() {
  createCanvas(600, 600);
  background(255);
  stroke(0);
  noFill();

  let radius = 35;
  let yOffset = radius * 0.75;

  for (let y = 0; y < height + radius; y += yOffset) {
    let xOffset = (y / yOffset) % 2 === 0 ? 0 : radius / 2; // Offset every other row
    for (let x = -radius; x < width + radius; x += radius) {
      drawScallop(x + xOffset, y, radius);
    }
  }
}

function drawScallop(x, y, r) {
  for (let i = 0; i < 6; i++) {
    arc(x, y, r * 2, r * 2, PI, 0); // Semi-circle facing down
    r -= 5; // Shrinking inner arcs
  }
}

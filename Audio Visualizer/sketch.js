let mic;

function setup() {
  createCanvas(400, 400);
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(255, 50); // Fading background
  let vol = mic.getLevel(); // Microphone volume

  let size = map(vol, 0, 1, 40, 1000); // Map volume to size

  fill(255, 0, 100, 150);
  noStroke();
  ellipse(width / 2, height / 2, size, size); // Central pulse

  // Optional: scattered mini bubbles like mouse trail
  for (let i = 0; i < 10; i++) {
    let offsetX = random(-400, 400);
    let offsetY = random(-400, 400);
    ellipse(width / 2 + offsetX, height / 2 + offsetY, size / 5);
  }
}

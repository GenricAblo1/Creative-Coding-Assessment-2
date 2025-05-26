let message = "Hello, World!";
let waveSpeed = 0.1;
let amplitude = 20;

function setup() {
  createCanvas(600, 200);
  textSize(48);
  textAlign(LEFT, CENTER);
  noStroke();
}

function draw() {
  background(0); // Dark background for contrast
  let x = 50;

  for (let i = 0; i < message.length; i++) {
    let letter = message.charAt(i);
    let yOffset = sin(frameCount * waveSpeed + i * 0.5) * amplitude;

    // RGB offset positions
    let offset = 2;

    // Draw Red shadow
    fill(255, 0, 0);
    text(letter, x - offset, height / 2 + yOffset);

    // Draw Green shadow
    fill(0, 255, 0);
    text(letter, x + offset, height / 2 + yOffset);

    // Draw Blue shadow
    fill(0, 0, 255);
    text(letter, x, height / 2 + yOffset + offset);

    // Draw main white letter
    fill(255);
    text(letter, x, height / 2 + yOffset);

    x += textWidth(letter);
  }
}

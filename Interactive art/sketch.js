let angle = 0;
let colors = [];
let mode = 0;
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  noStroke();

  for (let i = 0; i < 10; i++) {
    colors.push(color(random(255), random(255), random(255)));
  }
}

function draw() {
  // Background pulse effect
  let bgPulse = map(sin(frameCount * 0.01), -1, 1, 10, 50);
  background(bgPulse, 20);

  let t = frameCount * 0.02;
  translate(mouseX, mouseY);

  // Draw orbiting glowing lights
  for (let i = 0; i < 10; i++) {
    let offset = TWO_PI / 10 * i;
    let r = map(sin(t + i), -1, 1, 40, 120);
    let x = cos(angle + offset) * r;
    let y = sin(angle + offset) * r;

    // Glowing aura
    for (let g = 10; g > 0; g--) {
      fill(red(colors[i]), green(colors[i]), blue(colors[i]), 8);
      ellipse(x, y, 10 * g);
    }

    // Core light
    fill(colors[i]);
    ellipse(x, y, 20 + 10 * sin(t + i));

    // Spawn particle trail
    if (frameCount % 2 === 0) {
      particles.push({
        x: x + mouseX,
        y: y + mouseY,
        size: random(3, 8),
        life: 255,
        col: colors[i]
      });
    }
  }

  angle += 0.01;

  // Central core pulse
  fill(255, 200);
  ellipse(0, 0, 40 + 10 * sin(frameCount * 0.1));

  // Particle trails
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    fill(red(p.col), green(p.col), blue(p.col), p.life);
    ellipse(p.x - mouseX, p.y - mouseY, p.size);
    p.life -= 4;
    if (p.life <= 0) particles.splice(i, 1);
  }

  // Warp mode effect
  if (mode === 1) {
    push();
    noFill();
    stroke(255, 100);
    strokeWeight(2);
    ellipse(0, 0, 200 + 30 * sin(frameCount * 0.2));
    ellipse(0, 0, 300 + 20 * cos(frameCount * 0.1));
    pop();
  }
}

function mousePressed() {
  // Color burst effect
  for (let i = 0; i < colors.length; i++) {
    colors[i] = color(random(255), random(255), random(255));
  }

  // Add burst particles
  for (let i = 0; i < 30; i++) {
    particles.push({
      x: random(-50, 50) + mouseX,
      y: random(-50, 50) + mouseY,
      size: random(6, 15),
      life: 255,
      col: color(random(255), random(255), random(255))
    });
  }
}

function keyPressed() {
  mode = (mode + 1) % 2;
}

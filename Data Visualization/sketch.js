let table;
let categories = [];
let percentages = [];

function preload() {
  table = loadTable("data2.csv", "csv", "header");
}

function setup() {
  createCanvas(800, 500);
  background(255);
  textSize(12);
  textAlign(CENTER, BOTTOM);

  // Extract data
  for (let row of table.rows) {
    categories.push(row.get("Group"));
    percentages.push(float(row.get("Percentage")));
  }
}

function draw() {
  background(255);
  let margin = 60;
  let chartHeight = height - 2 * margin;
  let chartWidth = width - 2 * margin;
  let barWidth = chartWidth / categories.length;

  // Y-axis
  stroke(0);
  line(margin, margin, margin, height - margin);
  line(margin, height - margin, width - margin, height - margin);

  // Y-axis ticks
  for (let i = 0; i <= 100; i += 10) {
    let y = map(i, 0, 100, height - margin, margin);
    noStroke();
    fill(0);
    text(i + "%", margin - 30, y + 5);
    stroke(200);
    line(margin, y, width - margin, y);
  }

  // Bars
  for (let i = 0; i < categories.length; i++) {
    let x = margin + i * barWidth + barWidth / 2;
    let h = map(percentages[i], 0, 100, 0, chartHeight);
    fill(100, 150, 255);
    rect(x - barWidth / 4, height - margin - h, barWidth / 2, h);
    fill(0);
    text(percentages[i] + "%", x, height - margin - h - 5);

    push();
    translate(x, height - margin + 5);
    rotate(PI / 4);
    textAlign(LEFT, TOP);
    text(categories[i], 0, 0);
    pop();
  }

  // Title
  textSize(16);
  textAlign(CENTER);
  text("CDC Teen Screen Time (4+ hrs daily)", width / 2, margin / 2);
}

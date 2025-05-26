let cols, rows;
let cellSize = 40;
let grid = [];
let current;
let stack = [];
let player;
let timer = 30; // Base time
let startTime;
let gameState = 'start'; // Game phases: start, playing, win, lose
let level = 1;
let score = 0;

// Sound variables
let moveSound, winSound, loseSound;

function preload() {
  moveSound = loadSound('move.wav');
  winSound = loadSound('win.wav');
  loseSound = loadSound('lose.mp3');
}

function setup() {
  createCanvas(400, 400);
  textFont('monospace');
  setupLevel(level);
}

function draw() {
  background(255);

  if (gameState === 'start') {
    showStartScreen();
  } else if (gameState === 'playing') {
    drawMaze();
    drawPlayer();
    checkWinOrFail();
    showTimer();
    showHUD();
  } else if (gameState === 'win') {
    showWinScreen();
  } else if (gameState === 'lose') {
    showLoseScreen();
  }
}

function showStartScreen() {
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(0);
  text("MAZE GAME", width / 2, height / 2 - 20);
  textSize(16);
  text("Press ENTER to Start", width / 2, height / 2 + 20);
}

function showWinScreen() {
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(0, 200, 0);
  text("Level Complete!", width / 2, height / 2);
  textSize(16);
  text("Press ENTER for Next Level", width / 2, height / 2 + 30);
}

function showLoseScreen() {
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(200, 0, 0);
  text("Time's Up!", width / 2, height / 2);
  textSize(16);
  text("Press R to Retry Level", width / 2, height / 2 + 30);
}

function keyPressed() {
  // Handle start, win, and lose transitions
  if ((gameState === 'start' || gameState === 'win') && keyCode === ENTER) {
    if (gameState === 'win') level++; // Advance level if you won
    setupLevel(level);
    gameState = 'playing';
    startTime = millis();
  }

  if (gameState === 'lose' && (key === 'r' || key === 'R')) {
    setupLevel(level); // Retry same level
    gameState = 'playing';
    startTime = millis();
  }

  // Handle movement
  if (gameState === 'playing') {
    let next = { x: player.x, y: player.y };
    if (keyCode === LEFT_ARROW || key === 'a') next.x--;
    if (keyCode === RIGHT_ARROW || key === 'd') next.x++;
    if (keyCode === UP_ARROW || key === 'w') next.y--;
    if (keyCode === DOWN_ARROW || key === 's') next.y++;

    // If move is valid, play sound and move
    if (canMoveTo(player.x, player.y, next.x, next.y)) {
      player = next;
      moveSound.play();
    }
  }
}

// Show timer countdown
function showTimer() {
  fill(0);
  textSize(14);
  text("Time: " + ceil(timer - (millis() - startTime) / 1000), 50, 20);
}

// HUD: show score and level
function showHUD() {
  textSize(14);
  fill(0);
  text("Score: " + score, 50, 40);
  text("Level: " + level, 50, 60);
}

// Win/lose logic
function checkWinOrFail() {
  if (player.x === cols - 1 && player.y === rows - 1) {
    winSound.play();
    let timeLeft = ceil(timer - (millis() - startTime) / 1000);
    score += timeLeft * 10; // Points for finishing fast
    gameState = 'win';
  }

  if ((millis() - startTime) / 1000 > timer) {
    loseSound.play();
    gameState = 'lose';
  }
}

// Setup maze and player per level
function setupLevel(lvl) {
  cellSize = max(20, 40 - lvl * 2); // Shrink cells to fit bigger mazes
  cols = floor(width / cellSize);
  rows = floor(height / cellSize);

  // Reset maze
  grid = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      grid.push(new Cell(x, y));
    }
  }

  // Maze generation
  current = grid[0];
  stack = [];
  while (true) {
    current.visited = true;
    let next = current.checkNeighbors();
    if (next) {
      next.visited = true;
      stack.push(current);
      removeWalls(current, next);
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop();
    } else {
      break;
    }
  }

  // Reset player
  player = { x: 0, y: 0 };
  timer = 30 + lvl * 5; // More time for higher levels
}

// Draw grid and goal
function drawMaze() {
  for (let cell of grid) {
    cell.show();
  }

  // Goal cell (bottom-right)
  fill(0, 255, 0);
  noStroke();
  rect((cols - 1) * cellSize + 5, (rows - 1) * cellSize + 5, cellSize - 10, cellSize - 10);
}

// Draw player as a circle
function drawPlayer() {
  fill(0, 100, 255);
  noStroke();
  ellipse(
    player.x * cellSize + cellSize / 2,
    player.y * cellSize + cellSize / 2,
    cellSize * 0.5
  );
}


function index(x, y) {
  if (x < 0 || y < 0 || x >= cols || y >= rows) return -1;
  return x + y * cols;
}


function canMoveTo(x1, y1, x2, y2) {
  let i1 = index(x1, y1);
  let i2 = index(x2, y2);
  if (i1 < 0 || i2 < 0) return false;
  let cell1 = grid[i1];
  let cell2 = grid[i2];

  // Check wall presence
  if (x2 < x1 && !cell1.walls[3]) return true; // left
  if (x2 > x1 && !cell1.walls[1]) return true; // right
  if (y2 < y1 && !cell1.walls[0]) return true; // up
  if (y2 > y1 && !cell1.walls[2]) return true; // down
  return false;
}


class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.walls = [true, true, true, true]; // top, right, bottom, left
    this.visited = false;
  }

  // Return one unvisited neighbor randomly
  checkNeighbors() {
    let neighbors = [];
    let top = grid[index(this.x, this.y - 1)];
    let right = grid[index(this.x + 1, this.y)];
    let bottom = grid[index(this.x, this.y + 1)];
    let left = grid[index(this.x - 1, this.y)];

    if (top && !top.visited) neighbors.push(top);
    if (right && !right.visited) neighbors.push(right);
    if (bottom && !bottom.visited) neighbors.push(bottom);
    if (left && !left.visited) neighbors.push(left);

    if (neighbors.length > 0) {
      return random(neighbors);
    }
    return undefined;
  }

  show() {
    let x = this.x * cellSize;
    let y = this.y * cellSize;
    stroke(0);
    if (this.walls[0]) line(x, y, x + cellSize, y);         // top
    if (this.walls[1]) line(x + cellSize, y, x + cellSize, y + cellSize); // right
    if (this.walls[2]) line(x + cellSize, y + cellSize, x, y + cellSize); // bottom
    if (this.walls[3]) line(x, y + cellSize, x, y);         // left
  }
}


function removeWalls(a, b) {
  let dx = a.x - b.x;
  let dy = a.y - b.y;
  if (dx === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (dx === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  if (dy === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (dy === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

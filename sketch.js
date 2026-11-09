// Drift - generative flow lines
// random() picks the colors and where the dots start
// noise() moves the dots smoothly so the lines flow together
// Flow field idea from The Coding Train, Coding Challenge #24 by Daniel Shiffman

let dots = [];
let colors;

function setup() {
  createCanvas(600, 800);
  startDrawing();
}

function startDrawing() {
  // first color is the background, the rest are line colors
  let palettes = [
    ['#14121f', '#f4c0d1', '#7f77dd', '#5dcaa5'],
    ['#f3efe4', '#d85a30', '#ef9f27', '#3b6d11'],
    ['#042c53', '#85b7eb', '#e6f1fb', '#f0997b']
  ];
  colors = random(palettes);
  background(colors[0]);
  noiseSeed(random(1000)); // new noise pattern every time

  // make 500 dots in random spots with random colors
  dots = [];
  for (let i = 0; i < 500; i++) {
    dots.push({
      x: random(width),
      y: random(height),
      c: random(colors.slice(1))
    });
  }
}

function draw() {
  for (let d of dots) {
    // noise picks which way the dot moves
    let angle = noise(d.x * 0.004, d.y * 0.004) * TWO_PI * 2;
    let newX = d.x + cos(angle) * 2;
    let newY = d.y + sin(angle) * 2;

    stroke(d.c + '40'); // the 40 makes the line see-through
    line(d.x, d.y, newX, newY);

    d.x = newX;
    d.y = newY;

    // if a dot leaves the canvas, put it somewhere random
    if (d.x < 0 || d.x > width || d.y < 0 || d.y > height) {
      d.x = random(width);
      d.y = random(height);
    }
  }
}

// click for a new drawing
function mousePressed() {
  startDrawing();
}

// press s to save
function keyPressed() {
  if (key === 's') {
    saveCanvas('drift', 'png');
  }
}
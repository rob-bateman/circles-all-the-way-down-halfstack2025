let gears = [],
  spiro, tik, flip, flip2
let pause = true;

let tikSpeed = 0.01
let zoom = 100;
let size = 600;
let circleIter = 9;
let circleScale = 2.5;
let flipOveride = 1;
let flip2Overide = 1;
let SpeedOveride = true;
let insideC = true;
let showC = false;
let k = -4;

let customG = [];

function setup() {
  createCanvas(size, size);
  uiSetup();
  background(255);
  tik = 0;
  noFill();
  stroke(0, 0, 0, 90);
  strokeWeight(0.00001);
  for (let i = 0; i < circleIter; i++) {
    gears.push(size / (circleScale ** i));
  }
  spiro = new Gear(gears);
}

function draw() {
  if (showC) {
    background(255);
  }
  translate(width / 2, height / 2);
  for (let i = 0; i < zoom; i++) {
    tik += tikSpeed;
    push();
    spiro.show();
    pop();
  }
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    if (pause) {
      noLoop();
      pause = !pause;
    } else {
      loop();
      pause = !pause;
    }
  }
}
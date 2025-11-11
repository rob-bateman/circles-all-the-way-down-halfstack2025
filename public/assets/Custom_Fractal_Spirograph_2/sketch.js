let gears = [],
  spiro, tik, flip, flip2
let pause = true;

let tikSpeed = 0.1
let zoom = 10;
let size = 600;
let circleIter = 2;
let circleScale = 2.5;
let flipOveride = 1;
let flip2Overide = 1;
let SpeedOveride = true;
let insideC = true;
let showC = true;
let k = -4;

let customG = [];

let fontSize = 14;

function setup() {
  createCanvas(size, size);
  uiSetup();
  background(0);
  tik = 0;
  noFill();
  strokeWeight(1);
  stroke(255);
  zoom = 10;
  for (let i = 0; i < circleIter; i++) {
    gears.push(size / (circleScale ** i));
  }
  spiro = new Gear(gears);
  windowResized();
  drawText();
}

function draw() {
  if (showC) {
    background(0);
    drawText();
  } else if (drawTextFlag) {
    drawTextFlag = false;
    drawText();
  }
  translate(width / 2, height / 2);
  for (let i = 0; i < zoom; i++) {
    tik += tikSpeed;
    push();
    spiro.show(i == zoom - 1 && showC);
    pop();
  }
}

function mousePressed() {
  if (mouseX > width / 2 - 300 && mouseX < width / 2 + 300 && mouseY > height / 2 - 300 && mouseY < height / 2 + 300) {
    if (pause) {
      noLoop();
      pause = !pause;
    } else {
      loop();
      pause = !pause;
    }
  }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    scale = min(width / 8, height / 4);
    //offset
    offset = createVector(width / 2,height / 2);

    fontSize = constrain(11, windowHeight / 60, 24);
    //resetAudio();
    updateSliderPositions();
}

function updateSliderPositions() {
 
  let spacing = 20;

  show.position(windowWidth - show.width - 20,20);
  
  sel.position(20, 20);
  
  tikv.position(20, 100);
  stepv.position(200, 100);
  
  cirIt.position(20, 180);
  
  cirSiz.position(20, 260);
  
  kay.position(20, 340);
  
  rati.position(20, 400);
  
  flp.position(20, 460);
  
  flp2.position(20, 520);
  
  ins.position(20, 580);
}

function drawText() {
    push();
    noStroke();
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(fontSize);

    let spacing = 20;
    text(
        "Presets",
        sel.x + sel.width + spacing,
        sel.y + (fontSize/3)
    );
    text(
        "Steps per dot",
        tikv.x,
        tikv.y - spacing - (fontSize/3)
    );
    text(
        "Steps per frame",
        stepv.x,
        stepv.y - spacing - (fontSize/3)
    );
    text(
        "Circle Iterations (1 to 15)",
        cirIt.x,
        cirIt.y - spacing - (fontSize/3)
    );
  
    text(
        "Circle Size Factor",
        cirSiz.x,
        cirSiz.y - spacing - (fontSize/3)
    );
  
    text(
        "Circle Speed Factor",
        kay.x,
        kay.y - spacing - (fontSize/3)
    );

   // textAlign(CENTER);
    //text("number of waves: " + iterations, width / 2, height - 24);
  pop();
}
// Coding Challenge 130.3: Drawing with Fourier Transform and Epicycles
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/130.1-fourier-transform-drawing.html
// https://thecodingtrain.com/CodingChallenges/130.2-fourier-transform-drawing.html
// https://thecodingtrain.com/CodingChallenges/130.3-fourier-transform-drawing.html
// https://youtu.be/7_vKzcgpfvU


let x = [];
let fourierX;
let time = 0;
let path = [];
let scale = 0;
let offset;

function setup() {
  createCanvas(1920, 1080);
  const skip = 3;
  for (let i = 0; i < drawing.length; i += skip) {
    const c = new Complex(drawing[i].x-900, drawing[i].y-500);
    x.push(c);
  }
  fourierX = dft(x);
  fourierX.sort((a, b) => b.amp - a.amp);
  windowResized();
}

function epicycles(x, y, rotation, fourier) {
  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;
    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;
    x += radius * cos(freq * time + phase + rotation);
    y += radius * sin(freq * time + phase + rotation);

    stroke(255, 100);
    noFill();
    ellipse(prevx, prevy, radius * 2);
    stroke(255); 
    line(prevx, prevy, x, y);
  }
  return createVector(x - offset.x, y - offset.y);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    scale = min(width / 8, height / 4);
    //offset
    offset = createVector(width / 2 + 200,height / 2);

    fontSize = constrain(11, windowHeight / 60, 24);
    //resetAudio();
    //updateSliderPositions();
}

function draw() {
  background(0);

  let v = epicycles(offset.x, offset.y, 0, fourierX);
  path.unshift(v);

  beginShape();
  noFill();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x + offset.x, path[i].y + offset.y);
  }
  endShape();

  const dt = TWO_PI / fourierX.length;
  time += dt;

  if (time > TWO_PI) {
    time = 0;
    path = [];
  }
}



p5.disableFriendlyErrors = true;

let show;
let scSz;
let tikv;
let stepv;
let cirSiz;
let kay;
let cus;
let flp;
let flp2;
let ins;
let sav;
let presetsText;
let sel;
let dark;
let offset;
let drawTextFlag = true;

function uiSetup() {
  
  textAlign(LEFT, CENTER);
  textSize(18);
  fill(255);
  //createP('Click the screen to pause and unpause (I recommend pausing once the full shape has formed, as rounding errors will slowly blue the image)');
  show = createButton('Show/Hide Circles');
  show.style('background', '#000');
  show.style('color', '#FFF');
  show.style('font-size', '18px');
  show.style('width', '200px');
  show.mousePressed(() => {
    reset();
    showC = !showC;
    background(0);
    path = [];
    if (showC) {
      strokeWeight(2);
      stroke(255);
      zoom = 10;
      //stepv.value(1);
      //stepv.hide();
    } else {
      strokeWeight(0.00001);
      stroke(255, dark.value());
      //stepv.value(100);
      zoom = stepv.value();
      //stepv.show();
    }
  });
  sav = createButton('Download Pic');
  sav.mousePressed(() => saveCanvas('fractalSpirograph', 'jpg'));
  presetsText = createP('Presets');
  sel = createSelect();
  sel.style('width', '100px');
  sel.style('background', '#000');
  sel.style('color', '#FFF');
  sel.style('font-size', '18px');
  
  sel.option('Default');
  sel.option('PHI');
  sel.option('Penta');
  sel.option('Sponge');
  sel.option('Flower');
  sel.option('Sun');
  sel.option('Atom');
  sel.option('Net');
  sel.selected('Default');
  sel.changed(() => {
    featured[sel.value()]();
  });
  createP('Canvas size');
  scSz = createInput('600');
  scSz.changed(() => {
    size = scSz.value()
    resizeCanvas(size, size);
    reset();
  });
  createP('Step per dot (10^(-4 to 4)), and Steps per "frame" (disabled when in circle mode)');
  tikv = createSlider(-4, 3, -1, 0);
  tikv.changed(() => {
    reset();
  });
  stepv = createSlider(1, 500, 10);
  stepv.changed(() => {
    reset();
  });
  createP('Circle Iterations (1 to 15)');
  cirIt = createSlider(1, 15, 2);
  cirIt.changed(() => {
    reset()
  });
  createP("Each circle from the center is X times smaller (doesn't need to be whole numbers, negitave numbers require flipping the circles inside/out)")
  cirSiz = createInput('2.5');
  cirSiz.style('background', '#000');
  cirSiz.style('color', '#FFF');
  cirSiz.style('font-size', '18px');
  cirSiz.style('width', '200px');
  cirSiz.changed(() => {
    reset();
  });
  createP('The K value. Determins the spin speed per circle center to last (as K^i). Negative values will flip the rotation each circle.');
  kay = createInput('-4');
  kay.style('background', '#000');
  kay.style('color', '#FFF');
  kay.style('font-size', '18px');
  kay.style('width', '200px');
  kay.changed(() => {
    reset();
  });
  createP("Custom sizes for circles. Enter in radii for a set of circles seperated by commas. To reset, enter a blank value.");
  cus = createInput('');
  cus.changed(() => {
    if (cus.value() == '') {
      customG = [];
      reset();
    } else {
      customG = cus.value().split(', ').map((a) => a = Number(a))
      reset();
    }
  });
  createP('Ratios will treat each circle as a gear with ratios dependent on radii (Ignores the K spin value entierly). Flip-rotation will reverse the rotation of every odd circle, (a negitive K will do the same thing). You may also alternate if the circles "rails" connect on the inside or outside of the last circle, or set them to alternate outside/inside. For more control on what circles attach inside or out, use custom sizes (positive numbers connect outside, negitive connect inside)');
  rati = createButton('Ratios: OFF');
  rati.style('width', '200px');
  rati.style('background', '#000');
  rati.style('color', '#FFF');
  rati.style('font-size', '18px');
  rati.mousePressed(() => {
    SpeedOveride = !SpeedOveride;
    if (!SpeedOveride) {
      rati.html('Ratios: ON');
    } else {
      rati.html('Ratios: OFF');
    }
    reset();
  })
  flp = createButton('Flip Rotation: OFF');
  flp.style('width', '200px');
  flp.style('background', '#000');
  flp.style('color', '#FFF');
  flp.style('font-size', '18px');
  flp.mousePressed(() => {
    flipOveride *= -1;
    if (flipOveride == -1) {
      flp.html('Flip Rotation: ON');
    } else {
      flp.html('Flip Rotation: OFF');
    }
    reset();
  })
  flp2 = createButton('Inside/Outside: OFF');
  flp2.style('width', '200px');
  flp2.style('background', '#000');
  flp2.style('color', '#FFF');
  flp2.style('font-size', '18px');
  flp2.mousePressed(() => {
    flip2Overide *= -1;
    if (flip2Overide == -1) {
      flp2.html('Inside/Outside: ON');
    } else {
      flp2.html('Inside/Outside: OFF');
    }
    reset();
  })
  ins = createButton('Circles: INSIDE');
  ins.style('width', '200px');
  ins.style('background', '#000');
  ins.style('color', '#FFF');
  ins.style('font-size', '18px');
  ins.mousePressed(() => {
    insideC = !insideC;
    if (!insideC) {
      ins.html('Circles: OUTSIDE');
    } else {
      ins.html('Circles: INSIDE');
    }
    reset();
  });
  createP('Line Darkness');
  dark = createSlider(0, 255, 100, 0);
  dark.changed(() => stroke(255, dark.value()));
  createElement('h2', 'How it works');
  createP("The result on screen was created by rotating a bunch of attached circles with a pencil attached to the end. Commonly known as a spirograph. This particular program is built specifically to make a fractal type of spirograph, though you can finagle the settings to get some other kinds via the custom options. Starting from the center circle, number 1 (which is defaulted to have a diameter of the canvas) each additional circle has it's radius divided by (scaling#)^(N) where scaling# is whatever you choose (default 2.5), and N is the circle's order from the center circle. In addition, each circle spins which affect the next circle who is also spinning. They are set to spin K^(N) faster (K default is -4) as it reaches the pencil at the end.")
}

function reset() {
  background(0);
  drawTextFlag = true;
  path = [];
  tikSpeed = 10 ** tikv.value();
  tik = 0;
  if (!showC) {
    zoom = stepv.value();
  }
  circleIter = cirIt.value();
  circleScale = Number(cirSiz.value())
  k = Number(kay.value())
  gears = [];
  if (customG.length == 0) {
    let temp_size;
    let temp_st;
    if ((!insideC || flip2Overide == -1)) {
      temp_size = -size + ((size / Math.abs(circleScale) ** 0.61803398875));
    } else {

      temp_size = size
    }
    for (let i = 0; i < circleIter; i++) {

      gears.push(temp_size / (circleScale ** i));
    }
  } else {
    gears = customG;
  }
  spiro = new Gear(gears);
  
  if (!pause) {
    loop();
    pause = !pause;
  } 
}

let featured = {
  'Default': (() => {
    tikv.value(-1);
    stepv.value(10);
    cirIt.value(2);
    cirSiz.value(2.5);
    kay.value(-4);
    customG = [];
    cus.value('');
    SpeedOveride = true;
    rati.html('Ratios: OFF');
    flipOveride = 1;
    flp.html('Flip Rotation: OFF');
    flip2Overide = 1;
    flp2.html('Inside/Outside: OFF');
    insideC = true;
    ins.html('Circles: INSIDE');
    reset();
  }),
  'PHI': (() => {
    tikv.value(0.618033988749895);
    stepv.value(800);
    cirIt.value(9);
    cirSiz.value(1.618033988749895);
    kay.value(1.618033988749895);
    customG = [];
    cus.value('');
    SpeedOveride = true;
    rati.html('Ratios: OFF');
    flipOveride = 1;
    flp.html('Flip Rotation: OFF');
    flip2Overide = 1;
    flp2.html('Inside/Outside: OFF');
    insideC = true;
    ins.html('Circles: INSIDE');
    reset();
  }),

  'Penta': (() => {
    tikv.value(-1.57597173144876);
    stepv.value(261);
    cirIt.value(9);
    cirSiz.value(-2.5);
    kay.value(-4);
    customG = [];
    cus.value('');
    SpeedOveride = true;
    rati.html('Ratios: OFF');
    flipOveride = 1;
    flp.html('Flip Rotation: OFF');
    flip2Overide = -1;
    flp2.html('Inside/Outside: ON');
    insideC = true;
    ins.html('Circles: INSIDE');
    reset();
  }),

  'Sponge': (() => {
    tikv.value(-3.01);
    stepv.value(725);
    cirIt.value(13);
    cirSiz.value(2.25);
    kay.value(5);
    customG = [];
    cus.value('');
    SpeedOveride = true;
    rati.html('Ratios: OFF');
    flipOveride = 1;
    flp.html('Flip Rotation: OFF');
    flip2Overide = 1;
    flp2.html('Inside/Outside: OFF');
    insideC = true;
    ins.html('Circles: INSIDE');
    reset();
  }),

  'Flower': (() => {
    tikv.value(-1.85343370717468);
    stepv.value(600);
    cirIt.value(9);
    cirSiz.value(-1.9);
    kay.value(3);
    customG = [];
    cus.value('');
    SpeedOveride = true;
    rati.html('Ratios: OFF');
    flipOveride = -1;
    flp.html('Flip Rotation: ON');
    flip2Overide = -1;
    flp2.html('Inside/Outside: ON');
    insideC = true;
    ins.html('Circles: INSIDE');
    reset();
  }),

  'Sun': (() => {
    tikv.value(-2);
    stepv.value(300);
    cirIt.value(9);
    cirSiz.value(2);
    kay.value(-3);
    customG = [];
    cus.value('');
    SpeedOveride = true;
    rati.html('Ratios: OFF');
    flipOveride = -1;
    flp.html('Flip Rotation: ON');
    flip2Overide = -1;
    flp2.html('Inside/Outside: ON');
    insideC = false;
    ins.html('Circles: OUTSIDE');
    reset();
  }),

  'Atom': (() => {
    tikv.value(-0.229528345367952);
    stepv.value(850);
    cirIt.value(4);
    cirSiz.value(1 + 2 / 3);
    kay.value(-1.99);
    customG = [];
    cus.value('');
    SpeedOveride = true;
    rati.html('Ratios: OFF');
    flipOveride = 1;
    flp.html('Flip Rotation: OFF');
    flip2Overide = 1;
    flp2.html('Inside/Outside: OFF');
    insideC = false;
    ins.html('Circles: OUTSIDE');
    reset();
  }),

  'Net': (() => {
    tikv.value(-2);
    stepv.value(1400);
    cirIt.value(9);
    cirSiz.value('--');
    kay.value('--');
    cus.value('300, 30, -30, 140');
    customG = [300, 30, -30, 140];
    SpeedOveride = false;
    rati.html('Ratios: ON');
    flipOveride = -1;
    flp.html('Flip Rotation: ON');
    flip2Overide = -1;
    flp2.html('Inside/Outside: ON');
    insideC = false;
    ins.html('Circles: OUTSIDE');
    reset();
  }),
}
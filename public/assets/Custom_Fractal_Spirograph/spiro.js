function circleSpeed(i) {
  if (i == 0) {
    return radians(Math.pow(k - 1, -1))
  }
  return radians(Math.pow(k, i - 1));
}

class Gear {
  constructor(arr) {
    this.spools = arr;
  }

  show() {
    let ratio;
    let transLine;
    let parent;
    flip = 1;
    flip2 = 1;
    for (let i = 0; i < this.spools.length; i++) {
      if (insideC) {
        parent = -this.spools[i - 1] * flip2;
      } else {
        parent = this.spools[i - 1] * flip2;
      }
      transLine = (parent + this.spools[i]) / 2;
      if (!SpeedOveride) {
        if (i != 0) {
          ratio = this.spools[i] / parent;
          rotate(tik * ratio * flip);
        }
      } else {
        rotate(tik * -circleSpeed(i) * flip);
      }
      flip *= flipOveride;
      flip2 *= flip2Overide;
      if (showC) {
        line(0, 0, 0, transLine);
      }
      translate(0, transLine)
      if (showC) {
        circle(0, 0, this.spools[i]);
      }
      if (i == this.spools.length - 1) {
        if (!SpeedOveride) {
          rotate(tik * ratio * flip);
        } else {
          rotate(tik * -circleSpeed(i + 1) * flip);
        }
        push();
        if (showC) {
          strokeWeight(3);
        } 

        point(0, this.spools[i] / 2);
        pop();
      }
    }
  }
}
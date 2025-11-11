let path = [];

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

  show(drawFlag) {
    let ratio;
    let transLine;
    let parent;
    flip = 1;
    flip2 = 1;
    push();
    stroke(128);
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
      if (drawFlag) {
        line(0, 0, 0, transLine);
      }
      translate(0, transLine)
      if (drawFlag) {
        circle(0, 0, this.spools[i]);
      }
      if (i == this.spools.length - 1) {
        if (!SpeedOveride) {
          rotate(tik * ratio * flip);
        } else {
          rotate(tik * -circleSpeed(i + 1) * flip);
        }
        
        if (showC) {
          
          
          let globalCoord = drawingContext.getTransform().transformPoint(new DOMPoint(0, this.spools[i] / 2));
          path.unshift(createVector(globalCoord.x/2-offset.x, globalCoord.y/2-offset.y));
          strokeWeight(5);
          stroke(255);
          point(0, this.spools[i] / 2);
          pop();
          
          beginShape();
          noFill();
          for (let i = 0; i < path.length; i++) {
            vertex(path[i].x, path[i].y);
          }
          endShape();
        } else {
          stroke(255, dark.value());
          point(0, this.spools[i] / 2);
          pop();
        }
        
      }
    }
  }
}
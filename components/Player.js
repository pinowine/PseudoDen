class Player {
  constructor(x, y) {
    this.body = new RigidBody({ x, y, radius: 13 });
    this.jumpStrength = 10;
    this.jumpWasHeld = false;
    this.eyePos = createVector(0, 0);
  }

  jump() {
    this.body.jump(this.jumpStrength);
  }

  update(scene) {
    const left = keyIsDown(65) || keyIsDown(LEFT_ARROW); // A key
    const right = keyIsDown(68) || keyIsDown(RIGHT_ARROW); // D key
    const moveDir = (left ? -1 : 0) + (right ? 1 : 0); // -1 = left, 0 = no move, 1 = right

    const jumpHeld = keyIsDown(32) // space
    const input = { moveDir, jumpHeld };

    this.body.update(scene, input);

    this.jumpWasHeld = jumpHeld;

    const v = this.body.vel.copy();
    const speed = v.mag();
    if (speed < 0.01) {
      this.eyePos.set(0, 0);
      return;
    }

    v.normalize();
    const maxOffset = this.body.radius * 0.7;
    const t = constrain(speed / this.body.maxHorizontalSpeed, 0, 1);
    const dEye = t * maxOffset;

    this.eyePos = v.mult(dEye);
  }

  draw() {
    push();

    translate(this.body.pos.x, this.body.pos.y);
    noStroke();

    fill(255, 255, 255);
    ellipse(0, 0, this.body.radius * 2);

    const eyeR = this.body.radius * 0.9;
    const pupilR = this.body.radius * 0.45;

    noFill();
    stroke(0);
    strokeWeight(1.5);
    ellipse(this.eyePos.x, this.eyePos.y, eyeR);

    fill(0);
    noStroke();
    ellipse(this.eyePos.x, this.eyePos.y, pupilR);

    pop();
  }
}

function keyPressed() {
  if (key === ' ' && player) {
    player.jump();
  }
}

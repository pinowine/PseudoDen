class Player {
  constructor(x, y) {
    this.body = new RigidBody({ x, y, radius: 15 });
    this.moveSpeed = 4;
    this.jumpStrength = 10;
    this.jumpWasHeld = false;
  }

  handleInput() {
    this.body.vel.x = 0;

    if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
      this.body.vel.x = this.moveSpeed;
    } else if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
      this.body.vel.x = -this.moveSpeed;
    }
  }

  jump() {
    this.body.jump(this.jumpStrength);
  }

  update(scene) {
    this.handleInput();

    const jumpHeld = keyIsDown(32) // space
    const input = { jumpHeld };

    this.body.update(scene, input);

    this.jumpWasHeld = jumpHeld;
  }

  draw() {
    push();
    translate(this.body.pos.x, this.body.pos.y);
    noStroke();
    fill(150, 0, 255);
    ellipse(0, 0, this.body.radius * 2);
    pop();
  }

  getHitbox() {
    return this.body.getHitbox();
  }
}

function keyPressed() {
  if (key === ' ') {
    if (typeof player !== 'undefined' && player) {
      player.jump();
    }
  }
}

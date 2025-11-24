const EPS = 0.1;

class RigidBody {
  constructor({
    x, y, radius = 10,
    gravity = 0.4, // base gravity
    riseGravityScale = 1.2, // rise gravity multiplier
    fallGravityScale = 2.0, // fall gravity multiplier
    lowJumpMultiplier = 2.0, // if jump key released early
    maxFallSpeed = 20 // terminal velocity
  }) {
    // position and velocity vectors
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.radius = radius;

    // gravity and physics parameters
    this.gravity = gravity;
    this.riseGravityScale = riseGravityScale;
    this.fallGravityScale = fallGravityScale;
    this.lowJumpMultiplier = lowJumpMultiplier;
    this.maxFallSpeed = maxFallSpeed;

    // state flags
    this.onGround = false;
    this.onWall = false;
    this.isRising = false;
  }

  update(scene, input) {
    this.pos.x += this.vel.x;
    this.resolveHorizontalCollision(scene);

    this.applyGravity(input);
    this.resolveVerticalCollision(scene);

    this.resolveEdgeCollision(WORLD_WIDTH, WORLD_HEIGHT);
  }

  applyGravity(input) {
    // stand still on ground
    if (this.onGround && this.vel.y >= 0) {
      this.vel.y = 0;
      return;
    }
    // is falling or rising
    this.isRising = this.vel.y < 0;
    let g = this.gravity * (this.isRising ? this.riseGravityScale : this.fallGravityScale);

    // low jump adjustment: additional gravity when jump released early
    if (this.isRising && input && !input.jumpHeld) {
      g *= this.lowJumpMultiplier;
    }

    this.vel.y += g;

    // cap fall speed
    if (this.vel.y > this.maxFallSpeed) {
      this.vel.y = this.maxFallSpeed;
    }

    this.pos.y += this.vel.y;
  }

  // collision with the platform tiles horizontally
  resolveHorizontalCollision(scene) {

    const r = this.radius;
    this.onWall = false;

    if (this.vel.x === 0) return;

    const movingRight = this.vel.x > 0;
    const sideX = this.pos.x + (movingRight ? r : -r); // right or left side
    const checkX = sideX + (movingRight ? EPS : -EPS);

    const topY = this.pos.y - r * 0.3;
    const bottomY = this.pos.y + r * 0.3;

    const hitTop = scene.isSolidAt(checkX, topY);
    const hitBottom = scene.isSolidAt(checkX, bottomY);

    if (hitTop || hitBottom) {
      const col = floor(checkX / TILE_SIZE);
      const tileX = movingRight
        ? col * TILE_SIZE  // left side of the right tile
        : (col + 1) * TILE_SIZE;  // right side of the left tile
      this.vel.x = 0; // stop horizontal velocity
      this.pos.x = tileX + (movingRight ? -r : r); // align to side of tile
      this.onWall = true; // mark as on wall
    }
  }

  // collision with tiles above and below
  resolveVerticalCollision(scene) {
    const r = this.radius;
    this.onGround = false;

    // check ground when v.y > 0
    if (this.vel.y >= 0) {
      const footY = this.pos.y + r;
      const checkY = footY + EPS;

      const leftX = this.pos.x - r * 0.4;
      const rightX = this.pos.x + r * 0.4;

      const groundedLeft = scene.isSolidAt(leftX, checkY);
      const groundedRight = scene.isSolidAt(rightX, checkY);

      if (groundedLeft || groundedRight) {
        this.vel.y = 0; // stop downward velocity
        this.pos.y = floor(footY / TILE_SIZE) * TILE_SIZE - r; // align to top of tile
        this.onGround = true; // mark as on ground
        this.lastJumpPos = this.pos.copy(); // update last jump position
      }
    }

    // check ceiling when v.y < 0
    if (this.vel.y < 0) {
      const headY = this.pos.y - r;
      const checkY = headY - EPS;

      const leftX = this.pos.x - r * 0.4;
      const rightX = this.pos.x + r * 0.4;

      const hitTopLeft = scene.isSolidAt(leftX, checkY);
      const hitTopRight = scene.isSolidAt(rightX, checkY);

      if (hitTopLeft || hitTopRight) {
        this.vel.y = 0; // stop upward velocity
        this.pos.y = (floor(headY / TILE_SIZE) + 1) * TILE_SIZE + r; // align to bottom of tile
      }
    }
  }

  // prevent going out of canvas bounds
  resolveEdgeCollision(canvasWidth, canvasHeight) {
    const r = this.radius;
    // left
    if (this.pos.x - r < 0) {
      this.pos.x = r;
      if (this.vel.x < 0) this.vel.x = 0;
    }
    // right
    if (this.pos.x + r > canvasWidth) {
      this.pos.x = canvasWidth - r;
      if (this.vel.x > 0) this.vel.x = 0;
    }
    // top
    if (this.pos.y - r < 0) {
      this.pos.y = r;
      if (this.vel.y < 0) this.vel.y = 0;
    }
    // bottom
    if (this.pos.y + r > canvasHeight) {
      this.pos.y = canvasHeight - r;
      if (this.vel.y > 0) this.vel.y = 0;
    }
  }

  jump(power = 10) {
    if (this.onGround) {
      this.vel.y = -power;
      this.onGround = false;
    }
  }

  getHitbox() {
    return {
      x: this.pos.x,
      y: this.pos.y,
      r: this.radius
    };
  }
}

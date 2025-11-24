// function to generate a personality object with random trait values
function generatePersonality() {
  return {
    Se: floor(random(1, 100)),
    Si: floor(random(1, 100)),
    Ne: floor(random(1, 100)),
    Ni: floor(random(1, 100)),
    Te: floor(random(1, 100)),
    Ti: floor(random(1, 100)),
    Fe: floor(random(1, 100)),
    Fi: floor(random(1, 100))
  }
}

class Snake {
  constructor(x, y) {
    this.pos = createVector(x, y);
  }
}
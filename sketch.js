let sceneConfig;
let layoutConfig;
let tilesetConfig;
let scene;
let tileset;

let player;
let snakes = [];

let canvas;
let scale = 1;

function preload() {
  sceneConfig = loadJSON("assets/data/scenes/sceneDefault.json");
  layoutConfig = loadJSON("assets/data/tileSheet.json");
  tilesetConfig = loadJSON("assets/data/tilesets/default.json");
  tilesetImage = loadImage("assets/sprites/World.png");
  bgImage = loadImage("assets/sprites/background.png");
}

function setup() {
  canvas = createCanvas(WORLD_WIDTH, WORLD_HEIGHT); // Create a canvas that fills the window
  canvas.parent("canvas-wrapper");
  scene = new Scene(sceneConfig, layoutConfig, tilesetConfig, tilesetImage, bgImage);
  initGame(scene);
  scene.render();

  fitCanvasWrapperHeight();
  updateCanvasScale();
}

function initGame(scene) {
  snakes = [];
  player = new Player(300, 300);
  const snakeNum = floor(random(5, 9))
  for (let i = 0; i < snakeNum; i++) {
    snakes.push(spawnSnakeOnRandomWall(scene));
  }
}

function spawnSnakeOnRandomWall(scene) {
  const wallGrid = scene.layout.wall;
  const collisionGrid = scene.layout.collision;

  const maxTry = 200;

  for (let i = 0; i < maxTry; i++) {
    const row = floor(random(0, WORLD_ROWS));
    const col = floor(random(0, WORLD_COLS));

    const wallId = wallGrid[row][col];
    const collisionId = collisionGrid[row][col];

    if (wallId > 0 && collisionId === 0) {

      const pos = {
        x: col * TILE_SIZE + TILE_SIZE * 0.5,
        y: row * TILE_SIZE + TILE_SIZE * 0.5
      };

      const snake = new Snake(scene, pos.x, pos.y);
      return snake;
    }
  }

  return null;
}

function draw() {
  background(0);

  player.update(scene);
  snakes.forEach(snake => snake.update(player));

  scene.draw();
  player.draw();
  snakes.forEach(snake => snake.draw());

  checkSnakeEatPlayer();
}

function checkSnakeEatPlayer() {
  if (!player || !snakes) return;

  snakes.forEach(snake => {
    const head = snake.body.head;
    const pPos = player.body.pos;

    const snakeHeadRadius = snake.body.thickness;
    const playerRadius = player.body.radius;

    const d = dist(head.x, head.y, pPos.x, pPos.y);

    const eatThreshold = snakeHeadRadius + playerRadius * 0.5;

    if (d < eatThreshold) {
      console.log("Snake ate the player!");

      initGame(scene);
    }
  });
}

function updateCanvasScale() {
  const wrapper = document.getElementById("canvas-wrapper");
  if (!wrapper) return;

  const wrapperWidth = wrapper.clientWidth;
  const wrapperHeight = wrapper.clientHeight;

  const worldRatio = WORLD_WIDTH / WORLD_HEIGHT;
  const wrapperRatio = wrapperWidth / wrapperHeight;

  let drawWidth, drawHeight;

  if (wrapperRatio > worldRatio) {
    drawHeight = wrapperHeight;
    drawWidth = drawHeight * worldRatio;
  } else {
    drawWidth = wrapperWidth;
    drawHeight = drawWidth / worldRatio;
  }

  scaleFactor = drawWidth / WORLD_WIDTH;

  const c = canvas.elt;
  c.style.width = drawWidth + "px";
  c.style.height = drawHeight + "px";
}

function fitCanvasWrapperHeight() {
  const ui = document.getElementById("ui-wrapper");
  const wrapper = document.getElementById("canvas-wrapper");
  if (!ui || !wrapper) return;

  const uiHeight = ui.getBoundingClientRect().height;
  const availHeight = window.innerHeight - uiHeight;

  wrapper.style.height = `${availHeight}px`;
}

function windowResized() {
  updateCanvasScale();
}

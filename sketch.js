let canvas;
let scale = 1;

function setup() {
  canvas = createCanvas(WORLD_WIDTH, WORLD_HEIGHT); // Create a canvas that fills the window
  canvas.parent("canvas-wrapper");
  fitCanvasWrapperHeight();
  updateCanvasScale();

  loadAssets();
}

function draw() {
  background(0);

  if (!assetsLoaded) return;

  // logic
  player.update(scene);
  snakes.forEach((snake) => snake.update(player));

  // rendering
  scene.draw();
  player.draw(currentSceneType);
  snakes.forEach((snake) => snake.draw(currentSceneType));

  // checks
  checkSnakeEatPlayer();
  checkPLayerReachedEnd();
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

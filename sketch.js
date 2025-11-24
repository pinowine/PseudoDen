let sceneConfig;
let layoutConfig;
let tilesetConfig;
let scene;

let player;

function preload() {
  sceneConfig = loadJSON("assets/data/scenes/sceneDefault.json");
  layoutConfig = loadJSON("assets/data/tileSheet.json");
  tilesetConfig = loadJSON("assets/data/tilesets/default.json");
}

function setup() {
  createCanvas(WORLD_WIDTH, WORLD_HEIGHT); // Create a canvas that fills the window
  frameRate(60);
  player = new Player(300, 300);
  scene = new Scene(sceneConfig, layoutConfig, tilesetConfig);
  console.log("collisionLayer:", scene.collisionLayer);
  console.log("solid at (300, 800):", scene.isSolidAt(300, 800));
  scene.render();
}

function draw() {
  background(220);
  player.update(scene);
  player.draw();
  scene.draw();
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight); // Resize the canvas when the window is resized
// }

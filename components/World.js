const WORLD_WIDTH = 1600;
const WORLD_HEIGHT = 880;

const TILE_SIZE = 40;
const WORLD_COLS = WORLD_WIDTH / TILE_SIZE;
const WORLD_ROWS = WORLD_HEIGHT / TILE_SIZE;

class Scene {
  constructor(sceneData, layoutData, tilesetData) {
    this.tileset = tilesetData;
    this.layout = layoutData;

    this.layers = sceneData.layers.map(layerObj => {
      const sourceName = layerObj.source; // get source name
      const layerData = this.layout[sourceName];
      return new Layer(layerObj, layerData, this.tileset);
    });

    this.collisionLayer = this.layers.find(l => l.type === "collision");
  }

  // buffered  rendering
  render() {
    for (const layer of this.layers) {
      layer.renderToBuffer();
    }
  }
  draw() {
    for (const layer of this.layers) {
      layer.draw();
    }
  }

  // global collision check
  isSolidAt(x, y) {
    const col = floor(x / TILE_SIZE);
    const row = floor(y / TILE_SIZE);
    if (!this.collisionLayer) return false;
    const tile = this.collisionLayer.getTile(col, row);
    return tile ? tile.solid : false;
  }

}

// class for a single layer of the world
class Layer {
  constructor(layerObj, layoutData, tileset) {
    this.layer = layerObj.layer;
    this.type = layerObj.type;
    this.tileset = tileset;
    this.buffer = createGraphics(WORLD_WIDTH, WORLD_HEIGHT);
    this.tiles = this.createTiles(layoutData);

    this.renderToBuffer();
    this.applyPostProcess();
  }

  // obj type: { valid: true/false, ... }
  createTiles(layoutData) {
    const tiles = [];
    for (let row = 0; row < WORLD_ROWS; row++) {
      for (let col = 0; col < WORLD_COLS; col++) {
        const tileId = layoutData[row][col];
        tiles.push(new Tile(col, row, tileId, this.tileset));
      }
    }
    return tiles;
  }

  // offscreen rendering
  renderToBuffer() {
    const buf = this.buffer;
    buf.clear();
    buf.noStroke();
    for (const tile of this.tiles) {
      tile.draw(buf);
    }
    this.applyPostProcess(this.layer);
  }

  // post processing after loading the layer
  applyPostProcess() {
    const buf = this.buffer;
    buf.filter(BLUR, this.layer)
  }

  // draw the layer buffer to the main canvas
  draw() {
    image(this.buffer, 0, 0, width, height);
  }

  // get specific tile at (col, row)
  getTile(col, row) {
    if (row < 0 || row >= WORLD_ROWS || col < 0 || col >= WORLD_COLS) return null;
    return this.tiles[col + row * WORLD_COLS];
  }
}

class Tile {
  constructor(x, y, tileId, tileset) {
    this.x = x;
    this.y = y;
    this.id = tileId;
    this.tileset = tileset;
    const def = tileset?.[tileId];
    this.solid = !!(def && def.solid);
  }
  draw(buf) {
    const t = this.tileset[this.id];
    if (!t) return; // skip if tile not found

    const [r, g, b, a = 255] = t.color;

    buf.push();
    buf.fill(r, g, b, a);
    // console.log(this.tileset[this.id].color);
    buf.rect(this.x * TILE_SIZE, this.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    buf.pop();
  }
}

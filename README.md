# Everyeye Everywhere All at Once

<sub>Iburpofennist, 2025. Source Code: [GitHub](https://github.com/pinowine/PseudoDen), Play Online: [Production page](https://pseudoden.ibuprofennist.com).
</sub>

<video controls src="https://private-user-images.githubusercontent.com/119881770/524511903-57635772-fbf6-4dbb-b912-70031d982d33.mov?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjUzMjI0OTQsIm5iZiI6MTc2NTMyMjE5NCwicGF0aCI6Ii8xMTk4ODE3NzAvNTI0NTExOTAzLTU3NjM1NzcyLWZiZjYtNGRiYi1iOTEyLTcwMDMxZDk4MmQzMy5tb3Y_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMjA5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTIwOVQyMzE2MzRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1jNWNjODk2NzI1ODNiNzU0NzcwYjZkMzM5MWRjOTVmMmIzOGJhZDU2M2NlMTQwMTMxYzczMmVlMTdlZDQzYjA0JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.9uC5AEqEzufnZEKoJoLfrfLtJM67b--22GkYjxaAxDE"> </video>

> [!NOTE]
>
> <details>
> <summary>About Citations</summary>
>
> I have mentioned the code references a lot in the previous works, so I will skip the concepts/functions/algorithm in this list (to shorten the document, new stuff will be mentioned below):
>
> <ul><li>p5 drawing: startShape(), endShape(), vertex(), offscreen buffer, etc;</li>
> <li>p5 vector and calculations: add(), sub(), mult(), div(), mag(), normalize(), dist(), etc;</li>
> <li>OOP: constructor(), this, Class, new instance, etc;</li>
> <li>p5/js maths: atan2(), abs(), etc;</li>
> <li>js array methods: array.includes(), array.map(), array.forEach(), array.find(), etc;</li>
> <li>JSON data import and storage.</li></ul>
>
> </details>

## Concept & Inspiration

This project is an extension of my previous work [Worm & Rat](https://git.arts.ac.uk/z-chen02202510/Critical-Coding-Notebook/blob/main/Assignment5.md). In that project, I dived into random walk, or more specifically, **path finding algorithm**. The critique of it inspired me to create some sort of infinite scene where the character and scene will be different every time you run the script.

Controlled randomness, which is affected by a suite of personality using [Jungian cognitive functions](https://www.cognitiveprocesses.com/), is my previous idea, and I would like to keep it. Some classmates said that there is not enough interations between the worms and the environment, and I agree with it.

So here, I combined the develop experience of the [generative scene project](https://git.arts.ac.uk/z-chen02202510/Critical-Coding-Notebook/blob/main/Assignment6.md) and [collage project](https://git.arts.ac.uk/z-chen02202510/Critical-Coding-Notebook/blob/main/Assignment7.md) with the original idea. I also get an inspiration from [_Everyeye Everywhere All at Once_](https://en.wikipedia.org/wiki/Everything_Everywhere_All_at_Once), a movie I watched several years ago with overwhelmingly massive visual effects.

![Everyeye Everywhere All at Once](https://raw.githubusercontent.com/pinowine/PseudoDen/main/assets/readme/film.png)

<sub>_Everyeye Everywhere All at Once_, 2022</sub>

### Porting from Previous Work

So basically this project is highly attached to my previous works below, I will simply explain the main part I borrowed from them:

- [Simple Push-the-Box Game](https://git.arts.ac.uk/z-chen02202510/Critical-Coding-Notebook/blob/main/Assignment2.md): State machine system in reflection and grid-based world.
- [Worm & Rat](https://git.arts.ac.uk/z-chen02202510/Critical-Coding-Notebook/blob/main/Assignment5.md): The procedural animation and the personality system.
- [Generative Scene](https://git.arts.ac.uk/z-chen02202510/Critical-Coding-Notebook/blob/main/Assignment6.md): Offscreen buffer in reflection and properties passing between instances.
- [Collage](https://git.arts.ac.uk/z-chen02202510/Critical-Coding-Notebook/blob/main/Assignment7.md): The asset loading system (how to deal with JSON and images) and sprite-sheet cutting.
- One Godot DEMO of my personal work: Player controller, tilesets, tilemap, 2D platform game physics, etc.

<video controls src="https://private-user-images.githubusercontent.com/119881770/524510782-a2f7fb3d-73ba-430a-af98-798e6d9e99f2.MP4?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjUzMjI4ODcsIm5iZiI6MTc2NTMyMjU4NywicGF0aCI6Ii8xMTk4ODE3NzAvNTI0NTEwNzgyLWEyZjdmYjNkLTczYmEtNDMwYS1hZjk4LTc5OGU2ZDllOTlmMi5NUDQ_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMjA5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTIwOVQyMzIzMDdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wMGI4ZDUxNDhiODQ1NzhkOWQwOTY4NGUyYWM5ODUxMDQ1YzhlMDgyMWY3ZWUwZWMzMDRiYWMzZjMwYWE4M2I4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.9H_WSKKxfh1pd0gg1Urs4bMkuObjTOXkGdiPlBcjFL4"></video>

<sub>The records of the Godot-based DEMO. I ported the player control system, player appearance and tilemap system into p5.js. </sub>

## Coding Process

### Planning before Coding

I thought a lot about the project structure. Initially, I was thinking about using a simple loop to create a fake-infinity. There are dozons of scenes with the extact same layout, but different render features - this allows a smaller project size and still a good visual experience.

![Planning](https://raw.githubusercontent.com/pinowine/PseudoDen/main/assets//readme/construction.png)

<sub>Planning before coding</sub>

So I deconstructed the project into parts showing above, which at the same time told me how to structure the classes:

- Scene: One screen of the game
  - Layer: collision, wall, bg
    - Tile: each tile is a sprite
- Player
  - Controller
  - Physics: RigidBody and Gravity
  - Graphics: An eye
- Hunter
  - Personality
  - Movement:
    - Physics: RigidBody and Gravity
    - AI: Pathfinding
  - Graphics: A snake

So after writing this clean structure, I started coding.

### Skeleton Building

According to my previous experience on React coding and the analyse above, I create this project strcuture:

- assets/
  - data/
  - images/
- components/
  - Hunter.js
  - Player.js
  - World.js
- libraries/
- index.html
- sketch.js
- style.css

> It's not the project tree now, because some of them are too big that I break them into smaller js files.

### World Bulding

I tried to build the tileset world first. Here is the basic settings:

```js
const WORLD_WIDTH = 1600;
const WORLD_HEIGHT = 880;
const TILE_SIZE = 40;
const WORLD_COLS = WORLD_WIDTH / TILE_SIZE;
const WORLD_ROWS = WORLD_HEIGHT / TILE_SIZE;
```

So I create a 40\*22 grid system, each of them should be fill with one tile. A normal tileset is like this:

![tileset](https://raw.githubusercontent.com/pinowine/PseudoDen/main/assets//sprites/sheets/default_01.png)

What you need to do is match the tileset index to the world grid index, and fill the grid with the tile. So the world data mapping is like this flow: scene -> layer -> world grid index -> tileset index -> tile.

That's how I create these four JSON files to storage data:

- `scene.json`: claming which tileset to use (visual controller)

```js
"id": "default_01",
"tilesprite": "assets/sprites/sheets/default_01.png",
"bg": "assets/sprites/backgrounds/default_01.png",
"type": "default"
```

- `layouts.json`: using 0&1 to mark the tile values of each layer, exp, 0 means empty, 1 and bigger numbers mean different tileset index

```js
"collision": [
    [1, 0, 1, 2, ...],
    [0, 1, 8, 1, ...],
    ...
]
```

- `layers.json`: assign layout data to each layer
  - `collision`: physics checks and tilesets
  - `wall`: single color tectangle for hunter to climb on
  - `bg`: background image

```js
"layer": 0,
"type": "collision",
"source": "collision" // find the "collision layer" data in "layouts.collision"
```

- `tilesets.json`: assign the tile values to the tileset index and bound to a tile image

```js
"1": { // layout value 1 -> tileset index 1
    "name": "floor",
    "solid": true, // affect the physics
    "spriteVariants": [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5]
    ] // tile coordinates in the tileset
}
```

So in `World.js`, I just need to pass the data from `class Scene` to `class Layer` to `class Tile`, and finally render the tile to the buffer.

#### Image Processing

The original tileset is from an [open source asset](https://szadiart.itch.io/pixel-fantasy-caves). I used Photopshop to edit and arrange them into the 6\*6 gird above.

Then based on the initial tileset, I created several variantions of it but with the same layout. I put them into three main groups:

- Default: high-resolution or some kind of realisctic style;
- Abstract: low-poly, line-art, vector art, abstractionism, etc;
- Devmode: reveal how I name and arrange the tileset.

![devmode](https://raw.githubusercontent.com/pinowine/PseudoDen/main/assets/sprites/sheets/devmode_01.png)

<sub>Devmode tileset</sub>

> [!NOTE]
> I used generative AI here to create several art styles here, including:
>
> - [Sketch style](https://github.com/pinowine/PseudoDen/tree/main/assets/sprites/sheets/abstract_04.png)
> - [Pen paint](https://github.com/pinowine/PseudoDen/tree/main/assets/sprites/sheets/abstract_05.png)
> - [Comic](https://github.com/pinowine/PseudoDen/tree/main/assets/sprites/sheets/abstract_06.png)
> - [Abstract expressionism](https://github.com/pinowine/PseudoDen/tree/main/assets/sprites/sheets/abstract_07.png)
> - [Water color](https://github.com/pinowine/PseudoDen/tree/main/assets/sprites/sheets/default_07.png)
> - [Oil paint](https://github.com/pinowine/PseudoDen/tree/main/assets/sprites/sheets/default_11.png)
> - [Cubism](https://github.com/pinowine/PseudoDen/tree/main/assets/sprites/sheets/default_13.png)
> - [Deconstructivism](https://github.com/pinowine/PseudoDen/tree/main/assets/sprites/sheets/default_14.png)
>
>   Other images are created by figma or photoshop.

![layout](https://raw.githubusercontent.com/pinowine/PseudoDen/main/assets/readme/layout-building-tool.png)

<sub>Layout intially is like this</sub>

### Player

Player is a simple eye, so the appearance is easy to code - just several ellipses. The key here is the physics, which is implemented in [`RigidBody.js`](https://github.com/pinowine/PseudoDen/tree/main/components/RigidBody.js).

#### Controller System

Since it's a port of the Godot project, I will briefly explain the controller system here. I should cite that the basic concept comes from these two videos: [Improve your platformer's Jump](https://www.youtube.com/watch?v=2S3g8CgBG1g) and [Improve your platformer' with forces](https://www.youtube.com/watch?v=KbtcEVCM7bw).

- Horizonontal Movement:
  - Acceleration: pressing the direction key will give player an acceleration
    - When in the air, the acceleration will be reduced
  - High speed cap
  - Friction to prevent immediate stop
- Vertical Movement:
  - Gravity: add gravity when falling to prevent "floating"
  - Falling: High speed cap
  - Jump: pressing the jump key will give player a jump force
    - The longer you hold the jump key, the higher you will jump
    - Using cyote time(allowing the player to jump for a short time when leaving the platform) to make the jump feel easier

#### Procedural Animation

Reference the verticies of the body to animate the eye balls. It will "look" at the direction of the player facing.

```js
const v = this.body.vel.copy();
const speed = v.mag();
...
v.normalize();
const maxOffset = this.body.radius * 0.7;
const t = constrain(speed / this.body.maxHorizontalSpeed, 0, 1);
const dEye = t * maxOffset;
this.eyePos = v.mult(dEye);
...
stroke(0);
ellipse(this.eyePos.x, this.eyePos.y, this.body.radius * 0.9);
```

### Hunter

It's actually one kind of hunter, a snake. Initially I tried to make it universal and portable to every kind of hunter, but it's too complex and I don't have the time to finish it.

The snake part is basically same as the [Random Walking project](https://git.arts.ac.uk/z-chen02202510/Critical-Coding-Notebook/blob/main/Assignment5.md), so I will only exlplain the polished part.

#### Pathfinding

Last time I used a self-developed pathfinding algorithm, using a radius to check the availability of the path. But that only works without blocks and limitations, like an empty wall. So I learned a new algorithm, **A\* Pathfinding Algorithm** [in this video](http://youtube.com/watch?v=9W8hNdEUFbc), which is widely used in game development.

So basically, the snake will find the shortest path to the goal in the wall layer, avoiding rushing into the collision layer. The goal is set by its "mind".

#### Personality

Desipite the 8 personalities are pasted from the previous work, I still use two classes: mind and sense, to connect the snake's personality to its behavior.

The `mind` class contains a simple state machine, which controls the snake's intentions. For example, this state "idle" will make the snake stay still for a while:

```js
switch (this.state) {
  ...
  case "idle":
    this.updateIdle();
    break;
  ...
}
...
updateIdle() {
  this.body.setSpeedMultiplier(0.2);
  if (!this.currentTarget || this._nearTarget(this.currentTarget)) {
    this.currentTarget = this._pickPatrolPoint();
  }
  // Transition to PATROL after some time
  if (this.stateTime > 2000) {
    this.transitionTo("PATROL");
  }
  this.checkForPlayer();
}
```

The `this.stateTime` is directly affected by its personality, like some snakes are more active than others.

The `sense` class is used to detect the player's position and pass results to the `mind` class. I deisgned both hearing and vision systems, the former will not be blocked but vigarious, while the later is exact but will be blocked by the wall, and also has a FOV standing for a limited range.

![debugging scene](https://raw.githubusercontent.com/pinowine/PseudoDen/main/assets/readme/dev-shot.png)

<sub>Debugging scene</sub>

## Critique

In the critique at the final week, I showed an imcomplete version of the game, which only has one scene.

![critique](https://raw.githubusercontent.com/pinowine/PseudoDen/main/assets/readme/initial-scene.png)

<sub>Initial scene</sub>

I noted these comments:

- storyline / narrative
- animal well vibe
- not so original

I am not quite sure about the originality of the game. It based on a lot of exsisting works for sure. I actually focused on optimizing narrative. I changed the tile form "pseudo grotto", which is kind of like a region name in a metroidvania game, to "Everyeye Everywhere All at Once". I also added butch of scenes with different artsyles to give more game vibes. I also added an intro scene with simple HTML/CSS/JS.

Yeah, some of the concepts came after the game was almost finished. But I think it's a natural process.

![intro](https://raw.githubusercontent.com/pinowine/PseudoDen/main/assets/readme/intro.png)

<sub>Intro scene</sub>

## Issues and Solutions

### Async loading

The main issue in this project is the nested JSON data cause loading error. You cannot just preload() everything, since you need the data in json to pick the right image to load. So I learned to use `async` and `await` to load the data in json first, then load the images.

```js
async function loadAssets() {
  try {
    const [layoutResponse, tilesetResponse, layerResponse, sceneResponse] =
      await Promise.all([
        fetch("assets/data/layouts.json"),
        fetch("assets/data/tilesets.json"),
        fetch("assets/data/layers.json"),
        fetch("assets/data/scenes.json"),
      ]);
    layoutConfig = await layoutResponse.json();
    tilesetConfig = await tilesetResponse.json();
    layerConfig = await layerResponse.json();
    sceneConfig = await sceneResponse.json();

    const imagePromises = [];
    sceneConfig.scenes.forEach((def) => {
      imagePromises.push(
        loadImageAsync(def.tilesprite).then((img) => {
          tilesetImages[def.id] = img;
        })
      );
      imagePromises.push(
        loadImageAsync(def.bg).then((img) => {
          bgImages[def.id] = img;
        })
      );
    });
    length = sceneConfig.scenes.length;
    await Promise.all(imagePromises);
    assetsLoaded = true;
    console.log("All assets loaded.");
    const loadingStatus = document.getElementById("loading-status");
    if (loadingStatus) {
      loadingStatus.textContent = "Assets ready. Click “Start Game”.";
    }
  } catch (error) {
    console.error("Error loading assets:", error);
    const loadingStatus = document.getElementById("loading-status");
    if (loadingStatus) {
      loadingStatus.textContent = "Failed to load assets (see console).";
    }
  }
}
```

### Drawing order

The default drawing order makes background always on top, which is not what I want. So I used a silly way to make the background draw last - manually sorting the layers.

```js
draw() {
  if (this.bgLayer && this.bgImage) {
    const masked = this.bgImage.get();
    masked.mask(this.bgLayer.maskBuffer);
    image(masked, 0, 0, width, height);
  }
  // decoupling layers to render in a right order
  for (const layer of this.layers) {
    if (layer.type === "wall") layer.draw();
  }
  for (const layer of this.layers) {
    if (layer.type === "collision") layer.draw();
  }
}
```

## Technical Stack

- p5.js
- HTML/CSS/JS
- Github + Netlify + Cloudflare: I use github as source cide repo, netlify as production page, and cloudflare as CDN. I use my subdomain pseudoden.ibuprofennist.com to host the game.
- photoshop, figma
- Gemini Nano: create several artstyles mentioned above

## References

- [Async/Await](https://editor.p5js.org/mjvo/sketches/B2CDPEgY)
- [Fetch/Promise](https://editor.p5js.org/codingtrain/sketches/9S6fLgE_A)
- [Improve your platformer's Jump](https://www.youtube.com/watch?v=2S3g8CgBG1g)
- [Improve your platformer' with forces](https://www.youtube.com/watch?v=KbtcEVCM7bw)
- [A\* Pathfinding Algorithm](http://youtube.com/watch?v=9W8hNdEUFbc)

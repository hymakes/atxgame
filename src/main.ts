import { DisplayMode, Engine, Color, FadeInOut, Label, vec, BaseAlign, Font, TextAlign } from "excalibur";
import { loader } from "./resources";
import { Level1 } from "./level1";
import { Level2 } from "./level2";

// Goal is to keep main.ts small and just enough to configure the engine

const game = new Engine({
  width: 800, // Logical width and height in game pixels
  height: 600,
  displayMode: DisplayMode.FitScreenAndFill, // Display mode tells excalibur how to fill the window
  pixelArt: true, // pixelArt will turn on the correct settings to render pixel art without jaggies or shimmering artifacts
  scenes: {
    level1: {
      scene: Level1,
      transitions: {
        in: new FadeInOut({duration: 500, direction: 'in', color: Color.Black}),
        out: new FadeInOut({duration: 500, direction: 'out', color: Color.Black})
      }
    },
    level2: Level2,
   // other: Level2
  },
  // physics: {
  //   solver: SolverStrategy.Realistic,
  //   substep: 5 // Sub step the physics simulation for more robust simulations
  // },
  // fixedUpdateTimestep: 16 // Turn on fixed update timestep when consistent physic simulation is important
});

const customFont = new Font({
    family: "Arial", // Font family
    size: 20,        // Font size
    textAlign: TextAlign.Left, // Text alignment
    baseAlign: BaseAlign.Top,  // Baseline alignment
    color: Color.White,        // Text color
});

// Counter label
const counterLabel = new Label({
    text: `Tacos: 0`,
    pos: vec(0, 0),
    font: customFont,
});
counterLabel.z = 100;
game.add(counterLabel);

game.start(loader).then(() => {
  game.goToScene('level2');
});

import { Engine, Scene } from "excalibur";
import { Resources } from "./resources";
import { LevelOverlay } from "./level-overlay";

export class Level2 extends Scene {
  override onInitialize(engine: Engine): void {
    Resources.Level2.addToScene(this);
    this.add(new LevelOverlay());

  }
}

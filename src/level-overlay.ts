import * as ex from 'excalibur'
import { Resources } from './resources'
import { tacoCounter } from './taco-counter'

export class LevelOverlay extends ex.ScreenElement {
  private tacoCounter!: TacoCounter

  constructor() {
    super({
      z: 1000,
      anchor: ex.vec(0, 0),
      color: ex.Color.Green,
    })
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.tacoCounter = new TacoCounter({ z: this.z })

    this.tacoCounter.pos = ex.vec(16, 16)

    this.addChild(this.tacoCounter)
    this.pos = ex.vec(this.viewport.left, this.viewport.top)
  }

  get viewport() {
    if (this.scene) {
      const camera = this.scene.camera
      const engine = this.scene.engine

      const cameraLeft = camera.drawPos.x - engine.halfDrawWidth
      const cameraTop = camera.drawPos.y - engine.halfDrawHeight

      return new ex.BoundingBox({
        left: cameraLeft,
        top: cameraTop,
        right: engine.drawWidth,
        bottom: engine.drawHeight,
      })
    }

    return new ex.BoundingBox()
  }
}

const customFont = new ex.Font({
    family: "Arial", // Font family
    size: 20,        // Font size
    textAlign: ex.TextAlign.Left, // Text alignment
    baseAlign: ex.BaseAlign.Top,  // Baseline alignment
    color: ex.Color.White,        // Text color
});

class TacoCounter extends ex.ScreenElement {
  private label!: ex.Label

  constructor(args: ex.ActorArgs = {}) {
    super({
      ...args,
      anchor: ex.vec(0, 0.5),
    })
  }

  onInitialize(engine: ex.Engine<any>): void {
    const icon = new ex.Actor({
      anchor: ex.vec(0, 0.5),
      x: 0,
      y: 8,
      coordPlane: ex.CoordPlane.Screen,
      z: this.z,
      width: 20,
      height: 20
    });
    icon.graphics.use(Resources.TacoPng.toSprite());
    this.addChild(icon)

    this.label = new ex.Label({
      anchor: ex.vec(0, 0.5),
      text: '0',
      pos: ex.vec(icon.width + 10, -1),
      font: customFont,
      color: ex.Color.White,
      z: this.z,
      coordPlane: ex.CoordPlane.Screen,
    })

    this.addChild(this.label)
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    this.label.text = tacoCounter.toString();
  }
}

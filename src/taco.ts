import * as ex from 'excalibur';
import { Resources } from './resources';

export class Taco extends ex.Actor {
    constructor(pos: ex.Vector) {
        super({
            pos,
            width: 16,
            height: 16,
            collisionType: ex.CollisionType.Passive,
            name: "Taco"
        })
    }

    public onInitialize(engine: ex.Engine): void {
      this.graphics.use(Resources.TacoPng.toSprite());
    }
}

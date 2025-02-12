import * as ex from 'excalibur';
import { Resources } from './resources';
import { Config } from './config';
import { incrementTacoCounter } from './taco-counter';

export class Player extends ex.Actor {
  public tacos: number = 0;
  public nearNPC: boolean = false;

  constructor(pos: ex.Vector) {
      super({
          pos,
          width: 16,
          height: 16,
          collisionType: ex.CollisionType.Active
      })
  }

  onInitialize(engine: ex.Engine): void {
    this.tacos = 0;
    const playerSpriteSheet = ex.SpriteSheet.fromImageSource({
        image: Resources.HeroSpriteSheetPng as ex.ImageSource,
        grid: {
            spriteWidth: 16,
            spriteHeight: 16,
            rows: 4,
            columns: 3
        }
    });

      const leftIdle = new ex.Animation({
          frames: [
              {graphic: playerSpriteSheet.getSprite(2, 1) as ex.Sprite, duration: Config.PlayerFrameSpeed}
          ]
      })
      this.graphics.add('left-idle', leftIdle);

      const rightIdle = new ex.Animation({
          frames: [
              {graphic: playerSpriteSheet.getSprite(2, 2) as ex.Sprite, duration: Config.PlayerFrameSpeed},
          ]
      })
      this.graphics.add('right-idle', rightIdle);


      const upIdle = new ex.Animation({
          frames: [
              {graphic: playerSpriteSheet.getSprite(2, 3) as ex.Sprite, duration: Config.PlayerFrameSpeed},

          ]
      })
      this.graphics.add('up-idle', upIdle);

      const downIdle = new ex.Animation({
          frames: [
              {graphic: playerSpriteSheet.getSprite(1, 0) as ex.Sprite, duration: Config.PlayerFrameSpeed}
           ]
      })
      this.graphics.add('down-idle', downIdle);

      const leftWalk = new ex.Animation({
          frames: [
              {graphic: playerSpriteSheet.getSprite(0, 1) as ex.Sprite, duration: Config.PlayerFrameSpeed},
              {graphic: playerSpriteSheet.getSprite(1, 1) as ex.Sprite, duration: Config.PlayerFrameSpeed},
              {graphic: playerSpriteSheet.getSprite(2, 1) as ex.Sprite, duration: Config.PlayerFrameSpeed},
          ]
       })
       this.graphics.add('left-walk', leftWalk);

       const rightWalk = new ex.Animation({
          frames: [
              {graphic: playerSpriteSheet.getSprite(0, 2) as ex.Sprite, duration: Config.PlayerFrameSpeed},
              {graphic: playerSpriteSheet.getSprite(1, 2) as ex.Sprite, duration: Config.PlayerFrameSpeed},
              {graphic: playerSpriteSheet.getSprite(2, 2) as ex.Sprite, duration: Config.PlayerFrameSpeed},
          ]
      });
      this.graphics.add('right-walk', rightWalk);

      const upWalk = new ex.Animation({
          frames: [
              {graphic: playerSpriteSheet.getSprite(0, 3) as ex.Sprite, duration: Config.PlayerFrameSpeed},
              {graphic: playerSpriteSheet.getSprite(1, 3) as ex.Sprite, duration: Config.PlayerFrameSpeed},
              {graphic: playerSpriteSheet.getSprite(2, 3) as ex.Sprite, duration: Config.PlayerFrameSpeed},
          ]
      });
      this.graphics.add('up-walk', upWalk);

      const downWalk = new ex.Animation({
          frames: [
              {graphic: playerSpriteSheet.getSprite(0, 0) as ex.Sprite, duration: Config.PlayerFrameSpeed},
              {graphic: playerSpriteSheet.getSprite(1, 0) as ex.Sprite, duration: Config.PlayerFrameSpeed},
              {graphic: playerSpriteSheet.getSprite(2, 0) as ex.Sprite, duration: Config.PlayerFrameSpeed},
          ]
      });
      this.graphics.add('down-walk', downWalk);
  }

  onPreUpdate(engine: ex.Engine, elapsedMs: number): void {
    this.vel = ex.Vector.Zero;

    this.graphics.use('down-idle');
    if (engine.input.keyboard.isHeld(ex.Keys.ArrowRight)) {
      this.vel = ex.vec(Config.PlayerSpeed, 0);
      this.graphics.use('right-walk');
    }

    if (engine.input.keyboard.isHeld(ex.Keys.ArrowLeft)) {
      this.vel = ex.vec(-Config.PlayerSpeed, 0);
      this.graphics.use('left-walk');
    }

    if (engine.input.keyboard.isHeld(ex.Keys.ArrowUp)) {
      this.vel = ex.vec(0, -Config.PlayerSpeed);
      this.graphics.use('up-walk');
    }

    if (engine.input.keyboard.isHeld(ex.Keys.ArrowDown)) {
      this.vel = ex.vec(0, Config.PlayerSpeed);
      this.graphics.use('down-walk');
    }

    if (engine.input.keyboard.wasPressed(ex.Keys.Space) && this.nearNPC) {
      window.alert("alright, alright, alright");
    }

    ex.Debug.drawRay(new ex.Ray(this.pos, this.vel), { distance: 100, color: ex.Color.Red });
  }

  onPostUpdate(engine: ex.Engine, elapsed: number): void {
    if (engine.currentScene.actors.filter((actor) => actor.name === "Person")[0]) {
      this.nearNPC = this.within(engine.currentScene.actors.filter((actor) => actor.name === "Person")[0], 1);
    }
  }

  onCollisionStart(self: ex.Collider, other: ex.Collider, side: ex.Side, contact: ex.CollisionContact): void {
    //console.log(other);
    if (other.owner.name === "Taco") {
      //window.alert("taco collected");
      incrementTacoCounter();
      other.owner.kill();
    }

  }

  onCollisionEnd(self: ex.Collider, other: ex.Collider, side: ex.Side, lastContact: ex.CollisionContact): void {
  }
}

import * as ex from 'excalibur';
import { Resources } from './resources';
import { Config } from './config';

export class Person extends ex.Actor {
  constructor(pos: ex.Vector) {
      super({
          pos,
          width: 16,
          height: 16,
          collisionType: ex.CollisionType.Fixed,
          name: "Person"
      })
    this.addTag("alright");
  }

  onInitialize(engine: ex.Engine): void {
    const playerSpriteSheet = ex.SpriteSheet.fromImageSource({
        image: Resources.PersonSpriteSheetPng as ex.ImageSource,
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
  }
}

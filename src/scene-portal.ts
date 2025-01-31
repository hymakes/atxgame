import * as ex from 'excalibur';

export class ScenePortal extends ex.Actor {
  public destinationScene: string = '';
  constructor(pos: ex.Vector, destinationScene: string) {
    super({
      pos,
      width: 16,
      height: 16,
      collisionType: ex.CollisionType.Passive
    });
    this.destinationScene = destinationScene;
  }

  onInitialize(engine: ex.Engine): void {
  }

  onCollisionStart(self: ex.Collider, other: ex.Collider, side: ex.Side, contact: ex.CollisionContact): void {
    //window.alert("Entered scene portal. Going to scene: [" + this.destinationScene + ']');
    this.scene?.engine.goToScene(this.destinationScene);
  }

  onCollisionEnd(self: ex.Collider, other: ex.Collider, side: ex.Side, lastContact: ex.CollisionContact): void {

  }
}

import { CircleColliderComponent } from "../../../engine/_components/CircleColliderComponent";
import { PhysicsComponent } from "../../../engine/_components/PhysicsComponent";
import { _Entity } from "../../../engine/_entities";
import { MovementScript } from "./scripts/MovementScript";

export class Player extends _Entity {
  radius = 16;
  playerSpawn = {
    x: window.screen.width / 3,
    y: window.screen.height / 3,
  };

  constructor() {
    super();
    this.position = this.playerSpawn;
    this.addComponent(
      new CircleColliderComponent({
        id: "player-collider",
        entity: this,
        radius: this.radius,
        position: this.position,
      })
    );
    this.addComponent(
      new PhysicsComponent({
        bodyType: "KINEMATIC",
        entity: this,
        mass: 50,
        maxVelocity: { dx: 0.8, dy: 0.8 },
        friction: 0.1,
      })
    );
    this.addScript(new MovementScript({ player: this }));
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#ff4242";
    ctx.fill();

    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
  }
}

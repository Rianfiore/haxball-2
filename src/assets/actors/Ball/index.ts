import { CircleColliderComponent } from "../../../engine/_components/CircleColliderComponent";
import { PhysicsComponent } from "../../../engine/_components/PhysicsComponent";
import { _Entity } from "../../../engine/_entities";

export class Ball extends _Entity {
  radius = 8;
  ballSpawn = {
    x: window.screen.width / 2,
    y: window.screen.height / 2,
  };

  constructor() {
    super();
    this.position = this.ballSpawn;
    this.radius = this.radius;
    this.addComponent(
      new CircleColliderComponent({
        id: "ball-collider",
        entity: this,
        radius: this.radius,
        position: this.position,
      })
    );
    this.addComponent(
      new PhysicsComponent({
        bodyType: "KINEMATIC",
        entity: this,
        mass: 0.5,
        maxVelocity: { dx: 15, dy: 15 },
        friction: 0.0125,
      })
    );
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
  }
}

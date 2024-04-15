import { BoxColliderComponent } from "../../../engine/_components/BoxColliderComponent";
import { PhysicsComponent } from "../../../engine/_components/PhysicsComponent";
import { _Entity } from "../../../engine/_entities";

interface FieldProps {
  width: number;
  height: number;
}

export class Field extends _Entity {
  width: number;
  height: number;
  fieldSpawn = {
    x: window.screen.width / 2,
    y: window.screen.height / 2,
  };

  constructor(props: FieldProps) {
    super();
    this.width = props.width;
    this.height = props.height;
    this.addComponent(
      new PhysicsComponent({
        bodyType: "STATIC",
        entity: this,
        mass: 9999,
        maxVelocity: { dx: 0, dy: 0 },
        friction: 0,
      })
    );
    const colliderheight = 10;

    const topCollider = new BoxColliderComponent({
      id: "top-field-collider",
      entity: this,
      width: this.width,
      height: colliderheight,
      position: {
        x: this.fieldSpawn.x,
        y: this.fieldSpawn.y - this.height / 2 - colliderheight / 2,
      },
    });

    const bottomCollider = new BoxColliderComponent({
      id: "bottom-field-collider",
      entity: this,
      width: this.width,
      height: colliderheight,
      position: {
        x: this.fieldSpawn.x,
        y: this.fieldSpawn.y + this.height / 2 + colliderheight / 2,
      },
    });

    const leftCollider = new BoxColliderComponent({
      id: "left-field-collider",
      entity: this,
      width: 10,
      height: this.height,
      position: {
        x: this.fieldSpawn.x - this.width / 2 - colliderheight / 2,
        y: this.fieldSpawn.y,
      },
    });

    const rightCollider = new BoxColliderComponent({
      id: "right-field-collider",
      entity: this,
      width: 10,
      height: this.height,
      position: {
        x: this.fieldSpawn.x + this.width / 2 + colliderheight / 2,
        y: this.fieldSpawn.y,
      },
    });

    this.addComponents([
      topCollider,
      bottomCollider,
      leftCollider,
      rightCollider,
    ]);
  }

  render(ctx: CanvasRenderingContext2D) {
    // Desenhe aqui um retângulo que represente o campo, sem fillStyle
    const fieldPositionX = this.fieldSpawn.x - this.width / 2;
    const fieldPositionY = this.fieldSpawn.y - this.height / 2;

    ctx.beginPath();
    ctx.rect(fieldPositionX, fieldPositionY, this.width, this.height);
    ctx.strokeStyle = "#e5e5e5";
    ctx.stroke();
    ctx.closePath();
  }
}

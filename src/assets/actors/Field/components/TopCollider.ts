import { Bodies } from "matter-js";
import { CreateFieldColliderParams } from "../types";

export class TopCollider {
  body: Matter.Body;

  constructor({
    colliderSize,
    fieldPosition,
    fieldSize,
    strokeWidth,
  }: CreateFieldColliderParams) {
    this.body = Bodies.rectangle(
      fieldPosition.x,
      fieldPosition.y - fieldSize.height / 2 - colliderSize / 2,
      fieldSize.width * 2,
      colliderSize + strokeWidth * 2,
      { isStatic: true, collisionFilter: { group: -1 } }
    );
  }
}

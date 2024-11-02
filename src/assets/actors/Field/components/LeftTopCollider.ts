import { Bodies } from "matter-js";
import { CreateFieldColliderParams } from "../types";

export class LeftTopCollider {
  body: Matter.Body;

  constructor({
    colliderSize,
    fieldPosition,
    fieldSize,
    goalSize,
    strokeWidth,
  }: CreateFieldColliderParams) {
    this.body = Bodies.rectangle(
      fieldPosition.x - fieldSize.width / 2 - colliderSize / 2,
      fieldPosition.y - fieldSize.height / 2 - strokeWidth,
      colliderSize,
      fieldSize.height - goalSize - strokeWidth * 2,
      { isStatic: true, collisionFilter: { group: -1 } }
    );
  }
}

import { Position } from "@/engine/utils/Position";
import defaultTheme from "@/styles/theme";
import Matter, { Bodies } from "matter-js";
import { GoalComponentProps, GoalDirection } from "../types";

export class BackSide {
  body: Matter.Body;
  goalDirection: GoalDirection;
  goalSpawn: Position;
  goalHeight: number;
  postRadius: number;
  pinDistanceFromPost: number;

  constructor(props: GoalComponentProps) {
    this.goalDirection = props.goalDirection;
    this.goalSpawn = props.goalSpawn;
    this.goalHeight = props.goalHeight;
    this.postRadius = props.postRadius;
    this.pinDistanceFromPost = props.pinDistanceFromPost;

    const backColliderX =
      this.goalDirection === "LEFT"
        ? props.goalSpawn.x - props.goalHeight
        : props.goalSpawn.x + props.goalHeight;

    this.body = Bodies.rectangle(
      backColliderX,
      props.goalSpawn.y,
      props.goalHeight,
      props.goalHeight * 2,
      { isStatic: true, collisionFilter: { group: -1 } }
    );
  }

  render(ctx: CanvasRenderingContext2D) {
    const sideXPosition =
      this.goalDirection === "LEFT"
        ? this.pinDistanceFromPost
        : -this.pinDistanceFromPost;

    ctx.beginPath();
    ctx.moveTo(
      this.goalSpawn.x - sideXPosition,
      this.goalSpawn.y - this.goalHeight / 2 - this.postRadius
    );
    ctx.lineTo(
      this.goalSpawn.x - sideXPosition,
      this.goalSpawn.y + this.goalHeight / 2 + this.postRadius
    );
    ctx.strokeStyle = defaultTheme.colors.neutral.white;
    ctx.stroke();
    ctx.closePath();
  }
}

import { Position } from "@/engine/utils/Position";
import defaultTheme from "@/styles/theme";
import { Bodies } from "matter-js";
import { GoalComponentProps, GoalDirection } from "../types";

export class LeftPin {
  body: Matter.Body;
  position: Position;
  goalDirection: GoalDirection;
  goalSpawn: Position;
  goalHeight: number;
  postRadius: number;
  pinDistanceFromPost: number;
  pinRadius: number;

  constructor(props: GoalComponentProps) {
    this.goalDirection = props.goalDirection;
    this.goalSpawn = props.goalSpawn;
    this.goalHeight = props.goalHeight;
    this.postRadius = props.postRadius;
    this.pinDistanceFromPost = props.pinDistanceFromPost;
    this.pinRadius = props.pinRadius;

    const pinXPosition =
      this.goalDirection === "LEFT"
        ? this.pinDistanceFromPost / 1.3
        : -this.pinDistanceFromPost / 1.3;

    const pinYPosition =
      this.goalDirection === "LEFT"
        ? this.pinDistanceFromPost / 1.5
        : this.pinDistanceFromPost / 1.5;

    this.position = {
      x: this.goalSpawn.x - pinXPosition * 2,
      y:
        this.goalSpawn.y - this.goalHeight / 2 - this.postRadius - pinYPosition,
    };

    this.body = Bodies.circle(
      this.position.x,
      this.position.y,
      props.pinRadius,
      {
        isStatic: true,
      }
    );
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.pinRadius, 0, Math.PI * 2);

    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.strokeStyle = defaultTheme.colors.neutral.black;
    ctx.stroke();
    ctx.closePath();
  }
}

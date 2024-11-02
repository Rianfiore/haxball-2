import { Position } from "@/engine/utils/Position";
import defaultTheme from "@/styles/theme";
import { GoalComponentProps, GoalDirection } from "../types";

export class LeftLineToPin {
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
  }
  render(ctx: CanvasRenderingContext2D) {
    const sideXPosition =
      this.goalDirection === "LEFT"
        ? this.pinDistanceFromPost
        : -this.pinDistanceFromPost;

    const pinXPosition =
      this.goalDirection === "LEFT"
        ? this.pinDistanceFromPost / 1.3
        : -this.pinDistanceFromPost / 1.3;

    const pinYPosition =
      this.goalDirection === "LEFT"
        ? this.pinDistanceFromPost / 1.5
        : this.pinDistanceFromPost / 1.5;

    ctx.beginPath();
    ctx.moveTo(
      this.goalSpawn.x - sideXPosition,
      this.goalSpawn.y - this.goalHeight / 2 - this.postRadius
    );
    ctx.lineTo(
      this.goalSpawn.x - pinXPosition * 2,
      this.goalSpawn.y - this.goalHeight / 2 - this.postRadius - pinYPosition
    );
    ctx.strokeStyle = defaultTheme.colors.neutral.white;
    ctx.stroke();
    ctx.closePath();
  }
}

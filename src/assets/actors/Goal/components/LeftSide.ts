import { Position } from "@/engine/utils/Position";
import defaultTheme from "@/styles/theme";
import { GoalComponentProps, GoalDirection } from "../types";

export class LeftSide {
  postRadius: number;
  goalHeight: number;
  goalDirection: GoalDirection;
  goalSpawn: Position;
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
    ctx.beginPath();
    ctx.moveTo(
      this.goalSpawn.x - sideXPosition,
      this.goalSpawn.y - this.goalHeight / 2 - this.postRadius
    );
    ctx.lineTo(
      this.goalSpawn.x,
      this.goalSpawn.y - this.goalHeight / 2 - this.postRadius
    );
    ctx.strokeStyle = defaultTheme.colors.neutral.white;
    ctx.stroke();
    ctx.closePath();
  }
}

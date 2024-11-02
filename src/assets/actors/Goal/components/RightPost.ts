import { Position } from "@/engine/utils/Position";
import defaultTheme from "@/styles/theme";
import { Bodies } from "matter-js";
import { GoalComponentProps } from "../types";

export class RightPost {
  body: Matter.Body;
  goalSpawn: Position;
  goalHeight: number;
  postRadius: number;

  constructor(props: GoalComponentProps) {
    this.goalSpawn = props.goalSpawn;
    this.goalHeight = props.goalHeight;
    this.postRadius = props.postRadius;

    this.body = Bodies.circle(
      this.goalSpawn.x,
      this.goalSpawn.y + this.goalHeight / 2 + this.postRadius,
      this.postRadius,
      { isStatic: true }
    );
  }
  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(
      this.goalSpawn.x,
      this.goalSpawn.y + this.goalHeight / 2 + this.postRadius,
      this.postRadius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.strokeStyle = defaultTheme.colors.neutral.black;
    ctx.stroke();
    ctx.closePath();
  }
}

import { Position } from "@/engine/utils";
import defaultTheme from "@/styles/theme";
import { Bodies } from "matter-js";

interface PlayerActionAreaProps {
  position: Position;
}
export class PlayerActionArea {
  position: Position;
  radius = 28;
  body: Matter.Body;

  constructor(props: PlayerActionAreaProps) {
    this.position = props.position;

    this.body = Bodies.circle(this.position.x, this.position.y, this.radius, {
      isSensor: true,
      isStatic: true,
      collisionFilter: {
        group: -1,
      },
    });
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(
      this.position.x,
      this.position.y,
      this.body.circleRadius!,
      0,
      Math.PI * 2
    );
    ctx.strokeStyle = defaultTheme.colors.neutral["white/50"];
    ctx.stroke();
    ctx.closePath();
  }
}

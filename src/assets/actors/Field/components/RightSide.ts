import { Field } from "@/assets/actors";
import defaultTheme from "@/styles/theme";
export class RightSide {
  static render(ctx: CanvasRenderingContext2D) {
    const fieldPositionX = Field.spawn.x + Field.width / 2;
    const fieldPositionY = Field.spawn.y + Field.height / 2;

    ctx.beginPath();
    ctx.moveTo(
      fieldPositionX,
      fieldPositionY - Field.height / 2 + Field.goalSize / 2
    );
    ctx.lineTo(fieldPositionX, fieldPositionY);
    ctx.lineTo(fieldPositionX - Field.width, fieldPositionY);
    ctx.lineTo(
      fieldPositionX - Field.width,
      fieldPositionY - Field.height / 2 + Field.goalSize / 2
    );

    ctx.strokeStyle = defaultTheme.colors.neutral.white;
    ctx.lineWidth = Field.strokeWidth;
    ctx.stroke();
    ctx.closePath();
  }
}

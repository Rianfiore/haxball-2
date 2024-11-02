import { Field } from "@/assets/actors";
import defaultTheme from "@/styles/theme";
export class RightGoalStripe {
  static render(ctx: CanvasRenderingContext2D) {
    const bigArea = {
      w: Field.width / 8,
      h: Field.height / 2.2,
      x: Field.spawn.x + Field.width / 2 - Field.width / 8,
      y: Field.spawn.y - Field.height / 4.4,
    };

    const grandeAreaCircle = {
      x: bigArea.x + bigArea.w - Field.width / 8,
      y: bigArea.y + bigArea.h / 2,
      r: 120,
    };

    const penaltyCircleRadius = 5;

    ctx.beginPath();
    ctx.rect(bigArea.x, bigArea.y, bigArea.w, bigArea.h);
    ctx.strokeStyle = defaultTheme.colors.neutral["white/50"];
    ctx.lineWidth = Field.strokeWidth;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(
      grandeAreaCircle.x + grandeAreaCircle.r / 1.4,
      grandeAreaCircle.y,
      grandeAreaCircle.r,
      Math.PI * 2 - (Math.PI * 2) / 4 - 0.8,
      (Math.PI * 2) / 4 + 0.8,
      true
    );
    ctx.strokeStyle = defaultTheme.colors.neutral["white/50"];
    ctx.lineWidth = Field.strokeWidth;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.ellipse(
      grandeAreaCircle.x + grandeAreaCircle.r / 2,
      grandeAreaCircle.y,
      penaltyCircleRadius,
      penaltyCircleRadius,
      0,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = defaultTheme.colors.neutral["white/50"];
    ctx.fill();
    ctx.closePath();
    // const fieldPositionX = Field.spawn.x + Field.width / 2;
    // const fieldPositionY = Field.spawn.y + Field.height / 2;

    // ctx.beginPath();
    // ctx.moveTo(
    //   fieldPositionX,
    //   fieldPositionY - Field.height / 2 + Field.goalSize / 2
    // );
    // ctx.lineTo(
    //   fieldPositionX,
    //   fieldPositionY - Field.height / 2 - Field.goalSize / 2
    // );
    // ctx.strokeStyle = "rgba(255,255,255aa)";
    // ctx.lineWidth = Field.strokeWidth;
    // ctx.stroke();
    // ctx.closePath();
  }
}

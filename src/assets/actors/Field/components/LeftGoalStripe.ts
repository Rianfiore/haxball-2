import { Field } from "@/assets/actors";
import defaultTheme from "@/styles/theme";
export class LeftGoalStripe {
  static render(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = defaultTheme.colors.neutral["white/50"];
    ctx.lineWidth = Field.strokeWidth;
    ctx.fillStyle = defaultTheme.colors.neutral["white/50"];

    const bigArea = {
      w: Field.width / 8,
      h: Field.height / 2.2,
      x: Field.spawn.x - Field.width / 2,
      y: Field.spawn.y - Field.height / 4.4,
    };

    const bigAreaCircle = {
      x: bigArea.x + bigArea.w,
      y: bigArea.y + bigArea.h / 2,
      r: 120,
    };

    const penaltyCircleRadius = 5;

    // Big Area
    ctx.beginPath();
    ctx.rect(bigArea.x, bigArea.y, bigArea.w, bigArea.h);
    ctx.stroke();
    ctx.closePath();

    // Big Area Circle
    ctx.beginPath();
    ctx.arc(
      bigAreaCircle.x - bigAreaCircle.r / 1.4,
      bigAreaCircle.y,
      bigAreaCircle.r,
      Math.PI * 2 - (Math.PI * 2) / 4 + 0.8,
      (Math.PI * 2) / 4 - 0.8,
      false
    );
    ctx.stroke();
    ctx.closePath();

    // Penalty Circle
    ctx.beginPath();
    ctx.ellipse(
      bigAreaCircle.x - bigAreaCircle.r / 2,
      bigAreaCircle.y,
      penaltyCircleRadius,
      penaltyCircleRadius,
      0,
      0,
      Math.PI * 2
    );

    ctx.fill();
    ctx.closePath();
  }
}

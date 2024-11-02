import defaultTheme from "@/styles/theme";
import { Player } from "..";

export class PlayerShotIndicator {
  static width = 60;
  static height = 8;
  static progress = 0;
  static isRendering = false;

  private renderShotIndicatorBar(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "gray";
    ctx.fillRect(
      Player.position.x - PlayerShotIndicator.width / 2,
      Player.position.y +
        Player.actionArea.radius +
        PlayerShotIndicator.height / 1.2,
      PlayerShotIndicator.width,
      PlayerShotIndicator.height
    );
  }

  private renderShotIndicatorProgress(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = defaultTheme.colors.neutral.white;
    ctx.fillRect(
      Player.position.x - PlayerShotIndicator.width / 2,
      Player.position.y +
        Player.actionArea.radius +
        PlayerShotIndicator.height / 1.2,
      PlayerShotIndicator.progress,
      PlayerShotIndicator.height
    );

    ctx.strokeStyle = defaultTheme.colors.neutral.black;

    ctx.strokeRect(
      Player.position.x - PlayerShotIndicator.width / 2,
      Player.position.y +
        Player.actionArea.radius +
        PlayerShotIndicator.height / 1.2,
      PlayerShotIndicator.width,
      PlayerShotIndicator.height
    );
  }

  render(ctx: CanvasRenderingContext2D) {
    if (PlayerShotIndicator.progress) {
      this.renderShotIndicatorBar(ctx);
      this.renderShotIndicatorProgress(ctx);
    }
  }
}

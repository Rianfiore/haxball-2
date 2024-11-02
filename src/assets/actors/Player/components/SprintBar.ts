import { Field } from "@/assets/actors";
import defaultTheme from "@/styles/theme";

export class PlayerSprintBar {
  static width: number;
  static height = 20;
  static progress = 0;
  static recoverProgress = 0;
  static isRendering = false;

  private renderSprintBar(ctx: CanvasRenderingContext2D) {
    const position = {
      x: window.screen.width / 2 - PlayerSprintBar.width / 2,
      y:
        window.screen.height / 2 +
        Field.height / 2 +
        PlayerSprintBar.height / 1.5,
    };

    ctx.beginPath();
    ctx.fillStyle = defaultTheme.colors.neutral["white/20"];
    ctx.fillRect(
      position.x,
      position.y,
      PlayerSprintBar.width,
      PlayerSprintBar.height
    );
    ctx.closePath();
  }

  private renderSprintBarProgress(ctx: CanvasRenderingContext2D) {
    const position = {
      x: window.screen.width / 2 - PlayerSprintBar.width / 2,
      y:
        window.screen.height / 2 +
        Field.height / 2 +
        PlayerSprintBar.height / 1.5,
    };

    ctx.fillStyle = defaultTheme.colors.neutral.white;
    ctx.fillRect(
      position.x,
      position.y,
      PlayerSprintBar.progress,
      PlayerSprintBar.height
    );
  }

  private renderSprintBarRecoverProgress(ctx: CanvasRenderingContext2D) {
    const position = {
      x: window.screen.width / 2 - PlayerSprintBar.width / 2,
      y:
        window.screen.height / 2 +
        Field.height / 2 +
        PlayerSprintBar.height / 1.5,
    };

    ctx.fillStyle = defaultTheme.colors.neutral["white/10"];
    ctx.fillRect(
      position.x,
      position.y,
      PlayerSprintBar.progress + Field.strokeWidth,
      PlayerSprintBar.height
    );
  }

  render(ctx: CanvasRenderingContext2D) {
    if (PlayerSprintBar.isRendering) {
      this.renderSprintBar(ctx);
      this.renderSprintBarProgress(ctx);
    } else {
      this.renderSprintBarRecoverProgress(ctx);
    }
  }
}

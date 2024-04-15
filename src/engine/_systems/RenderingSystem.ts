import { CanvasComponent } from "../_components";
import { _Entity } from "../_entities";
import { CANVAS_ID } from "../constants/ids";
import { _System } from "./_System";

interface RenderingSystemProps {
  entities: _Entity[];
}

export class RenderingSystem extends _System {
  entities: _Entity[];
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(props: RenderingSystemProps) {
    super(props.entities);

    this.entities = props.entities;
    this.canvas = new CanvasComponent({
      id: CANVAS_ID,
    }).canvasRef;

    this.ctx = this.canvas.getContext("2d")!;
  }

  getCanvas() {
    return this.canvas;
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const entity of this.entities) {
      entity.render(this.ctx);
    }
  }
}

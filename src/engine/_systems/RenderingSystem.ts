import { CanvasComponent } from "@/engine/_components";
import { _Entity } from "@/engine/_entities";
import { CANVAS_ID } from "@/engine/constants/ids";
import { Engine, Render, Runner } from "matter-js";
import { _System } from "./_System";

interface RenderingSystemProps {
  entities: _Entity[];
  engine: Engine;
}

export class RenderingSystem extends _System {
  render: Render;
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

    this.render = Render.create({
      element: this.canvas,
      engine: props.engine,
      options: {
        width: this.canvas.width,
        height: this.canvas.height,
      },
    });

    Render.run(this.render);

    Runner.run(Runner.create(), props.engine);
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

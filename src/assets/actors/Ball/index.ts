import { _Entity } from "@/engine/_entities";
import defaultTheme from "@/styles/theme";
import { Bodies, Body } from "matter-js";
import { MovementScript } from "./scripts/MovementScript";
import { IBall } from "./types";

export class Ball extends _Entity implements IBall {
  static radius = 8;
  static spawn = {
    x: window.screen.width / 2,
    y: window.screen.height / 2,
  };
  static body = Bodies.circle(Ball.spawn.x, Ball.spawn.y, Ball.radius, {
    restitution: 0.8,
    friction: 0,
    frictionStatic: 0,
    frictionAir: 0.016,
    mass: 0.05,
    slop: 0.01,
  });

  constructor() {
    super({ position: Ball.spawn, body: Ball.body });

    new MovementScript();
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(Ball.position.x, Ball.position.y, Ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = defaultTheme.colors.neutral.white;
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.strokeStyle = defaultTheme.colors.neutral.black;
    ctx.stroke();
    ctx.closePath();
  }

  static reset() {
    Body.setPosition(Ball.body, Ball.spawn);
    Body.setVelocity(Ball.body, { x: 0, y: 0 });
  }
}

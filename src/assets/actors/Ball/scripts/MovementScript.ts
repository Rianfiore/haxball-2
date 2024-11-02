import { Game } from "@/assets/Game";
import { Ball, Field, Player } from "@/assets/actors";
import { Script } from "@/engine/utils/Script";
import { Body, Collision } from "matter-js";

export class MovementScript extends Script {
  initialBallRestitution: number;
  constructor() {
    super();

    this.initialBallRestitution = Ball.body.restitution;

    this.start();
  }

  private softenBallWhenDragByPlayer() {
    const walls = Field.body;

    const hasBeenBallTouchedOnPlayer = Boolean(
      Collision.collides(Ball.body, Player.body)
    );

    const hasBeenBallTouchedOnWalls = walls.some((wall) =>
      Collision.collides(Ball.body, wall)
    );

    if (hasBeenBallTouchedOnPlayer && !hasBeenBallTouchedOnWalls) {
      Ball.body.restitution = -1;
    } else {
      Ball.body.restitution = this.initialBallRestitution;
    }
  }

  private softenBallWhenTouchedOnGoalBackCollider() {
    const leftGoalBackSide = Game.leftGoal.backSide.body;
    const rightGoalBackCollider = Game.rightGoal.backSide.body;

    const hasBeenBallTouchedOnGoalBackCollider = Boolean(
      Collision.collides(Ball.body, leftGoalBackSide) ||
        Collision.collides(Ball.body, rightGoalBackCollider)
    );
    if (hasBeenBallTouchedOnGoalBackCollider) {
      Ball.body.restitution = 0;
      const newBallVelocity = {
        x: Ball.body.velocity.x / 10,
        y: Ball.body.velocity.y / 10,
      };
      Body.setVelocity(Ball.body, newBallVelocity);
    }
  }

  private detectCollisionWithWalls() {
    const walls = Field.body;

    const hasBeenBallTouchedOnWalls = walls.some((wall) =>
      Collision.collides(Ball.body, wall)
    );

    if (hasBeenBallTouchedOnWalls) {
      const oppositeForce = {
        x: -Ball.body.force.x,
        y: -Ball.body.force.y,
      };

      Body.applyForce(Ball.body, Ball.position, oppositeForce);
    }
  }

  start() {
    super.start();

    Body.applyForce(Ball.body, Ball.position, {
      x: -0.001,
      y: 0,
    });
  }
  update(timestamp: number) {
    super.update(timestamp);

    Ball.position = Ball.body.position;

    this.softenBallWhenDragByPlayer();
    this.softenBallWhenTouchedOnGoalBackCollider();
    this.detectCollisionWithWalls();
  }
}

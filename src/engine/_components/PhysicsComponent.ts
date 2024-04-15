import { _Entity } from "../_entities";
import { DirectionType } from "../types/Direction.type";
import { Vector2 } from "../types/Vector2";
import { Velocity } from "../utils/Velocity";
import { _Component } from "./_Component";

type BodyType = "STATIC" | "KINEMATIC";

interface PhysicsComponentProps {
  bodyType: BodyType;
  entity: _Entity;
  mass: number;
  friction: number;
  maxVelocity: Velocity;
  acceleration?: Vector2;
}

export class PhysicsComponent extends _Component {
  bodyType: BodyType;
  entity: _Entity;
  mass: number;
  maxVelocity: Velocity;
  velocity: Vector2;
  acceleration: Vector2;
  currentVelocity: Velocity;
  friction: number;

  constructor(props: PhysicsComponentProps) {
    super();
    this.entity = props.entity;
    this.mass = props.mass;
    this.maxVelocity = props.maxVelocity;
    this.acceleration = props.acceleration || { x: 0.0, y: 0.0 };
    this.velocity = { x: 0, y: 0 };
    this.currentVelocity = { dx: 0, dy: 0 };
    this.friction = props.friction;
    this.bodyType = props.bodyType;
  }

  applyForceToDirection(direction: DirectionType, force: number) {
    const acceleration = force / this.mass;

    // Vetores de aceleração normalizados para movimentos diagonais
    const diagonalAcceleration = acceleration / Math.sqrt(2);

    switch (direction) {
      case "UP":
        this.accelerate({ x: 0, y: -acceleration });

        break;
      case "DOWN":
        this.accelerate({ x: 0, y: acceleration });

        break;
      case "LEFT":
        this.accelerate({ x: -acceleration, y: 0 });

        break;
      case "RIGHT":
        this.accelerate({ x: acceleration, y: 0 });
        break;
      case "UP_LEFT": // Movimento diagonal W + A
        this.accelerate({ x: -diagonalAcceleration, y: -diagonalAcceleration });
        break;
      case "UP_RIGHT": // Movimento diagonal W + D
        this.accelerate({ x: diagonalAcceleration, y: -diagonalAcceleration });
        break;
      case "DOWN_LEFT": // Movimento diagonal S + A
        this.accelerate({ x: -diagonalAcceleration, y: diagonalAcceleration });
        break;
      case "DOWN_RIGHT": // Movimento diagonal S + D
        this.accelerate({ x: diagonalAcceleration, y: diagonalAcceleration });
        break;
    }

    this.updateVelocity();
    this.updateCurrentVelocity();
    this.updatePosition();
    this.acceleration = { x: 0, y: 0 };
  }

  applyForce(force: Vector2) {
    const acceleration = {
      x: force.x / this.mass,
      y: force.y / this.mass,
    };

    this.accelerate(acceleration);
    this.updateVelocity();
    this.updateCurrentVelocity();
    this.updatePosition();
    this.acceleration = { x: 0, y: 0 };
  }

  applyFriction() {
    const epsilon = 0.1;

    if (this.acceleration.x === 0) {
      const forceX = this.velocity.x < 0 ? this.friction : -this.friction;

      if (this.velocity.x < epsilon && this.velocity.x > -epsilon) {
        this.velocity.x = 0;
      } else {
        this.velocity.x += forceX;
      }
    }

    if (this.acceleration.y === 0) {
      const forceY = this.velocity.y < 0 ? this.friction : -this.friction;

      if (this.velocity.y < epsilon && this.velocity.y > -epsilon) {
        this.velocity.y = 0;
      } else {
        this.velocity.y += forceY;
      }
    }

    this.updateVelocity();
    this.updateCurrentVelocity();
    this.updatePosition();
  }

  accelerate(acceleration: Vector2) {
    this.acceleration = acceleration;
  }

  smoothVelocity() {
    if (this.currentVelocity.dx > this.maxVelocity.dx) {
      this.velocity.x = this.maxVelocity.dx;
    }

    if (this.currentVelocity.dy > this.maxVelocity.dy) {
      this.velocity.y = this.maxVelocity.dy;
    }

    this.updateVelocity();
  }

  updateVelocity() {
    if (this.currentVelocity.dx > this.maxVelocity.dx) {
      if (this.velocity.x < 0) {
        this.velocity.x = -this.maxVelocity.dx;
      } else {
        this.velocity.x = this.maxVelocity.dx;
      }
    }

    if (this.currentVelocity.dy > this.maxVelocity.dy) {
      if (this.velocity.y < 0) {
        this.velocity.y = -this.maxVelocity.dy;
      } else {
        this.velocity.y = this.maxVelocity.dy;
      }
    }

    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
  }

  updateCurrentVelocity() {
    this.currentVelocity.dx =
      this.velocity.x > 0 ? this.velocity.x : -this.velocity.x;
    this.currentVelocity.dy =
      this.velocity.y > 0 ? this.velocity.y : -this.velocity.y;
  }

  updatePosition() {
    this.entity.position.x += this.velocity.x;
    this.entity.position.y += this.velocity.y;
  }
}

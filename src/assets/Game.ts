import { _Entity } from "../engine/_entities";
import { RenderingSystem } from "../engine/_systems";
import { CollisionSystem } from "../engine/_systems/CollisionSystem";
import { PhysicsSystem } from "../engine/_systems/PhysicsSystem";
import { Ball } from "./actors/Ball";
import { Field } from "./actors/Field";
import { Player } from "./actors/Player";

export class Game {
  entities: _Entity[];
  renderingSystem: RenderingSystem;
  collisionSystem: CollisionSystem;
  physicsSystem: PhysicsSystem;

  constructor() {
    this.entities = [];
    this.renderingSystem = new RenderingSystem({ entities: this.entities });
    this.collisionSystem = new CollisionSystem({ entities: this.entities });
    this.physicsSystem = new PhysicsSystem({ entities: this.entities });

    // Criar player
    const player = new Player();

    // Criar bola
    const ball = new Ball();

    //Criar campo
    const field = new Field({ width: 1000, height: 500 });

    this.entities.push(...[field, player, ball]);
  }

  update() {
    this.renderingSystem.update();
    this.collisionSystem.update();
    this.physicsSystem.update();

    requestAnimationFrame(this.update.bind(this));
  }

  start() {
    requestAnimationFrame(this.update.bind(this));
  }
}

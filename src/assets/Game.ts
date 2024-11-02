import { _Entity } from "@/engine/_entities";
import { PhysicsSystem, RenderingSystem } from "@/engine/_systems";
import { Engine } from "matter-js";
import { UI } from "./UI";
import { Ball, Field, Goal, Player } from "./actors";
import { MatchSystem } from "./systems";
import { GameStateSystem } from "./systems/GameState";

export class Game {
  static entities: _Entity[];
  static engine: Engine;
  static ball: Ball;
  static field: Field;
  static player: Player;
  static leftGoal: Goal;
  static rightGoal: Goal;
  static renderingSystem: RenderingSystem;
  static physicsSystem: PhysicsSystem;
  static matchSystem: MatchSystem;
  static gameStateSystem: GameStateSystem;
  static UI: UI;

  constructor() {
    Game.engine = Engine.create({
      gravity: { x: 0, y: 0 },
    });

    // Criar player
    Game.player = new Player({
      position: {
        x: window.screen.width / 2 - 500,
        y: window.screen.height / 2,
      },
    });

    // Criar bola
    Game.ball = new Ball();

    const goalSize = {
      height: 160,
    };

    //Criar campo
    Game.field = new Field({
      width: 1600,
      height: 800,
      goalSize: goalSize.height,
    });

    Game.leftGoal = new Goal({
      goalDirection: "LEFT",
      position: {
        x: window.screen.width / 2 - Field.width / 2,
        y: window.screen.height / 2,
      },
      ...goalSize,
    });

    Game.rightGoal = new Goal({
      goalDirection: "RIGHT",
      position: {
        x: window.screen.width / 2 + Field.width / 2,
        y: window.screen.height / 2,
      },
      ...goalSize,
    });

    Game.entities = [
      Game.field,
      Game.leftGoal,
      Game.rightGoal,
      Game.player,
      Game.ball,
    ];

    Game.matchSystem = new MatchSystem({
      redTeam: [Game.player],
      blueTeam: [],
    });

    Game.renderingSystem = new RenderingSystem({
      engine: Game.engine,
      entities: Game.entities,
    });
    Game.physicsSystem = new PhysicsSystem({
      engine: Game.engine,
      entities: Game.entities,
    });

    Game.UI = new UI();
  }

  update() {
    Game.renderingSystem.update();
    Game.physicsSystem.update();
    Game.matchSystem.update();
    UI.update();

    requestAnimationFrame(this.update.bind(this));
  }

  start() {
    GameStateSystem.startGame();
    requestAnimationFrame(this.update.bind(this));
  }
}

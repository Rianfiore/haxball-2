import { InputComponent } from "@/engine/_components";
import { _Entity } from "@/engine/_entities";
import { Position } from "@/engine/utils";
import defaultTheme from "@/styles/theme";
import Matter, { Bodies, Body } from "matter-js";
import { PlayerActionArea } from "./components/ActionArea";
import { PlayerShotIndicator } from "./components/ShotIndicator";
import { PlayerSprintBar } from "./components/SprintBar";
import { ActionScript } from "./scripts/ActionScript";
import { MovementScript } from "./scripts/MovementScript";

interface PlayerProps {
  position: Position;
}

export class Player extends _Entity {
  static spawn: Position;
  static body: Matter.Body;
  static actionArea: PlayerActionArea;
  static shotIndicator: PlayerShotIndicator;
  static sprintBar: PlayerSprintBar;
  static radius = 14;
  static maxSpeed = 2.2;
  static maxPace = 0.25;
  static strokeWidth = 1.5;
  static inputComponent: InputComponent;

  constructor(props: PlayerProps) {
    super({ position: props.position, body: Player.body });
    Player.inputComponent = new InputComponent();
    Player.spawn = props.position;
    Player.position = props.position;
    Player.actionArea = new PlayerActionArea({ position: Player.position });
    Player.shotIndicator = new PlayerShotIndicator();
    Player.sprintBar = new PlayerSprintBar();
    Player.body = Bodies.circle(
      Player.position.x,
      Player.position.y,
      Player.radius,
      {
        mass: 50,
        restitution: 0,
        friction: 1,
        frictionAir: 0.05,
        slop: 0.01,

        collisionFilter: {
          group: -1,
        },
      }
    );

    const movementScript = new MovementScript({
      inputComponent: Player.inputComponent,
    });
    const actionScript = new ActionScript({
      inputComponent: Player.inputComponent,
    });

    this.body = [Player.body, Player.actionArea.body];
    this.addScripts([movementScript, actionScript]);
    this.addComponent(Player.inputComponent);
  }

  renderPlayer(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(
      Player.position.x,
      Player.position.y,
      Player.radius,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = defaultTheme.colors.support.red;
    ctx.fill();
    ctx.strokeStyle = defaultTheme.colors.neutral.black;
    ctx.lineWidth = Player.strokeWidth;
    ctx.stroke();
    ctx.closePath();
  }

  render(ctx: CanvasRenderingContext2D) {
    Player.sprintBar.render(ctx);
    Player.shotIndicator.render(ctx);
    Player.actionArea.render(ctx);
    this.renderPlayer(ctx);
  }

  static reset() {
    Body.setPosition(Player.body, Player.spawn);
    PlayerShotIndicator.progress = 0;
    PlayerSprintBar.progress = PlayerSprintBar.width;
  }

  static stop() {
    Body.setVelocity(Player.body, { x: 0, y: 0 });
    Body.setSpeed(Player.body, 0);
  }
}

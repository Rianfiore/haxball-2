import { UI } from "@/assets/UI";
import { Ball, Player } from "@/assets/actors";
import { GameStateSystem } from "@/assets/systems/GameState";
import { InputComponent } from "@/engine/_components";
import { Script } from "@/engine/utils";
import { Body, Collision } from "matter-js";
import { PlayerShotIndicator } from "../components/ShotIndicator";

interface ActionScriptProps {
  inputComponent: InputComponent;
}

export class ActionScript extends Script {
  actionInput: InputComponent;
  maxShotThrust = 0.003;
  thrust = 0.00012;
  shotThrust = 0;

  constructor(props: ActionScriptProps) {
    super();

    this.actionInput = props.inputComponent;

    this.start();
  }

  private detectShotByInput() {
    const hasBeenBallTouchedOnActionArea = Boolean(
      Collision.collides(Player.actionArea.body, Ball.body)
    );

    const isMouseLeftDown = this.actionInput.isButtonDown("MouseLeft");
    const isMouseLeftUp = this.actionInput.isButtonUp("MouseLeft");

    if (isMouseLeftDown) {
      if (this.shotThrust < this.maxShotThrust) {
        PlayerShotIndicator.isRendering = true;
        this.shotThrust += this.thrust;

        if (PlayerShotIndicator.progress < PlayerShotIndicator.width) {
          PlayerShotIndicator.progress =
            (this.shotThrust * PlayerShotIndicator.width) / this.maxShotThrust;
        }
      }
    }

    if (isMouseLeftUp) {
      const shotThrustCharged = this.shotThrust;
      this.shotThrust = 0;
      PlayerShotIndicator.progress = 0;
      PlayerShotIndicator.isRendering = false;

      if (!hasBeenBallTouchedOnActionArea) return;

      if (shotThrustCharged < this.maxShotThrust / 2) {
        this.softenSpeedBallWhenDominatesByPlayer();
      }

      const playerPosition = Player.position;
      const ballPosition = Ball.position;

      // Calcular a distância entre os centros dos dois corpos
      const distanceX = ballPosition.x - playerPosition.x;
      const distanceY = ballPosition.y - playerPosition.y;

      // Calcular a distância entre as bordas dos dois corpos
      const distanceFromBall = Math.abs(
        Math.sqrt(distanceX * distanceX + distanceY * distanceY) -
          (Player.radius + Ball.radius)
      );

      // Calcular o vetor direção entre o jogador e a bola
      const directionVector = {
        x: ballPosition.x - playerPosition.x,
        y: ballPosition.y - playerPosition.y,
      };

      // Calcular o ângulo em radianos
      const angle = Math.atan2(directionVector.y, directionVector.x);

      // Aplicar a força do chute levando em consideração o ângulo
      const forceX = Math.cos(angle) * shotThrustCharged;
      const forceY = Math.sin(angle) * shotThrustCharged;

      const force = {
        x: forceX / (1 + distanceFromBall / 10),
        y: forceY / (1 + distanceFromBall / 10),
      };

      // Aplicar a força à bola
      Body.applyForce(Ball.body, ballPosition, force);
    }
  }

  private softenSpeedBallWhenDominatesByPlayer() {
    const speedDifferenceBetweenBallAndPlayer = Math.abs(
      Ball.body.speed - Player.body.speed
    );

    if (speedDifferenceBetweenBallAndPlayer > 3) {
      const distanceBetweenBallAndPlayer = Math.abs(
        Math.sqrt(
          Math.pow(Ball.position.x - Player.position.x, 2) +
            Math.pow(Ball.position.y - Player.position.y, 2)
        ) - Player.radius
      );

      const ballSpeedReduction = 1 + distanceBetweenBallAndPlayer / 20;

      Body.setVelocity(Ball.body, {
        x: Ball.body.velocity.x / ballSpeedReduction,
        y: Ball.body.velocity.y / ballSpeedReduction,
      });

      Body.setSpeed(Ball.body, Ball.body.speed / ballSpeedReduction);
    }
  }

  update(timestamp: number) {
    super.update(timestamp);

    if (GameStateSystem.isGamePaused || UI.isGameMenuOpened) return;

    this.detectShotByInput();
  }
}

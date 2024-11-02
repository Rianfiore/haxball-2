import { UI } from "@/assets/UI";
import { Field, Player } from "@/assets/actors";
import { GameStateSystem } from "@/assets/systems/GameState";
import { InputComponent } from "@/engine/_components";
import { Script } from "@/engine/utils";
import { Body } from "matter-js";
import { PlayerSprintBar } from "../components/SprintBar";

interface MovementScriptProps {
  inputComponent: InputComponent;
}

export class MovementScript extends Script {
  movementInput: InputComponent;
  thrust = 0.05;
  runForceMultiplier = 1.5;
  maxSpeedWalking: number;
  maxSpeedRunning: number;
  unitWear = 1;
  unitRecoverPace = 2;
  isInstanceField = false;

  constructor(props: MovementScriptProps) {
    super();

    this.movementInput = props.inputComponent;
    this.maxSpeedWalking = Player.maxSpeed;
    this.maxSpeedRunning = Player.maxSpeed * this.runForceMultiplier;
    this.start();
  }

  private detectMovementByInput() {
    let force = { x: 0, y: 0 };

    const isUp = this.movementInput.isButtonDown("KeyW");
    const isDown = this.movementInput.isButtonDown("KeyS");
    const isLeft = this.movementInput.isButtonDown("KeyA");
    const isRight = this.movementInput.isButtonDown("KeyD");
    const isShiftDown = this.movementInput.isButtonDown("ShiftLeft");

    const isMoving = isUp || isDown || isLeft || isRight;

    // Verificar movimentos diagonais
    const isUpLeft = isUp && isLeft;
    const isUpRight = isUp && isRight;
    const isDownLeft = isDown && isLeft;
    const isDownRight = isDown && isRight;

    const isOnlyVerticalOrHorizontal =
      !isUpLeft && !isUpRight && !isDownLeft && !isDownRight;

    // Aplicar forças conforme as teclas pressionadas
    if (isUp && isOnlyVerticalOrHorizontal) {
      force = { x: 0, y: -this.thrust };
    }
    if (isDown && isOnlyVerticalOrHorizontal) {
      force = { x: 0, y: this.thrust };
    }
    if (isLeft && isOnlyVerticalOrHorizontal) {
      force = { x: -this.thrust, y: 0 };
    }
    if (isRight && isOnlyVerticalOrHorizontal) {
      force = { x: this.thrust, y: 0 };
    }

    const diagonalThrust = Math.sqrt(Math.pow(this.thrust, 2) / 2);

    // Movimentos diagonais
    if (isUpLeft) {
      force = { x: -diagonalThrust, y: -diagonalThrust };
    }
    if (isUpRight) {
      force = { x: diagonalThrust, y: -diagonalThrust };
    }
    if (isDownLeft) {
      force = { x: -diagonalThrust, y: diagonalThrust };
    }
    if (isDownRight) {
      force = { x: diagonalThrust, y: diagonalThrust };
    }

    // Se nenhuma tecla estiver pressionada, pare o jogador
    if (!isMoving) {
      force = { x: 0, y: 0 };
    }

    if (isShiftDown) {
      const isPlayerMoving =
        Player.body.velocity.x !== 0 || Player.body.velocity.y !== 0;

      if (isPlayerMoving) {
        this.startSprintMode();
      }
    } else {
      this.recoverSprintMode();
    }

    //Verifica se atingiu a velocidade máxima
    if (Player.body.speed < Player.maxSpeed) {
      Body.applyForce(Player.body, Player.body.position, force);
      Body.setPosition(Player.actionArea.body, Player.body.position);
    }
  }

  private startSprintMode() {
    if (PlayerSprintBar.progress <= 0) {
      Player.maxSpeed = this.maxSpeedWalking;

      return;
    }

    Player.maxSpeed = this.maxSpeedRunning;
    PlayerSprintBar.isRendering = true;

    if (PlayerSprintBar.progress > 0) {
      PlayerSprintBar.progress -= this.unitWear / Player.maxPace;
    } else {
      PlayerSprintBar.progress = 0;
    }
  }

  private recoverSprintMode() {
    Player.maxSpeed = this.maxSpeedWalking;
    PlayerSprintBar.isRendering = false;

    if (PlayerSprintBar.progress < PlayerSprintBar.width) {
      PlayerSprintBar.progress += this.unitRecoverPace;
    } else {
      PlayerSprintBar.progress = PlayerSprintBar.width;
    }
  }

  start() {
    super.start();
  }

  update(timestamp: number) {
    super.update(timestamp);

    if (GameStateSystem.isGamePaused || UI.isGameMenuOpened) {
      Player.stop();
      return;
    }

    Player.position = Player.body.position;
    Player.actionArea.position = Player.position;

    if (!this.isInstanceField) {
      PlayerSprintBar.width = Field.width + Field.strokeWidth * 2;
      PlayerSprintBar.progress = PlayerSprintBar.width;

      this.isInstanceField = true;
    }

    this.detectMovementByInput();
  }
}

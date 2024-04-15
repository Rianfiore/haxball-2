import { Player } from "..";
import { InputComponent } from "../../../../engine/_components/InputComponent";
import { PhysicsComponent } from "../../../../engine/_components/PhysicsComponent";
import { Script } from "../../../../engine/utils/Script";
import { Velocity } from "../../../../engine/utils/Velocity";

interface MovementScriptProps {
  player: Player;
}

export class MovementScript extends Script {
  playerPhysics: PhysicsComponent;
  movementInput: InputComponent;
  force = 10;
  runForceMultiplier = 1.5;
  maxVelocityWalking: Velocity;
  maxVelocityRunning: Velocity;

  constructor(props: MovementScriptProps) {
    super();

    this.playerPhysics = props.player.getComponent(PhysicsComponent)!;
    this.movementInput = new InputComponent();
    this.maxVelocityWalking = this.playerPhysics.maxVelocity;
    this.maxVelocityRunning = {
      dx: this.playerPhysics.maxVelocity.dx * this.runForceMultiplier,
      dy: this.playerPhysics.maxVelocity.dy * this.runForceMultiplier,
    };
    this.start();
  }
  update(timestamp: number) {
    super.update(timestamp);

    const isUp = this.movementInput.isKeyDown("KeyW");
    const isDown = this.movementInput.isKeyDown("KeyS");
    const isLeft = this.movementInput.isKeyDown("KeyA");
    const isRight = this.movementInput.isKeyDown("KeyD");
    const isShift = this.movementInput.isKeyDown("ShiftLeft");

    const isMoving = isUp || isDown || isLeft || isRight;

    // Verificar movimentos diagonais
    const isUpLeft = isUp && isLeft;
    const isUpRight = isUp && isRight;
    const isDownLeft = isDown && isLeft;
    const isDownRight = isDown && isRight;

    const isOnlyVerticalOrHorizontal =
      !isUpLeft && !isUpRight && !isDownLeft && !isDownRight;

    if (isShift && isMoving) {
      this.playerPhysics.maxVelocity = this.maxVelocityRunning;
    } else {
      this.playerPhysics.maxVelocity = this.maxVelocityWalking;
    }

    // Aplicar forças conforme as teclas pressionadas
    if (isUp && isOnlyVerticalOrHorizontal) {
      this.playerPhysics.applyForceToDirection("UP", this.force);
    }
    if (isDown && isOnlyVerticalOrHorizontal) {
      this.playerPhysics.applyForceToDirection("DOWN", this.force);
    }
    if (isLeft && isOnlyVerticalOrHorizontal) {
      this.playerPhysics.applyForceToDirection("LEFT", this.force);
    }
    if (isRight && isOnlyVerticalOrHorizontal) {
      this.playerPhysics.applyForceToDirection("RIGHT", this.force);
    }
    // Movimentos diagonais
    if (isUpLeft) {
      this.playerPhysics.applyForceToDirection("UP_LEFT", this.force);
    }
    if (isUpRight) {
      this.playerPhysics.applyForceToDirection("UP_RIGHT", this.force);
    }
    if (isDownLeft) {
      this.playerPhysics.applyForceToDirection("DOWN_LEFT", this.force);
    }
    if (isDownRight) {
      this.playerPhysics.applyForceToDirection("DOWN_RIGHT", this.force);
    }

    // Se nenhuma tecla estiver pressionada, pare o jogador
    if (!isMoving) {
      this.playerPhysics.accelerate({ x: 0, y: 0 });
    }
  }
}

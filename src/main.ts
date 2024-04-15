// // Entidade
// // class Entity {
// //   components: any[];

import { Game } from "./assets/Game";

// //   constructor() {
// //     this.components = [];
// //   }

// //   addComponent(component: any) {
// //     this.components.push(component);
// //   }
// // }

// // Sistema de movimento
// // class MovementSystem {
// //   entities: Entity[];
// //   canvas: HTMLCanvasElement;

// //   constructor(entities: Entity[]) {
// //     this.entities = entities;
// //     this.canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
// //   }

// //   update(deltaTime: number) {
// //     for (const entity of this.entities) {
// //       const position = entity.components.find(
// //         (comp) => comp instanceof PositionComponent
// //       ) as PositionComponent;
// //       const velocity = entity.components.find(
// //         (comp) => comp instanceof VelocityComponent
// //       ) as VelocityComponent;

// //       if (position && velocity) {
// //         position.x += velocity.dx * deltaTime;
// //         position.y += velocity.dy * deltaTime;

// //         // Detectar colisão com as bordas do canvas
// //         if (position.x - 10 < 0 || position.x + 10 > this.canvas.width) {
// //           velocity.dx = -velocity.dx; // Inverter a direção horizontal
// //         }
// //         if (position.y - 10 < 0 || position.y + 10 > this.canvas.height) {
// //           velocity.dy = -velocity.dy; // Inverter a direção vertical
// //         }
// //       }
// //     }
// //   }
// // }

// // Sistema de renderização
// class RenderingSystem {
//   entities: Entity[];
//   canvas: HTMLCanvasElement;
//   ctx: CanvasRenderingContext2D;

//   constructor(entities: Entity[], canvas: HTMLCanvasElement) {
//     this.entities = entities;
//     this.canvas = canvas;
//     this.ctx = canvas.getContext("2d")!;
//   }

//   update() {
//     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

//     for (const entity of this.entities) {
//       const position: PositionComponent = entity.components.find(
//         (comp) => comp instanceof PositionComponent
//       );

//       if (position) {
//         this.ctx.beginPath();
//         this.ctx.arc(position.x, position.y, 10, 0, Math.PI * 2);
//         this.ctx.fillStyle = "blue";
//         this.ctx.fill();
//         this.ctx.closePath();
//       }
//     }
//   }
// }

// // Jogo
// class Game {
//   entities: Entity[];
//   movementSystem: MovementSystem;
//   renderingSystem: RenderingSystem;
//   canvas: HTMLCanvasElement;
//   lastUpdateTime: number;

//   constructor(canvas: HTMLCanvasElement) {
//     this.canvas = canvas;
//     this.entities = [];
//     this.movementSystem = new MovementSystem(this.entities);
//     this.renderingSystem = new RenderingSystem(this.entities, canvas);
//     this.lastUpdateTime = 0;

//     // Criar bola
//     const ball = new Entity();
//     const ballPosition = new PositionComponent(
//       canvas.width / 2,
//       canvas.height / 2
//     );
//     const ballVelocity = new VelocityComponent(100, 100);
//     ball.addComponent(ballPosition);
//     ball.addComponent(ballVelocity);
//     this.entities.push(ball);
//   }

//   update(timestamp: number) {
//     const deltaTime = (timestamp - this.lastUpdateTime) / 1000;
//     this.lastUpdateTime = timestamp;

//     this.movementSystem.update(deltaTime);
//     this.renderingSystem.update();

//     requestAnimationFrame(this.update.bind(this));
//   }

//   start() {
//     requestAnimationFrame(this.update.bind(this));
//   }
// }

// // Inicialização do jogo
// document.addEventListener("DOMContentLoaded", () => {
//   const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
//   const game = new Game(canvas);

//   game.start();
// });

const game = new Game();
game.start();

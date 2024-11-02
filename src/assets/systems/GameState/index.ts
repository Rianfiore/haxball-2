export class GameStateSystem {
  static isGameOver = false;
  static isGamePaused = false;
  static isGameStarted = false;

  static startGame() {
    this.isGameStarted = true;
    this.isGameOver = false;
  }

  static pauseGame() {
    this.isGamePaused = true;
  }

  static resumeGame() {
    this.isGamePaused = false;
  }

  static endGame() {
    this.isGameOver = true;
    this.isGameStarted = false;
  }
}

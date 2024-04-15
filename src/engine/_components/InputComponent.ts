import { _Component } from ".";

interface KeyState {
  [key: string]: boolean;
}

export class InputComponent extends _Component {
  private keyState: KeyState;

  constructor() {
    super();

    this.keyState = {};

    // Adiciona listeners de eventos para lidar com pressionamento e soltura de teclas
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  // Método para lidar com pressionamento de tecla
  private handleKeyDown(event: KeyboardEvent) {
    this.keyState[event.code] = true;
  }

  // Método para lidar com soltura de tecla
  private handleKeyUp(event: KeyboardEvent) {
    this.keyState[event.code] = false;
  }

  // Método para verificar se uma tecla está pressionada
  isKeyDown(key: string): boolean {
    return this.keyState[key] || false;
  }
}

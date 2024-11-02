import { _Component } from ".";

interface KeyState {
  [key: string]: boolean;
}

type MouseButtonType = "MouseLeft" | "MouseMiddle" | "MouseRight";

enum MouseButtonEnum {
  MouseLeft = 0,
  MouseMiddle = 1,
  MouseRight = 2,
}

export class InputComponent extends _Component {
  private keyState: KeyState;
  private keyWasPressed: KeyState;
  private mouseLeftButtonDown: boolean;
  private mouseLeftButtonUp: boolean;
  private mouseMiddleButtonDown: boolean;
  private mouseMiddleButtonUp: boolean;
  private mouseRightButtonDown: boolean;
  private mouseRightButtonUp: boolean;

  constructor() {
    super();

    this.mouseLeftButtonDown = false;
    this.mouseLeftButtonUp = false;
    this.mouseMiddleButtonDown = false;
    this.mouseMiddleButtonUp = false;
    this.mouseRightButtonDown = false;
    this.mouseRightButtonUp = false;
    this.keyState = {};
    this.keyWasPressed = {};

    // Adiciona listeners de eventos para lidar com pressionamento e soltura de teclas
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));

    // Adiciona listeners de eventos para lidar com pressionamento e soltura de botões do mouse
    window.addEventListener("mousedown", this.handleMouseDown.bind(this));
    window.addEventListener("mouseup", this.handleMouseUp.bind(this));
  }

  isButtonDown(key: string | MouseButtonType): boolean {
    const isKeyIncludesInMouseButtons = key in MouseButtonEnum;

    if (isKeyIncludesInMouseButtons) {
      return this.isMouseDown(key as MouseButtonType);
    }
    return this.isKeyDown(key);
  }

  isButtonUp(key: string | MouseButtonType) {
    const isKeyIncludesInMouseButtons = key in MouseButtonEnum;

    if (isKeyIncludesInMouseButtons) {
      return this.isMouseUp(key as MouseButtonType);
    }
    return this.isKeyUp(key);
  }

  private handleKeyDown(event: KeyboardEvent) {
    this.keyState[event.code] = true;
    this.keyWasPressed[event.code] = true;
  }

  private handleKeyUp(event: KeyboardEvent) {
    this.keyState[event.code] = false;
  }

  private isKeyDown(key: string): boolean {
    return this.keyState[key] || false;
  }

  private isKeyUp(key: string): boolean {
    const isKeyUp = this.keyWasPressed[key] && !this.keyState[key];

    if (isKeyUp) {
      this.keyWasPressed[key] = false;
    }

    return isKeyUp;
  }
  private handleMouseDown(event: MouseEvent) {
    const keyCode = MouseButtonEnum[event.button] as MouseButtonType;

    if (keyCode === "MouseLeft") {
      this.mouseLeftButtonDown = true;
      this.mouseLeftButtonUp = false;
    }

    if (keyCode === "MouseMiddle") {
      this.mouseMiddleButtonDown = true;
      this.mouseMiddleButtonUp = false;
    }

    if (keyCode === "MouseRight") {
      this.mouseRightButtonDown = true;
      this.mouseRightButtonUp = false;
    }

    this.keyState[event.button] = true;
  }

  // Método para lidar com soltura de botão do mouse
  private handleMouseUp(event: MouseEvent) {
    const keyCode = MouseButtonEnum[event.button] as MouseButtonType;

    if (keyCode === "MouseLeft") {
      if (this.mouseLeftButtonDown) {
        this.mouseLeftButtonUp = true;
      }
      this.mouseLeftButtonDown = false;
    }

    if (keyCode === "MouseMiddle") {
      if (this.mouseMiddleButtonDown) {
        this.mouseMiddleButtonUp = true;
      }
      this.mouseMiddleButtonDown = false;
    }

    if (keyCode === "MouseRight") {
      if (this.mouseRightButtonDown) {
        this.mouseRightButtonUp = true;
      }
      this.mouseRightButtonDown = false;
    }

    this.keyState[event.button] = false;
  }

  private isMouseDown(key: MouseButtonType): boolean {
    const keyCode = MouseButtonEnum[key];

    return this.keyState[keyCode] || false;
  }

  private isMouseUp(key: MouseButtonType): boolean {
    const keyCode = MouseButtonEnum[key];

    if (keyCode === MouseButtonEnum.MouseLeft) {
      const mouseLeftUp = this.mouseLeftButtonUp;
      this.mouseLeftButtonUp = false;

      return mouseLeftUp;
    }

    if (keyCode === MouseButtonEnum.MouseMiddle) {
      const mouseMiddleUp = this.mouseMiddleButtonUp;
      this.mouseMiddleButtonUp = false;

      return mouseMiddleUp;
    }

    const mouseRightUp = this.mouseRightButtonUp;
    this.mouseRightButtonUp = false;

    return mouseRightUp;
  }
}

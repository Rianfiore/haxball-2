import { _Component } from "../_components/_Component";
import { Position } from "../utils/Position";
import { Script } from "../utils/Script";

export abstract class _Entity {
  position: Position;
  components: any[];
  private scripts: Script[];

  constructor() {
    this.position = new Position({ x: 0, y: 0 });
    this.components = [];
    this.scripts = [];
  }

  addComponent(component: any) {
    this.components.push(component);
  }

  addComponents(components: any[]) {
    this.components.push(...components);
  }

  getComponent<T extends _Component>(
    componentType: new (...args: any[]) => T
  ): T | undefined {
    const foundComponent = this.components.find(
      (comp) => comp instanceof componentType
    ) as T | undefined;

    return foundComponent;
  }

  getComponents<T extends _Component>(
    componentType: new (...args: any[]) => T
  ): T[] {
    const foundComponents = this.components.filter(
      (comp) => comp instanceof componentType
    ) as T[];

    return foundComponents;
  }

  hasComponent<T extends _Component>(
    componentType: new (...args: any[]) => T
  ): boolean {
    const foundComponent = this.components.find(
      (comp) => comp instanceof componentType
    ) as T | undefined;

    return foundComponent ? true : false;
  }

  addScript(script: Script) {
    this.scripts.push(script);
  }

  addScripts(scripts: Script[]) {
    this.scripts.push(...scripts);
  }

  startScripts() {
    this.scripts.forEach((script) => script.start());
  }

  abstract render(ctx: CanvasRenderingContext2D): void;
}

import { _Component } from "@/engine/_components";
import { Position, Script } from "@/engine/utils";
import Matter from "matter-js";

interface _EntityProps {
  position?: Position;
  body: Matter.Body | Matter.Body[];
}

export abstract class _Entity {
  static position: Position;
  components: any[];
  body: Matter.Body | Matter.Body[];
  private scripts: Script[];

  constructor(props: _EntityProps) {
    _Entity.position = props.position ?? new Position({ x: 0, y: 0 });
    this.components = [];
    this.scripts = [];
    this.body = props.body;
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

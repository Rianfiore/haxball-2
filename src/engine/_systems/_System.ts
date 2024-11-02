import { _Entity } from "@/engine/_entities";
import { Script } from "@/engine/utils";

export abstract class _System {
  entities: _Entity[];
  scripts?: Script[];

  constructor(entities: _Entity[]) {
    this.entities = entities;
  }

  addEntity(entity: _Entity) {
    this.entities.push(entity);
  }

  addEntities(entities: _Entity[]) {
    this.entities.push(...entities);
  }

  addScript(script: Script) {
    this.scripts?.push(script);
  }

  addScripts(scripts: Script[]) {
    this.scripts?.push(...scripts);
  }

  startScripts() {
    this.scripts?.forEach((script) => script.start());
  }

  abstract update(timestamp: number): void;
}

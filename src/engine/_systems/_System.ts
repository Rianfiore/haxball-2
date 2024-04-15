import { _Entity } from "../_entities/_Entity";

export abstract class _System {
  entities: _Entity[];

  constructor(entities: _Entity[]) {
    this.entities = entities;
  }

  addEntity(entity: _Entity) {
    this.entities.push(entity);
  }

  addEntities(entities: _Entity[]) {
    this.entities.push(...entities);
  }

  abstract update(timestamp: number): void;
}

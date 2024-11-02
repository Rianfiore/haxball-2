import { _Entity } from "@/engine/_entities";
import { Composite, Engine } from "matter-js";
import { _System } from "./_System";

interface PhysicsSystemProps {
  entities: _Entity[];
  engine: Engine;
}
export class PhysicsSystem extends _System {
  entities: _Entity[];
  composite: Composite;

  constructor(props: PhysicsSystemProps) {
    super(props.entities);
    this.entities = props.entities;

    const entitiesWithBodies = this.entities.filter((entity) => entity.body);
    const bodies = entitiesWithBodies.flatMap((entity) => entity.body!);

    this.composite = Composite.add(props.engine.world, bodies);
  }

  update() {}
}

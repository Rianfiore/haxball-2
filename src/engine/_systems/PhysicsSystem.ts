import { PhysicsComponent } from "../_components/PhysicsComponent";
import { _Entity } from "../_entities";
import { _System } from "./_System";

interface PhysicsSystemProps {
  entities: _Entity[];
}
export class PhysicsSystem extends _System {
  entities: _Entity[];
  gravity: number = 9.8;

  constructor(props: PhysicsSystemProps) {
    super(props.entities);
    this.entities = props.entities;
  }

  update() {
    const entitiesWithPhysicsComponent = this.entities.filter((entity) =>
      entity.getComponent(PhysicsComponent)
    );

    for (const entity of entitiesWithPhysicsComponent) {
      const physicsComponent = entity.getComponent(PhysicsComponent)!;

      // Aplicar redução de velocidade devido à gravidade
      if (
        physicsComponent.currentVelocity.dy > 0 ||
        physicsComponent.currentVelocity.dx > 0
      ) {
        physicsComponent.applyFriction();
      }

      //Suavizar as mudanças agressivas de velocidade
      physicsComponent.smoothVelocity();
    }
  }
}

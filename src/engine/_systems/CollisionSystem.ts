import { BoxColliderComponent } from "../_components/BoxColliderComponent";
import { CircleColliderComponent } from "../_components/CircleColliderComponent";
import { _ColliderComponent } from "../_components/_Collider";
import { _Entity } from "../_entities";
import { _System } from "./_System";

interface CollisionSystemProps {
  entities: _Entity[];
}

export class CollisionSystem extends _System {
  entities: _Entity[];

  constructor(props: CollisionSystemProps) {
    super(props.entities);
    this.entities = props.entities;
  }

  // Método para atualizar o sistema de colisão
  update() {
    // Itera sobre todas as entidades
    for (let i = 0; i < this.entities.length; i++) {
      const entityA = this.entities[i];

      // Verifica se a entidade possui um componente de colisor de círculo
      const hasColliderInEntityA = entityA.hasComponent(_ColliderComponent);
      if (!hasColliderInEntityA) continue; // Se não houver algum colisor, verifica o tipo

      const collidersFromEntityA = entityA.getComponents(_ColliderComponent);

      // Verifica a colisão com outras entidades
      for (let j = i + 1; j < this.entities.length; j++) {
        const entityB = this.entities[j];

        // Verifica se a entidade B possui um componente de colisor de círculo
        const hasColliderInEntityB = entityB.hasComponent(_ColliderComponent);
        if (!hasColliderInEntityB) continue; // Se não houver colisor de círculo, passa para a próxima entidade

        const collidersFromEntityB = entityB.getComponents(_ColliderComponent);

        collidersFromEntityA.forEach((colliderA) => {
          collidersFromEntityB.forEach((colliderB) => {
            // Verifica o tipo dos colisores
            this.checkColliderType(colliderA, colliderB);
          });
        });
      }
    }
  }

  // Método que verifica o tipo dos colisores
  checkColliderType(
    colliderA: _ColliderComponent,
    colliderB: _ColliderComponent
  ) {
    if (colliderA instanceof BoxColliderComponent) {
      if (colliderB instanceof BoxColliderComponent) {
        if (colliderA.isBoxCollidingWithBox(colliderA, colliderB)) {
          colliderA.resolveBoxCollidingWithBox(colliderA, colliderB);
        }
      } else if (colliderB instanceof CircleColliderComponent) {
        if (colliderA.isCircleCollidingWithBox(colliderB, colliderA)) {
          colliderA.resolveCircleCollidingWithBox(colliderB, colliderA);
        }
      }
    } else if (colliderA instanceof CircleColliderComponent) {
      if (colliderB instanceof BoxColliderComponent) {
        if (colliderA.isCircleCollidingWithBox(colliderA, colliderB)) {
          colliderA.resolveCircleCollidingWithBox(colliderA, colliderB);
        }
      } else if (colliderB instanceof CircleColliderComponent) {
        if (colliderA.isCircleCollidingWithCircle(colliderA, colliderB)) {
          colliderA.resolveCircleCollidingWithCircle(colliderA, colliderB);
        }
      }
    }
  }
}

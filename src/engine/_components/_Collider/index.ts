import { _Component } from "..";
import { _Entity } from "../../_entities";
import { Position } from "../../utils/Position";
import { Script } from "../../utils/Script";
import { BoxColliderComponent } from "../BoxColliderComponent";
import { CircleColliderComponent } from "../CircleColliderComponent";
import { PhysicsComponent } from "../PhysicsComponent";
import { UpdatePositionScript } from "./scripts/UpdatePositionScript";

interface ColliderComponentProps {
  id: string;
  entity: _Entity;
  position: Position;
}

export class _ColliderComponent extends _Component {
  id: string;
  entity: _Entity;
  position: Position;
  updatePositionScript?: Script;

  constructor(props: ColliderComponentProps) {
    super();

    this.id = props.id;
    this.entity = props.entity;
    this.position = props.position;
    const entityPhysics = this.entity.getComponent(PhysicsComponent);

    if (entityPhysics && entityPhysics.bodyType === "KINEMATIC") {
      this.updatePositionScript = new UpdatePositionScript({
        entity: this.entity,
        colliderComponent: this,
      });

      this.updatePositionScript.start();
    }
  }

  isCircleCollidingWithCircle(
    colliderA: CircleColliderComponent,
    colliderB: CircleColliderComponent
  ) {
    const colliderAEntity = colliderA.entity;
    const colliderBEntity = colliderB.entity;
    // Calcula a distância entre os centros dos círculos
    const distance = Math.sqrt(
      Math.pow(colliderAEntity.position.x - colliderBEntity.position.x, 2) +
        Math.pow(colliderAEntity.position.y - colliderBEntity.position.y, 2)
    );

    // Verifica se a distância é menor que a soma dos raios dos círculos
    return distance < colliderA.radius + colliderB.radius;
  }

  isCircleCollidingWithBox(
    colliderA: CircleColliderComponent,
    colliderB: BoxColliderComponent
  ) {
    // Encontrar o ponto mais próximo do círculo no retângulo
    let closestX = Math.max(
      colliderB.position.x - colliderB.width / 2,
      Math.min(colliderA.position.x, colliderB.position.x + colliderB.width / 2)
    );
    let closestY = Math.max(
      colliderB.position.y - colliderB.height / 2,
      Math.min(
        colliderA.position.y,
        colliderB.position.y + colliderB.height / 2
      )
    );

    // Calcular a distância entre o ponto mais próximo e o centro do círculo
    let distanceX = colliderA.position.x - closestX;
    let distanceY = colliderA.position.y - closestY;
    let distanceSquared = distanceX * distanceX + distanceY * distanceY;

    // Verificar se a distância ao quadrado é menor do que o raio ao quadrado
    return distanceSquared < colliderA.radius * colliderA.radius;
  }

  isBoxCollidingWithBox(
    colliderA: BoxColliderComponent,
    colliderB: BoxColliderComponent
  ) {
    return false;
  }

  resolveCircleCollidingWithCircle(
    colliderA: CircleColliderComponent,
    colliderB: CircleColliderComponent
  ) {
    // Calcula a distância entre os centros dos círculos
    const distance = Math.sqrt(
      Math.pow(colliderA.position.x - colliderB.position.x, 2) +
        Math.pow(colliderA.position.y - colliderB.position.y, 2)
    );

    // Calcula o valor da sobreposição
    const overlap = colliderA.radius + colliderB.radius - distance;

    // Se houver sobreposição, ajusta as posições dos círculos para evitar a sobreposição
    if (overlap > 0) {
      // Calcula a direção da correção da sobreposição
      const dx = (colliderB.position.x - colliderA.position.x) / distance;
      const dy = (colliderB.position.y - colliderA.position.y) / distance;

      const colliderAPhysics = colliderA.entity.getComponent(PhysicsComponent)!;
      const colliderBPhysics = colliderB.entity.getComponent(PhysicsComponent)!;

      // Calcula a velocidade relativa
      const relativeVelocity = {
        x: Math.abs(colliderBPhysics.velocity.x - colliderAPhysics.velocity.x),
        y: Math.abs(colliderBPhysics.velocity.y - colliderAPhysics.velocity.y),
      };

      const colliderAForce = {
        x: -((dx * overlap) / (30 + relativeVelocity.x)),
        y: -((dy * overlap) / (30 + relativeVelocity.y)),
      };

      if (colliderBPhysics.bodyType === "KINEMATIC") {
        const colliderBForce = {
          x: (dx * overlap) / (30 + relativeVelocity.x),
          y: (dy * overlap) / (30 + relativeVelocity.y),
        };

        colliderAPhysics.applyForce(colliderAForce);
        colliderBPhysics.applyForce(colliderBForce);
      } else {
      }
    }
  }

  resolveCircleCollidingWithBox(
    colliderA: CircleColliderComponent,
    colliderB: BoxColliderComponent
  ) {
    // Calcula a distância entre os centros dos objetos
    const distanceX =
      colliderA.position.x -
      Math.max(
        colliderB.position.x - colliderB.width / 2,
        Math.min(
          colliderA.position.x,
          colliderB.position.x + colliderB.width / 2
        )
      );
    const distanceY =
      colliderA.position.y -
      Math.max(
        colliderB.position.y - colliderB.height / 2,
        Math.min(
          colliderA.position.y,
          colliderB.position.y + colliderB.height / 2
        )
      );
    const distanceSquared = distanceX * distanceX + distanceY * distanceY;

    if (distanceSquared < colliderA.radius * colliderA.radius) {
      const distance = Math.sqrt(distanceSquared);

      // Calcula a sobreposição entre o círculo e a caixa
      const overlap = colliderA.radius - distance;

      // Se houver sobreposição, ajusta a posição do círculo para evitar a sobreposição
      if (overlap > 0) {
        // Calcula a direção da correção da sobreposição
        const dx = distanceX / distance;
        const dy = distanceY / distance;

        // Ajusta a posição do jogador para evitar a colisão
        colliderA.position.x += dx * overlap;
        colliderA.position.y += dy * overlap;

        const colliderAPhysics =
          colliderA.entity.getComponent(PhysicsComponent)!;
        const colliderBPhysics =
          colliderB.entity.getComponent(PhysicsComponent)!;

        // Ajusta a velocidade do jogador para zero na direção da parede
        const dotProduct =
          colliderAPhysics.velocity.x * dx + colliderAPhysics.velocity.y * dy;

        if (colliderBPhysics.bodyType === "KINEMATIC") {
          // Calcula a velocidade relativa
          const relativeVelocity = {
            x: Math.abs(
              colliderBPhysics.velocity.x - colliderAPhysics.velocity.x
            ),
            y: Math.abs(
              colliderBPhysics.velocity.y - colliderAPhysics.velocity.y
            ),
          };

          const colliderAForce = {
            x: -((dx * overlap) / (30 + relativeVelocity.x)),
            y: -((dy * overlap) / (30 + relativeVelocity.y)),
          };
          const colliderBForce = {
            x: (dx * overlap) / (30 + relativeVelocity.x),
            y: (dy * overlap) / (30 + relativeVelocity.y),
          };

          colliderAPhysics.applyForce(colliderAForce);
          colliderBPhysics.applyForce(colliderBForce);
        } else {
          if (dotProduct < 0) {
            colliderAPhysics.velocity.x -= dotProduct * dx;
            colliderAPhysics.velocity.y -= dotProduct * dy;

            // Inverte a direção da velocidade na direção da parede
            colliderAPhysics.velocity.x -= dotProduct * dx;
            colliderAPhysics.velocity.y -= dotProduct * dy;
          }
        }
      }
    }
  }

  resolveBoxCollidingWithBox(
    colliderA: BoxColliderComponent,
    colliderB: BoxColliderComponent
  ) {}
}

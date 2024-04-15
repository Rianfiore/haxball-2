import { _ColliderComponent } from "..";
import { _Entity } from "../../../_entities";
import { Script } from "../../../utils/Script";

interface UpdatePositionScripProps {
  entity: _Entity;
  colliderComponent: _ColliderComponent;
}

export class UpdatePositionScript extends Script {
  entity: _Entity;
  colliderComponent: _ColliderComponent;

  constructor(props: UpdatePositionScripProps) {
    super();

    this.entity = props.entity;
    this.colliderComponent = props.colliderComponent;
  }

  update(timestamp: number) {
    super.update(timestamp);

    this.colliderComponent.position.x = this.entity.position.x;
    this.colliderComponent.position.y = this.entity.position.y;
  }
}

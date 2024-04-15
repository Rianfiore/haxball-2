import { _Entity } from "../_entities";
import { Position } from "../utils/Position";
import { _ColliderComponent } from "./_Collider";

interface CircleColliderComponentProps {
  id: string;
  entity: _Entity;
  radius: number;
  position: Position;
}
export class CircleColliderComponent extends _ColliderComponent {
  radius: number;
  position: Position;

  constructor(props: CircleColliderComponentProps) {
    super(props);
    this.radius = props.radius;
    this.position = props.position;
  }
}

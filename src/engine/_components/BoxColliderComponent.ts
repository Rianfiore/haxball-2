import { _Entity } from "../_entities";
import { Position } from "../utils/Position";
import { _ColliderComponent } from "./_Collider";

interface BoxColliderComponentProps {
  id: string;
  entity: _Entity;
  width: number;
  height: number;
  position: Position;
}
export class BoxColliderComponent extends _ColliderComponent {
  width: number;
  height: number;

  constructor(props: BoxColliderComponentProps) {
    super(props);
    this.width = props.width;
    this.height = props.height;
  }
}

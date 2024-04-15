interface PositionProps {
  x: number;
  y: number;
}
export class Position {
  x: number;
  y: number;

  constructor(props: PositionProps) {
    this.x = props.x;
    this.y = props.y;
  }
}

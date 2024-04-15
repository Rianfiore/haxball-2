interface VelocityProps {
  dx: number;
  dy: number;
}

export class Velocity {
  dx: number;
  dy: number;

  constructor(props: VelocityProps) {
    this.dx = props.dx;
    this.dy = props.dy;
  }
}

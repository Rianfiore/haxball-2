import { _Component } from "./_Component";

interface CanvasComponentProps {
  id: string;
}
export class CanvasComponent extends _Component {
  id: string;
  width: number | string;
  height: number | string;
  canvasRef: HTMLCanvasElement;

  constructor(props: CanvasComponentProps) {
    super(props);
    this.id = props.id;

    this.width = window.screen.width;
    this.height = window.screen.height;

    const canvas = document.getElementById("gameCanvas")! as HTMLCanvasElement;

    canvas.setAttribute("id", this.id);
    canvas.setAttribute("width", this.width.toString());
    canvas.setAttribute("height", this.height.toString());

    this.canvasRef = canvas;
  }

  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;

    const canvas = document.getElementById(this.id) as HTMLCanvasElement;

    canvas.setAttribute("width", width.toString());
    canvas.setAttribute("height", height.toString());
  }
}

export class Script {
  lastUpdateTime: number = 0;

  start() {
    requestAnimationFrame((timestamp) => this.update(timestamp));
  }

  update(_timestamp: number) {
    requestAnimationFrame((timestamp) => this.update(timestamp));
  }
}

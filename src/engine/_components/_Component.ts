export abstract class _Component {
  value: any;

  constructor(...args: any) {
    this.value = { ...args };
  }
}

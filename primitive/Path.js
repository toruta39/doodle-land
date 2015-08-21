export default class Path {
  constructor() {
    this.points = [].concat(...arguments);
  }

  append() {
   this.points = this.points.concat(...arguments);
  }
}

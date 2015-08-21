export default class FullScreenCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0px';
    this.canvas.style.left = '0px';
    this.ctx = canvas.getContext('2d');

    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
}

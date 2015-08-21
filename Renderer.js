export default class Renderer {
  constructor(canvasWrapper) {
    this.canvas = canvasWrapper.canvas;
    this.ctx = canvasWrapper.ctx;
  }

  render(scene) {
    let canvas = this.canvas;
    let ctx = this.ctx;

    // background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw
    ctx.fillStyle = '#333';

    // circles
    scene.circles.forEach(circle => {
      ctx.save();
      ctx.translate(circle.x, circle.y);
      ctx.beginPath();
      ctx.arc(0, 0, circle.r, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });

    // paths
    scene.paths.forEach((path, i) => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(path.points[0].x, path.points[0].y);

      path.points.forEach((item, i, arr) => {
        if (!i) return;

        let c1 = arr[i-1].handleOut || arr[i-1];
        let c2 = item.handleIn || item;

        ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, item.x, item.y);
      });

      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#fff';
      ctx.fillText(i, path.points[0].x, path.points[0].y);

      ctx.restore();
    });
  }
}

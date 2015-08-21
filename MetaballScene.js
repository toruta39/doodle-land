import Circle from './primitive/Circle';
import Path from './primitive/Path';
import add from './math/add';
import sub from './math/sub';
import len from './math/len';
import dist from './math/dist';
import p2c from './math/p2c';

const DemoScene = {};

// refs: http://paperjs.org/examples/meta-balls/
let ballPositions = [[255, 129], [610, 73], [486, 363],
  [117, 459], [484, 726], [843, 306], [789, 615], [1049, 82],
  [1292, 428], [1117, 733], [1352, 86], [92, 798]];

let largeCircle = new Circle(676, 433, 100);

function metaball(ball1, ball2, v, handleLenRate, maxDistance) {
  let pi2 = Math.PI / 2;
  let d = dist(ball1, ball2);
  let [r1, r2, u1, u2] = [ball1.r, ball2.r];

  if (r1 === 0 || r2 === 0) return;

  if (d > maxDistance || d <= Math.abs(r1 - r2)) { // too far or contain
    return;
  } else if (d < r1 + r2) { // overlap
    u1 = Math.acos((r1 * r1 + d * d - r2 * r2) / (2 * r1 * d));
    u2 = Math.acos((r2 * r2 + d * d - r1 * r1) / (2 * r2 * d));
  } else {
    u1 = 0;
    u2 = 0;
  }

  let s1 = sub(ball2, ball1);
  let a1 = Math.atan2(s1.y, s1.x);
  let a2 = Math.acos((r1 - r2) / d);

  let a1a = a1 + u1 + (a2 - u1) * v;
  let a1b = a1 - u1 - (a2 - u1) * v;
  let a2a = a1 + Math.PI - u2 - (Math.PI - u2 - a2) * v;
  let a2b = a1 - Math.PI + u2 + (Math.PI - u2 - a2) * v;

  let p1a = add(ball1, p2c(a1a, r1));
  let p1b = add(ball1, p2c(a1b, r1));
  let p2a = add(ball2, p2c(a2a, r2));
  let p2b = add(ball2, p2c(a2b, r2));

  // define handle length by the distance between
  // both ends of the curve to draw
  let totalRadius = r1 + r2;
  let d2 = Math.min(v * handleLenRate, len(sub(p1a, p2a)) / totalRadius);

  // case circles are overlapping:
  d2 *= Math.min(1, d * 2 / totalRadius);

  r1 *= d2;
  r2 *= d2;

  var path = new Path();

  // add control point
  p1a.handleOut = add(p1a, p2c(a1a - pi2, r1));
  p2a.handleIn = add(p2a, p2c(a2a + pi2, r2));
  p2b.handleOut = add(p2b, p2c(a2b - pi2, r2));
  p1b.handleIn = add(p1b, p2c(a1b + pi2, r1));

  path.append(p1a, p2a, p2b, p1b);

  return path;
}

DemoScene.circles = ballPositions.map(pos => {
  return new Circle(pos[0], pos[1]);
}).concat(largeCircle);

function generateConnections(circles) {
  let connections = [];

  circles.forEach((a, i) => {
    circles.forEach((b, j) => {
      if (j <= i) return;

      let path = metaball(a, b, 0.5, 2.4, 300);
      if (path) connections.push(path);
    })
  });

  return connections;
}

DemoScene.update = function() {
  DemoScene.paths = generateConnections(DemoScene.circles);
};

function onMouseMove(evt) {
  evt.preventDefault();
  largeCircle.x = evt.x;
  largeCircle.y = evt.y;
}

window.addEventListener('mousemove', onMouseMove);

// init
DemoScene.update();

export default DemoScene;

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var FullScreenCanvas = (function () {
  function FullScreenCanvas(canvas) {
    _classCallCheck(this, FullScreenCanvas);

    this.canvas = canvas;
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0px';
    this.canvas.style.left = '0px';
    this.ctx = canvas.getContext('2d');

    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
  }

  _createClass(FullScreenCanvas, [{
    key: 'resize',
    value: function resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }]);

  return FullScreenCanvas;
})();

exports['default'] = FullScreenCanvas;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _primitiveCircle = require('./primitive/Circle');

var _primitiveCircle2 = _interopRequireDefault(_primitiveCircle);

var _primitivePath = require('./primitive/Path');

var _primitivePath2 = _interopRequireDefault(_primitivePath);

var _mathAdd = require('./math/add');

var _mathAdd2 = _interopRequireDefault(_mathAdd);

var _mathSub = require('./math/sub');

var _mathSub2 = _interopRequireDefault(_mathSub);

var _mathLen = require('./math/len');

var _mathLen2 = _interopRequireDefault(_mathLen);

var _mathDist = require('./math/dist');

var _mathDist2 = _interopRequireDefault(_mathDist);

var _mathP2c = require('./math/p2c');

var _mathP2c2 = _interopRequireDefault(_mathP2c);

var DemoScene = {};

// refs: http://paperjs.org/examples/meta-balls/
var ballPositions = [[255, 129], [610, 73], [486, 363], [117, 459], [484, 726], [843, 306], [789, 615], [1049, 82], [1292, 428], [1117, 733], [1352, 86], [92, 798]];

var largeCircle = new _primitiveCircle2['default'](676, 433, 100);

function metaball(ball1, ball2, v, handleLenRate, maxDistance) {
  var pi2 = Math.PI / 2;
  var d = (0, _mathDist2['default'])(ball1, ball2);
  var _ref = [ball1.r, ball2.r];
  var r1 = _ref[0];
  var r2 = _ref[1];
  var u1 = _ref[2];
  var u2 = _ref[3];

  if (r1 === 0 || r2 === 0) return;

  if (d > maxDistance || d <= Math.abs(r1 - r2)) {
    // too far or contain
    return;
  } else if (d < r1 + r2) {
    // overlap
    u1 = Math.acos((r1 * r1 + d * d - r2 * r2) / (2 * r1 * d));
    u2 = Math.acos((r2 * r2 + d * d - r1 * r1) / (2 * r2 * d));
  } else {
    u1 = 0;
    u2 = 0;
  }

  var s1 = (0, _mathSub2['default'])(ball2, ball1);
  var a1 = Math.atan2(s1.y, s1.x);
  var a2 = Math.acos((r1 - r2) / d);

  var a1a = a1 + u1 + (a2 - u1) * v;
  var a1b = a1 - u1 - (a2 - u1) * v;
  var a2a = a1 + Math.PI - u2 - (Math.PI - u2 - a2) * v;
  var a2b = a1 - Math.PI + u2 + (Math.PI - u2 - a2) * v;

  var p1a = (0, _mathAdd2['default'])(ball1, (0, _mathP2c2['default'])(a1a, r1));
  var p1b = (0, _mathAdd2['default'])(ball1, (0, _mathP2c2['default'])(a1b, r1));
  var p2a = (0, _mathAdd2['default'])(ball2, (0, _mathP2c2['default'])(a2a, r2));
  var p2b = (0, _mathAdd2['default'])(ball2, (0, _mathP2c2['default'])(a2b, r2));

  // define handle length by the distance between
  // both ends of the curve to draw
  var totalRadius = r1 + r2;
  var d2 = Math.min(v * handleLenRate, (0, _mathLen2['default'])((0, _mathSub2['default'])(p1a, p2a)) / totalRadius);

  // case circles are overlapping:
  d2 *= Math.min(1, d * 2 / totalRadius);

  r1 *= d2;
  r2 *= d2;

  var path = new _primitivePath2['default']();

  // add control point
  p1a.handleOut = (0, _mathAdd2['default'])(p1a, (0, _mathP2c2['default'])(a1a - pi2, r1));
  p2a.handleIn = (0, _mathAdd2['default'])(p2a, (0, _mathP2c2['default'])(a2a + pi2, r2));
  p2b.handleOut = (0, _mathAdd2['default'])(p2b, (0, _mathP2c2['default'])(a2b - pi2, r2));
  p1b.handleIn = (0, _mathAdd2['default'])(p1b, (0, _mathP2c2['default'])(a1b + pi2, r1));

  path.append(p1a, p2a, p2b, p1b);

  return path;
}

DemoScene.circles = ballPositions.map(function (pos) {
  return new _primitiveCircle2['default'](pos[0], pos[1]);
}).concat(largeCircle);

function generateConnections(circles) {
  var connections = [];

  circles.forEach(function (a, i) {
    circles.forEach(function (b, j) {
      if (j <= i) return;

      var path = metaball(a, b, 0.5, 2.4, 300);
      if (path) connections.push(path);
    });
  });

  return connections;
}

DemoScene.update = function () {
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

exports['default'] = DemoScene;
module.exports = exports['default'];

},{"./math/add":5,"./math/dist":6,"./math/len":7,"./math/p2c":8,"./math/sub":9,"./primitive/Circle":10,"./primitive/Path":11}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Renderer = (function () {
  function Renderer(canvasWrapper) {
    _classCallCheck(this, Renderer);

    this.canvas = canvasWrapper.canvas;
    this.ctx = canvasWrapper.ctx;
  }

  _createClass(Renderer, [{
    key: 'render',
    value: function render(scene) {
      var canvas = this.canvas;
      var ctx = this.ctx;

      // background
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // draw
      ctx.fillStyle = '#333';

      // circles
      scene.circles.forEach(function (circle) {
        ctx.save();
        ctx.translate(circle.x, circle.y);
        ctx.beginPath();
        ctx.arc(0, 0, circle.r, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      // paths
      scene.paths.forEach(function (path, i) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(path.points[0].x, path.points[0].y);

        path.points.forEach(function (item, i, arr) {
          if (!i) return;

          var c1 = arr[i - 1].handleOut || arr[i - 1];
          var c2 = item.handleIn || item;

          ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, item.x, item.y);
        });

        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.fillText(i, path.points[0].x, path.points[0].y);

        ctx.restore();
      });
    }
  }]);

  return Renderer;
})();

exports['default'] = Renderer;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _FullScreenCanvasWrapper = require('./FullScreenCanvasWrapper');

var _FullScreenCanvasWrapper2 = _interopRequireDefault(_FullScreenCanvasWrapper);

var _MetaballScene = require('./MetaballScene');

var _MetaballScene2 = _interopRequireDefault(_MetaballScene);

var _Renderer = require('./Renderer');

var _Renderer2 = _interopRequireDefault(_Renderer);

var f = new _FullScreenCanvasWrapper2['default'](document.querySelector('canvas'));
var r = new _Renderer2['default'](f);

function render() {
  _MetaballScene2['default'].update();
  r.render(_MetaballScene2['default']);
  requestAnimationFrame(render);
}

requestAnimationFrame(render);

},{"./FullScreenCanvasWrapper":1,"./MetaballScene":2,"./Renderer":3}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = add;

function add(a, b) {
  return { x: a.x + b.x, y: a.y + b.y };
}

module.exports = exports["default"];

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = dist;

function dist(a, b) {
  return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

module.exports = exports["default"];

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = dist;

function dist(a) {
  return Math.sqrt(a.x * a.x + a.y * a.y);
}

module.exports = exports["default"];

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = p2c;

function p2c(angle, length) {
  return { x: Math.cos(angle) * length, y: Math.sin(angle) * length };
}

module.exports = exports["default"];

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = sub;

function sub(a, b) {
  return { x: a.x - b.x, y: a.y - b.y };
}

module.exports = exports["default"];

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Circle = function Circle(x, y) {
  var r = arguments.length <= 2 || arguments[2] === undefined ? 50 : arguments[2];

  _classCallCheck(this, Circle);

  this.x = x;
  this.y = y;
  this.r = r;
};

exports["default"] = Circle;
module.exports = exports["default"];

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Path = (function () {
  function Path() {
    var _ref;

    _classCallCheck(this, Path);

    this.points = (_ref = []).concat.apply(_ref, arguments);
  }

  _createClass(Path, [{
    key: "append",
    value: function append() {
      var _points;

      this.points = (_points = this.points).concat.apply(_points, arguments);
    }
  }]);

  return Path;
})();

exports["default"] = Path;
module.exports = exports["default"];

},{}]},{},[4]);

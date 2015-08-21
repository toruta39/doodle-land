import FullScreenCanvasWrapper from './FullScreenCanvasWrapper';
import MetaballScene from './MetaballScene';
import Renderer from './Renderer';

let f = new FullScreenCanvasWrapper(document.querySelector('canvas'));
const r = new Renderer(f);

function render() {
  MetaballScene.update();
  r.render(MetaballScene);
  requestAnimationFrame(render);
}

requestAnimationFrame(render);

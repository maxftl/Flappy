import './style.css';
import { config }  from './config';
import { loadImage } from './load_image'; 
import { Sprite } from './sprite';
import { Background } from './background';

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
canvas.width = config.canvasWidth;
canvas.height = config.canvasHeight;
let context = canvas.getContext("2d");
if(!context) {
  throw "2d Context not supported";
}

const backgroundImage = await loadImage("background-day.png");
const background = new Background(backgroundImage);

let lastUpdateTime = Date.now();
const loop = () => {
  const now = Date.now();
  const timeDelta = now - lastUpdateTime;
  background.update(timeDelta);
  background.draw(context);
  lastUpdateTime = now;
  window.requestAnimationFrame(loop);
}
loop();
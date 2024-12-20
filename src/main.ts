import './style.css';
import { config }  from './config';
import { loadImage } from './load_image'; 
import { Sprite } from './sprite';

let canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
canvas.width = config.canvasWidth;
canvas.height = config.canvasHeight;
let context = canvas.getContext("2d");
if(!context) {
  throw "2d Context not supported";
}

const image = await loadImage("base.png");
const sprite = new Sprite(image, 10, 20);
sprite.draw(context);
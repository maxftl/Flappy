import './style.css';
import { config }  from './config';
import path from 'path';

let canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
canvas.width = config.canvasWidth;
canvas.height = config.canvasHeight;
let context = canvas.getContext("2d");
if(!context) {
  throw "2d Context not supported";
}

const image = new Image();
image.addEventListener("load", () => {
  context.drawImage(image, 0, 0);
});

image.src = config.spriteDirectory + "0.png";
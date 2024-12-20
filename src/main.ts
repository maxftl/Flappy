import './style.css';
import { config } from './config';
import { loadImage } from './load_image';
import { PipePair } from './pipe_pair';
import { Background } from './background';
import { Bird } from './bird';

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
canvas.width = config.canvasWidth;
canvas.height = config.canvasHeight;
let context = canvas.getContext("2d");
if (!context) {
  throw "2d Context not supported";
}

const backgroundImage = await loadImage("background-day.png");
const background = new Background(backgroundImage);

const birdImages = {
  downflap: await loadImage("bluebird-downflap.png"),
  midflap: await loadImage("bluebird-midflap.png"),
  upflap: await loadImage("bluebird-upflap.png"),
};
const bird = new Bird(birdImages);

const pipeImage = await loadImage("pipe-green.png");
const pipePair = new PipePair(pipeImage);

let upPressed = false;
window.addEventListener('keydown', (ev: KeyboardEvent) => {
  if (ev.key == "ArrowUp") {
    upPressed = true;
  }
});

let isRunning = false;
const runGame = () => {
  isRunning = true;
  bird.reset();
  pipePair.reset();
  background.reset();

  let lastUpdateTime = Date.now();
  const loop = () => {
    if (bird.y > config.canvasHeight) {
      isRunning = false;
    }
    const now = Date.now();
    const timeDelta = now - lastUpdateTime;
    background.update(timeDelta);
    background.draw(context);
    if (upPressed) {
      bird.flap();
      upPressed = false;
    }
    pipePair.update(timeDelta);
    pipePair.draw(context);
    bird.update(timeDelta);
    bird.draw(context);
    lastUpdateTime = now;
    if(isRunning)
      window.requestAnimationFrame(loop);
  }
  loop();
}

window.addEventListener('mousedown', () => {
  if(!isRunning)
    runGame();
});



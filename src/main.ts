import './style.css';
import { config } from './config';
import { loadImage } from './load_image';
import { Background } from './background';
import { Bird } from './bird';
import { PipeQueue } from './pipe_queue';
import { loadAudio } from './load_audio';

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
canvas.width = config.canvasWidth;
canvas.height = config.canvasHeight;
let context = canvas.getContext("2d");
if (!context) {
  throw "2d Context not supported";
}


const backgroundImage = await loadImage("background-day.png");
const background = new Background(backgroundImage, config.backgroundVelocity);

const baseImage = await loadImage("base.png");
const base = new Background(baseImage, config.pipeVelocity, config.canvasHeight - baseImage.height);

const birdImages = {
  downflap: await loadImage("bluebird-downflap.png"),
  midflap: await loadImage("bluebird-midflap.png"),
  upflap: await loadImage("bluebird-upflap.png"),
};
const bird = new Bird(birdImages);

const pipeImage = await loadImage("pipe-green.png");
const pipeQueue = new PipeQueue(pipeImage);

const pointAudio = await loadAudio("point.ogg");

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
  pipeQueue.reset();
  background.reset();
  base.reset();

  let lastUpdateTime = Date.now();
  const loop = () => {
    if (bird.y > config.canvasHeight - baseImage.height - bird.height) {
      isRunning = false;
    }
    if(pipeQueue.checkCollision(bird)) {
      isRunning = false;
    }
    if(pipeQueue.checkMadePoint()) {
      console.log(pointAudio);
      pointAudio.play();
      pointAudio.load();
    }
    const now = Date.now();
    const timeDelta = now - lastUpdateTime;
    background.update(timeDelta);
    background.draw(context);
    if (upPressed) {
      bird.flap();
      upPressed = false;
    }
    pipeQueue.update(timeDelta);
    pipeQueue.draw(context);
    bird.update(timeDelta);
    bird.draw(context);
    base.update(timeDelta);
    base.draw(context);
    
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



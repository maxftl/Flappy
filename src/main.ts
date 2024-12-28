import { config } from './config';
import { StartScreen } from './start_screen';
import { GameScreen } from './game_screen';
import { HighscoreScreen } from './highscore_screen';
import * as gimg from './get_image';
import * as gaud from './get_audio';



const heightScale = document.documentElement.clientWidth / config.canvasWidth;
const widthScale = document.documentElement.clientHeight / config.canvasHeight;
const scale = Math.min(heightScale, widthScale);

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
canvas.width = scale * config.canvasWidth;
canvas.height = scale * config.canvasHeight;
let context = canvas.getContext("2d");
if (!context) {
  throw "2d Context not supported";
}

context.scale(scale, scale);


const runGame = async () => {
  await gimg.initialize();
  await gaud.initialize();
  const startScreen = new StartScreen(context);
  const gameScreen = new GameScreen(context);
  const highscoreScreen = new HighscoreScreen(context);
  await startScreen.show();
  while (true) {
    await gameScreen.show();
    const points = gameScreen.points;
    highscoreScreen.addScore(points);
    await highscoreScreen.show();
  }
}
runGame();

import './style.css';
import { config } from './config';
import { StartScreen } from './start_screen';
import { GameScreen } from './game_screen';
import { HighscoreScreen } from './highscore_screen';


const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
canvas.width = config.canvasWidth;
canvas.height = config.canvasHeight;
let context = canvas.getContext("2d");
if (!context) {
  throw "2d Context not supported";
}

const startScreen = new StartScreen(context);
const gameScreen = new GameScreen(context);
const highscoreScreen = new HighscoreScreen(context);

await startScreen.show();
while(true) {
  await gameScreen.show();
  const points = gameScreen.pointsDisplay.points;
  highscoreScreen.scores.push(points);
  await highscoreScreen.show();
}



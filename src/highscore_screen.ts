import { config } from "./config";

export class HighscoreScreen {
    #context: CanvasRenderingContext2D;
    #abortControler: AbortController;
    #scores: Array<number>;
    #lastScore: number;


    constructor(context: CanvasRenderingContext2D) {
        this.#context = context;
        this.#abortControler = new AbortController();
        this.#scores = [];
        this.#lastScore = -1;
    }

    addScore = (points: number) => {
        this.#scores.push(points);
        this.#scores.sort((a: number, b: number) => {
            return b - a;
        });
        this.#lastScore = points;
    }

    #registerEvents = () => {
        this.#abortControler = new AbortController();
        const closeStartScreen = () => {
            this.#abortControler.abort();
        };
        window.addEventListener('keydown',
            closeStartScreen,
            {
                signal: this.#abortControler.signal,
            });
        window.addEventListener('touchstart',
            closeStartScreen,
            {
                signal: this.#abortControler.signal,
            }
        )
    }

    show = async () => {
        this.#registerEvents();
        this.#context.save();
        this.#context.fillStyle = "black";
        this.#context.globalAlpha = 0.7;
        this.#context.fillRect(0, 0, config.canvasWidth, config.canvasHeight);
        this.#context.globalAlpha = 1;
        this.#context.fillStyle = "white";
        this.#context.font = "bold 20px sans-serif";
        const x = 50;
        this.#context.fillText("Highscore", x, 60);
        let y = 90;
        let scoreFound = false;
        this.#scores.forEach( (score, index) => {
            if(index > 9)
                return;
            this.#context.save();
            if(!scoreFound && score === this.#lastScore) {
                scoreFound = true;
                this.#context.fillStyle = "yellow";
            }
            this.#context.fillText(`${index + 1}.     ${score}`, x, y);
            this.#context.restore();
            y += 20;
        });
        this.#context.restore();
        await new Promise( (resolve) => {
            this.#abortControler.signal.addEventListener("abort", resolve);
        });
    }
    
}
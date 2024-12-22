import { config } from "./config";

export class HighscoreScreen {
    context: CanvasRenderingContext2D;
    #abortController: AbortController;
    scores: Array<number>;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.#abortController = new AbortController();
        this.scores = [];
    }

    #registerEvents = () => {
        this.#abortController = new AbortController();
        window.addEventListener("keydown", () => {
            this.#abortController.abort();
        },
        {
            signal: this.#abortController.signal
        });
    }

    show = async () => {
        this.#registerEvents();
        this.context.save();
        this.context.fillStyle = "black";
        this.context.globalAlpha = 0.7;
        this.context.fillRect(0, 0, config.canvasWidth, config.canvasHeight);
        this.context.globalAlpha = 1;
        this.context.fillStyle = "white";
        this.context.font = "bold 20px sans-serif";
        const x = 50;
        this.context.fillText("Highscore", x, 60);
        let y = 90;
        this.scores.forEach( (score, index) => {
            this.context.fillText(`${index + 1}.     ${score}`, x, y);
            y += 20;
        });
        this.context.restore();
        await new Promise( (resolve) => {
            this.#abortController.signal.addEventListener("abort", resolve);
        });
    }
}
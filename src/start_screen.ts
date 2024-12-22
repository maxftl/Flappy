import { config } from "./config";
import { getImage } from "./get_image";

export class StartScreen {

    backgroundImage: HTMLImageElement;
    context: CanvasRenderingContext2D;
    abortControler: AbortController;

    constructor(context: CanvasRenderingContext2D) {
        this.backgroundImage = getImage("background-day.png");
        this.context = context;
        this.abortControler = new AbortController();
    }

    #registerEvents = () => {
        this.abortControler = new AbortController();
        window.addEventListener('keydown', () => {
            this.abortControler.abort();
        },
        {
            signal: this.abortControler.signal,
        });
    };



    show = async () => {
        this.#registerEvents();
        this.context.save();
        this.context.font = "bold 24px sans-serif";
        this.context.drawImage(this.backgroundImage, 0, 0);
        this.context.fillText("Press any key", 60, config.canvasHeight/2 - 12);
        this.context.restore();

        await new Promise((resolve) => {
            this.abortControler.signal.addEventListener("abort", resolve);
        });
    }

};
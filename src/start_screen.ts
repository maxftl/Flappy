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
        window.addEventListener('mousedown', () => {
            this.abortControler.abort();
        },
        {
            signal: this.abortControler.signal,
        });
    };



    show = async () => {
        this.#registerEvents();
        this.context.drawImage(this.backgroundImage, 0, 0);
        this.context.fillText("Press any key to start", 10, 10);
        await new Promise((resolve) => {
            this.abortControler.signal.addEventListener("abort", resolve);
        });
    }

};
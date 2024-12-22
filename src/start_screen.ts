export class StartScreen {

    backgroundImage: HTMLImageElement;

    constructor(backgroundImage: HTMLImageElement) {
        this.backgroundImage = backgroundImage;
    }


    draw = (context: CanvasRenderingContext2D) => {
        context.drawImage(this.backgroundImage, 0, 0);
        context.fillText("Press any key to start", 10, 10);
    }

};
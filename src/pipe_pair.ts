import { Drawable } from "./drawable";
import { config } from "./config";

export class PipePair implements Drawable {
    x: number;
    pipeImage: HTMLImageElement;
    openingWidth: number;
    openingCenter: number;

    constructor(pipeImage: HTMLImageElement) {
        this.x = config.canvasWidth;
        this.pipeImage = pipeImage;
        this.openingWidth = 100;
        this.openingCenter = config.canvasHeight / 2;
    }

    reset = () => {
        this.x = config.canvasWidth;
    };

    update = (timeDelta: number) => {
        this.x += config.pipeVelocity * timeDelta;
    };

    draw = (context: CanvasRenderingContext2D) => {
        context.save();
        context.drawImage(this.pipeImage,
            this.x,
            this.openingCenter + this.openingWidth/2);
        context.translate(this.x + this.pipeImage.width/2, this.openingCenter);
        context.rotate(Math.PI);
        context.translate(-(this.x + this.pipeImage.width/2), -this.openingCenter);
        context.drawImage(this.pipeImage,
            this.x,
            this.openingCenter + this.openingWidth/2);
        context.restore();
    };
}
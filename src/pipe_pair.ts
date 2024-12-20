import { Drawable } from "./drawable";
import { config } from "./config";

export class PipePair implements Drawable {
    x: number;
    pipeImage: HTMLImageElement;
    openingWidth: number;
    openingCenter: number;

    constructor(pipeImage: HTMLImageElement, x: number, openingCenter: number) {
        this.x = x;
        this.pipeImage = pipeImage;
        this.openingWidth = config.pipeOpeningWidth;
        this.openingCenter = openingCenter;
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
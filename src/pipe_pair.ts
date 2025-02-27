import { Drawable } from "./drawable";
import { config } from "./config";
import { Bird } from "./bird";
import { getImage } from "./get_image";

export class PipePair implements Drawable {
    x: number;
    pipeImage: HTMLImageElement;
    openingWidth: number;
    openingCenter: number;
    madePoint: boolean;

    constructor(x: number, openingCenter: number) {
        this.x = x;
        this.pipeImage = getImage("pipe-green.png");
        this.openingWidth = config.pipeOpeningWidth;
        this.openingCenter = openingCenter;
        this.madePoint = false;
    }

    reset = () => {
        this.x = config.canvasWidth;
        this.madePoint = false;
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

    checkCollision = (bird: Bird) => {
        if(this.x > bird.x + bird.width) return false;
        if(this.x + this.pipeImage.width < bird.x) return false;
        if(bird.y < this.openingCenter - this.openingWidth/2) return true;
        if(bird.y + bird.height > this.openingCenter + this.openingWidth/2) return true;
        return false;
    };

    checkMadePoint = () => {
        if(this.madePoint) return false;
        if(this.x + this.pipeImage.width < 20) {
            this.madePoint = true;
            return true;
        }
        return false;
    };
}
import { randomBytes } from "crypto";
import { config } from "./config";
import { Drawable } from "./drawable";
import { PipePair } from "./pipe_pair";

export class PipeQueue implements Drawable {

    pipePairs: Array<PipePair>;
    gameHeight: number;

    constructor(pipeImage: HTMLImageElement) {
        this.gameHeight = 250;
        this.pipePairs = [
            new PipePair(pipeImage, config.canvasWidth, Math.random() * this.gameHeight + 50),
            new PipePair(pipeImage, config.canvasWidth * 1.5, Math.random() * this.gameHeight + 50),
            new PipePair(pipeImage, config.canvasWidth * 2, Math.random() * this.gameHeight + 50),
        ];
    }

    reset = () => {
        for(let i=0; i < this.pipePairs.length; ++i) {
            this.pipePairs[i].reset();
            this.pipePairs[i].x = config.canvasWidth * (1 + i*0.5);
        }
    }

    update = (timeDelta: number) => {
        for(const pipePair of this.pipePairs) {
            pipePair.update(timeDelta);
        }
        const frontPipe = this.pipePairs[0];
        if(frontPipe.x < -frontPipe.pipeImage.width) {
            this.pipePairs.splice(0,1);
            frontPipe.x = this.pipePairs[1].x + config.canvasWidth*0.5;
            frontPipe.openingCenter = Math.random() * this.gameHeight + 50;
            this.pipePairs.push(frontPipe);
        }
    };

    draw = (context: CanvasRenderingContext2D) => {
        for(const pipePair of this.pipePairs) {
            pipePair.draw(context);
        }
    };

};
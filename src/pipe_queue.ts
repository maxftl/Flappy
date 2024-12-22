import { config } from "./config";
import { Drawable } from "./drawable";
import { PipePair } from "./pipe_pair";
import { Bird } from "./bird";

const randomOpeningCenter =  () => {
    let result = config.playAreaHeight/2;
    result += (Math.random() - 0.5) * config.playAreaHeight/4;
    result += (Math.random() - 0.5) * config.playAreaHeight/4;
    return result;
};

export class PipeQueue implements Drawable {

    pipePairs: Array<PipePair>;
    gameHeight: number;

    constructor() {
        this.gameHeight = 250;
        this.pipePairs = [
            new PipePair(config.canvasWidth, randomOpeningCenter()),
            new PipePair(config.canvasWidth * 1.5, randomOpeningCenter()),
            new PipePair(config.canvasWidth * 2, randomOpeningCenter()),
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
            frontPipe.reset();
            frontPipe.x = this.pipePairs[1].x + config.canvasWidth*0.5;
            frontPipe.openingCenter = randomOpeningCenter();
            this.pipePairs.push(frontPipe);
        }
    };

    draw = (context: CanvasRenderingContext2D) => {
        for(const pipePair of this.pipePairs) {
            pipePair.draw(context);
        }
    };

    checkCollision = (bird: Bird) => {
        for(const pipePair of this.pipePairs) {
            if(pipePair.checkCollision(bird)) return true;
        }
        return false;
    };

    checkMadePoint = () => {
        for(const pipePair of this.pipePairs) {
            if(pipePair.checkMadePoint()) return true;
        }
        return false;
    };

};
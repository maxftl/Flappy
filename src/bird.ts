import { Drawable } from "./drawable";
import { config } from "./config";

export interface BirdFrames {
    downflap: HTMLImageElement;
    midflap: HTMLImageElement;
    upflap: HTMLImageElement;
};

export class Bird implements Drawable {

    frames: BirdFrames;
    currentFrame: HTMLImageElement;
    x: number;
    y: number;
    velocity: number;

    constructor(frames: BirdFrames) {
        this.frames = frames;
        this.currentFrame = frames.midflap;
        this.x = 20;
        this.y = (config.canvasHeight - this.currentFrame.height)/2;
        this.velocity = 0;
    }

    flap = () => {
        this.velocity = -0.5;
    }

    update = (timeDelta: number) => {
        this.velocity += config.gravity * timeDelta;
        this.y += this.velocity * timeDelta;
    };

    draw = (context: CanvasRenderingContext2D) => {
        context.drawImage(this.currentFrame, this.x, this.y);
    };

};
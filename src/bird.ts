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
    width: number;
    height: number;
    velocity: number;

    reset = () => {
        this.x = 20;
        this.y = (config.canvasHeight - this.currentFrame.height)/2;
        this.velocity = 0;
    }

    constructor(frames: BirdFrames) {
        this.frames = frames;
        this.currentFrame = frames.midflap;
        this.width = this.currentFrame.width;
        this.height = this.currentFrame.height;
        this.x = 0;
        this.y = 0;
        this.velocity = 0;
        this.reset();
    }
    

    flap = () => {
        this.velocity = -0.5;
    }

    update = (timeDelta: number) => {
        this.velocity += config.gravity * timeDelta;
        this.y += this.velocity * timeDelta;
    };

    #lookUp = (context: CanvasRenderingContext2D) => {
        const translX = this.x + this.width/2;
        const translY = this.y + this.height/2;
        context.translate(translX, translY);
        context.rotate(-Math.PI/4);
        context.translate(-translX, -translY);
    }

    #lookDown = (context: CanvasRenderingContext2D) => {
        const translX = this.x + this.width/2;
        const translY = this.y + this.height/2;
        context.translate(translX, translY);
        context.rotate(Math.PI/4);
        context.translate(-translX, -translY);
    }

    draw = (context: CanvasRenderingContext2D) => {
        context.save();
        if(this.velocity < 0) this.#lookUp(context);
        else this.#lookDown(context);
        context.drawImage(this.currentFrame, this.x, this.y);
        context.restore();
    };

};
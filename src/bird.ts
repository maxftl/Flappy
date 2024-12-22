import { Drawable } from "./drawable";
import { config } from "./config";
import { getImage } from "./get_image";

export interface BirdFrames {
    downflap: HTMLImageElement;
    midflap: HTMLImageElement;
    upflap: HTMLImageElement;
};

export class Bird implements Drawable {

    frames: Array<HTMLImageElement>;
    currentFrameId: number;
    x: number;
    y: number;
    width: number;
    height: number;
    velocity: number;
    timePerFrame: number;
    timeSinceLastFrame: number;

    reset = () => {
        this.timeSinceLastFrame = 0;
        this.x = 20;
        this.y = (config.canvasHeight - this.frames[0].height)/2;
        this.velocity = 0;
    }

    constructor() {
        this.frames = [
            getImage("bluebird-downflap.png"),
            getImage("bluebird-midflap.png"),
            getImage("bluebird-upflap.png"),
            getImage("bluebird-midflap.png"),
        ];
        this.currentFrameId = 1;
        this.width = this.frames[0].width;
        this.height = this.frames[0].height;
        this.x = 0;
        this.y = 0;
        this.velocity = 0;
        this.timePerFrame = 100;
        this.timeSinceLastFrame = 0;
        this.reset();
    }
    

    flap = () => {
        this.velocity = -0.3;
    }

    update = (timeDelta: number) => {
        this.velocity += config.gravity * timeDelta;
        this.y += this.velocity * timeDelta;
        this.timeSinceLastFrame += timeDelta;
        while(this.timeSinceLastFrame > this.timePerFrame) {
            this.currentFrameId = (this.currentFrameId + 1)%this.frames.length;
            this.timeSinceLastFrame -= this.timePerFrame;
        }
    };

    #lookUp = (context: CanvasRenderingContext2D) => {
        const angle = Math.atan(-this.velocity / config.backgroundVelocity);
        const translX = this.x + this.width/2;
        const translY = this.y + this.height/2;
        context.translate(translX, translY);
        context.rotate(angle);
        context.translate(-translX, -translY);
    }

    #lookDown = (context: CanvasRenderingContext2D) => {
        const angle = Math.atan(-this.velocity / config.backgroundVelocity);
        const translX = this.x + this.width/2;
        const translY = this.y + this.height/2;
        context.translate(translX, translY);
        context.rotate(angle);
        context.translate(-translX, -translY);
    }

    draw = (context: CanvasRenderingContext2D) => {
        context.save();
        if(this.velocity < 0) this.#lookUp(context);
        else this.#lookDown(context);
        context.drawImage(this.frames[this.currentFrameId], this.x, this.y);
        context.restore();
    };

};
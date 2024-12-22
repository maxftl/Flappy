import { Background } from "./background";
import { Bird } from "./bird";
import { config } from "./config";
import { Drawable } from "./drawable";
import { getAudio } from "./get_audio";
import { PipeQueue } from "./pipe_queue";
import { PointsDisplay } from "./points_display";

export class GameScreen {

    #abortController: AbortController;
    #upPressed: boolean;

    pointImages: Array<HTMLImageElement> = [];
    pointsDisplay: PointsDisplay;
    background: Background;
    base: Background;
    bird: Bird;
    pipeQueue: PipeQueue;
    pointAudio: HTMLAudioElement;

    sprites: Array<Drawable>;

    context: CanvasRenderingContext2D;


    constructor(context: CanvasRenderingContext2D) {
        this.#abortController = new AbortController();
        this.#upPressed = false;

        // init sprites
        this.pointsDisplay = new PointsDisplay(10, 10);
        this.background = new Background("background-night.png", config.backgroundVelocity);
        this.base = new Background("base.png", config.pipeVelocity, config.canvasHeight - config.baseHeight);
        this.bird = new Bird();
        this.pipeQueue = new PipeQueue();
        this.pointAudio = getAudio("point.ogg");

        // order is important here
        this.sprites = [
            this.background,
            this.pipeQueue,
            this.base,
            this.bird,
            this.pointsDisplay,
        ]

        this.context = context;

        this.pointAudio.playbackRate = 1.5;

    }

    #registerEvents = () => {
        this.#abortController = new AbortController();
        window.addEventListener('keydown', () => {
            this.#upPressed = true;
        }, {
            signal: this.#abortController.signal
        });
    }

    #unregisterEvents = () => {
        this.#abortController.abort();
    }

    #updateSprites = (timeDelta: number) => {
        this.sprites.forEach((sprite: Drawable) => {
            sprite.update(timeDelta);
        });
    }

    #drawSprites = () => {
        this.sprites.forEach((sprite: Drawable) => {
            sprite.draw(this.context);
        });
    }

    #resetSprites = () => {
        this.sprites.forEach((sprite: Drawable) => {
            sprite.reset();
        });
    }

    show = async () => {
        this.#registerEvents();
        await this.#mainLoop();
        this.#unregisterEvents();
    };

    #mainLoop = async () => {
        await new Promise((resolve) => {
            this.#resetSprites();
            let isRunning = true;
            let lastUpdateTime = Date.now();
            const loop = () => {
                if (this.bird.y > config.canvasHeight - config.baseHeight - this.bird.height) {
                    isRunning = false;
                }
                if (this.pipeQueue.checkCollision(this.bird)) {
                    isRunning = false;
                }
                if (this.pipeQueue.checkMadePoint()) {
                    console.log(this.pointAudio);
                    this.pointAudio.play();
                    this.pointsDisplay.points += 1;
                }
                if (this.#upPressed) {
                    this.bird.flap();
                    this.#upPressed = false;
                }
                const now = Date.now();
                const timeDelta = now - lastUpdateTime;
                this.#updateSprites(timeDelta);
                this.#drawSprites();

                lastUpdateTime = now;
                if (isRunning) {
                    window.requestAnimationFrame(loop);
                }
                else {
                    resolve(0);
                }
            }
            loop();
        });
    }
};
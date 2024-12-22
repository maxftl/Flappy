import { Sprite } from "./sprite"
import { config } from "./config";
import { Drawable } from "./drawable";
import { getImage } from "./get_image";

export class Background implements Drawable {
    sprites: Array<Sprite>;
    velocity: number;

    constructor(imageFilename: string, velocity: number, y: number = 0) {
        const backgroundImage = getImage(imageFilename);
        this.sprites = [
            new Sprite(backgroundImage, 0, y), 
            new Sprite(backgroundImage, config.canvasWidth, y),
        ];
        this.velocity = velocity;
    }

    reset = () => {
        this.sprites[0].x = 0;
        this.sprites[1].x = config.canvasWidth;
    }

    update = (timeDelta: number) => {
        const displacement = timeDelta * this.velocity;
        for(const sprite of this.sprites) {
            sprite.x = sprite.x + displacement;
            if(sprite.x < -config.canvasWidth) {
                sprite.x += 2*config.canvasWidth;
            }
        }
    }

    draw = (context: CanvasRenderingContext2D) => {
        for(const sprite of this.sprites) {
            sprite.draw(context);
        }
    }
};
import { Drawable } from "./drawable";
import { getImage } from "./get_image";

export class PointsDisplay implements Drawable {

    x: number;
    y: number;
    numberWidth: number;
    pointImages: Array<HTMLImageElement>;
    #digits: Array<number>;
    #points: number;

    constructor(x: number, y: number) {
        this.pointImages = [];
        for(let i=0; i < 10; ++i) {
          this.pointImages.push(getImage(i.toString() + ".png"));
        }
        this.x = x;
        this.y = y;
        this.numberWidth = this.pointImages[0].width;
        this.#digits = [];
        this.#points = 0;
    }

    set points(p: number) {
        this.#points = p;
        this.#digits = [];
        while(p != 0) {
            this.#digits.push(p%10);
            p = Math.floor(p/10);
        }
        this.#digits.reverse();
    }

    get points() {
        return this.#points;
    }

    reset = () => {
        this.points = 0;
    };

    update = () => {

    }

    draw = (context: CanvasRenderingContext2D) => {
        let currentX = this.x;
        for(const digit of this.#digits) {
            context.drawImage(this.pointImages[digit], currentX, this.y);
            currentX += this.numberWidth;
        }
    }

};
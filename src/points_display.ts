import { Drawable } from "./drawable";

export class PointsDisplay implements Drawable {

    x: number;
    y: number;
    numberWidth: number;
    pointImages: Array<HTMLImageElement>;
    #digits: Array<number>;
    #points: number;

    constructor(pointImages: Array<HTMLImageElement>, x: number, y: number) {
        this.x = x;
        this.y = y;
        this.numberWidth = pointImages[0].width;
        this.pointImages = pointImages;
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
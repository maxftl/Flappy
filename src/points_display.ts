import { Drawable } from "./drawable";

export class PointsDisplay implements Drawable {

    points: number;
    x: number;
    y: number;
    numberWidth: number;
    pointImages: Array<HTMLImageElement>;

    constructor(pointImages: Array<HTMLImageElement>, x: number, y: number) {
        this.points = 0;
        this.x = x;
        this.y = y;
        this.numberWidth = pointImages[0].width;
        this.pointImages = pointImages;
    }

    reset = () => {
        this.points = 0;
    };

    draw = (context: CanvasRenderingContext2D) => {
        const digits: Array<number> = [];
        let p = this.points;
        while(p != 0) {
            digits.push(p%10);
            p = Math.floor(p/10);
        }
        digits.reverse();
        let currentX = this.x;
        for(const digit of digits) {
            context.drawImage(this.pointImages[digit], currentX, this.y);
            currentX += this.numberWidth;
        }
    }

};
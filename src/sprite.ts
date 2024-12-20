export class Sprite {
    image: HTMLImageElement;
    x: number;
    y: number;

    constructor(image: HTMLImageElement, x: number, y: number) {
        this.image = image;
        this.x = x;
        this.y = y;
    }

    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.image, this.x, this.y);
    }
};
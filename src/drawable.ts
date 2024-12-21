export interface Drawable {
    update: (timeDelta: number) => void;
    draw: (context: CanvasRenderingContext2D) => void;
};

export const config = {
    dimensions: {
        background: {width: 288, height: 512},
        bird: {width: 34, height: 24},
        pipe: {width: 52, height: 320},
        base: {width: 336, height: 112},
    },
    canvasWidth : 288,
    canvasHeight: 512,
    playAreaWidth: 288,
    playAreaHeight: 512 - 112, // area without base
    pipeOpeningWidth: 100,
    spriteDirectory: "flappy-bird-assets/sprites/",
    backgroundVelocity: -0.1,
    pipeVelocity: -0.2,
    gravity: 0.001,
};
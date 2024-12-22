
export const config = {
    dimensions: {
        background: { width: 288, height: 512 },
        bird: { width: 34, height: 24 },
        pipe: { width: 52, height: 320 },
        base: { width: 336, height: 112 },
    },
    canvasWidth: 288,
    canvasHeight: 512,
    playAreaWidth: 288,
    playAreaHeight: 512 - 112, // area without base
    baseHeight: 112,
    pipeOpeningWidth: 130,
    spriteDirectory: "flappy-bird-assets/sprites/",
    audioDirectory: "flappy-bird-assets/audio/",
    backgroundVelocity: -0.1,
    pipeVelocity: -0.2,
    gravity: 0.001,
    requiredImages: [
        "0.png",
        "1.png",
        "2.png",
        "3.png",
        "4.png",
        "5.png",
        "6.png",
        "7.png",
        "8.png",
        "9.png",
        "background-day.png",
        "background-night.png",
        "base.png",
        "bluebird-downflap.png",
        "bluebird-midflap.png",
        "bluebird-upflap.png",
        "gameover.png",
        "message.png",
        "pipe-green.png",
        "pipe-red.png",
        "redbird-downflap.png",
        "redbird-midflap.png",
        "redbird-upflap.png",
        "yellowbird-downflap.png",
        "yellowbird-midflap.png",
        "yellowbird-upflap.png",
    ],
    requiredAudios: [
        "point.ogg",
    ],
};
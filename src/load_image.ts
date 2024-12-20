import { config } from './config';

const loadedSprites = new Map<string, HTMLImageElement>();

export const loadImage = async (filename: string) => {
    const spriteInCache = loadedSprites.get(filename);
    if(spriteInCache)
        return spriteInCache;
    const image = new Image();
    image.src = config.spriteDirectory + filename;
    await new Promise( (resolve) => {
        image.addEventListener("load", resolve);
    });
    loadedSprites.set(filename, image);
    return image;
};
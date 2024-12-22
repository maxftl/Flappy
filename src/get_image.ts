import { config } from './config';

const loadedImages = new Map<string, HTMLImageElement>();

const loadImage = async (filename: string) => {
    const spriteInCache = loadedImages.get(filename);
    if(spriteInCache)
        return spriteInCache;
    const image = new Image();
    image.src = config.spriteDirectory + filename;
    await new Promise( (resolve) => {
        image.addEventListener("load", resolve);
    });
    loadedImages.set(filename, image);
    return image;
};

for(const filename of config.requiredImages) {
    await loadImage(filename);
}

export const getImage = (filename: string) => {
    const image = loadedImages.get(filename);
    if(!image) {
        throw new Error(`Could not find image ${filename}`);
    }
    return image;
}
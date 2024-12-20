import { config } from './config';

export const loadAudio = async (filename: string) => {
    const audio = new Audio(config.audioDirectory + filename);
    await new Promise( (resolve) => {
        audio.addEventListener("canplaythrough", resolve);
    });
    return audio;
};
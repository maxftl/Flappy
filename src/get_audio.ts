import { config } from './config';

const loadedAudios = new Map<string, HTMLAudioElement>();
let initialized = false;

const loadAudio = async (filename: string) => {
    const audio = new Audio(config.audioDirectory + filename);
    await new Promise((resolve) => {
        audio.addEventListener("canplaythrough", resolve);
    });
    loadedAudios.set(filename, audio);
};

export const initialize = async () => {
    for (const filename of config.requiredAudios) {
        await loadAudio(filename);
    }
    initialized = true;
}

export const getAudio = (filename: string) => {
    if(!initialized) {
        throw new Error('Initialize module first!');
    }
    const audio = loadedAudios.get(filename);
    if (!audio) {
        throw new Error(`Could not find audio ${filename}`);
    }
    return audio;
};
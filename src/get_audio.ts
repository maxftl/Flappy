import { config } from './config';

const loadedAudios = new Map<string, HTMLAudioElement>();

const loadAudio = async (filename: string) => {
    const audio = new Audio(config.audioDirectory + filename);
    await new Promise( (resolve) => {
        audio.addEventListener("canplaythrough", resolve);
    });
    loadedAudios.set(filename, audio);
};

for(const filename of config.requiredAudios) {
    await loadAudio(filename);
}

export const getAudio = (filename: string) => {
    const audio = loadedAudios.get(filename);
    if(!audio) {
        throw new Error(`Could not find audio ${filename}`);
    }
    return audio;
};
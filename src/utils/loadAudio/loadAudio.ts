type loadAudioReturn = {
    play: () => void;
    stop: () => void;
};

export function loadAudio(src: string): loadAudioReturn {
    const audio = new Audio(src);
    audio.preload = 'auto';
    audio.volume = .5;

    return {
        play() {
            audio.currentTime = 0;
            audio.play();
        },
        stop() {
            audio.pause();
            audio.currentTime = 0;
        }
    };
}

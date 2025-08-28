import {useRef} from 'react';

type UseSoundReturn = {
    play: () => void;
    stop: () => void;
};

export function useSound(src: string): UseSoundReturn {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    if (!audioRef.current) {
        audioRef.current = new Audio(src);
        audioRef.current.preload = 'auto';
        audioRef.current.volume = .5;
    }

    const play = () => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = 0;
        audioRef.current.play();
    };

    const stop = () => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    };

    return {play, stop};
}
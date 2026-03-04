import {useRef, useEffect} from 'react';

type UseSoundReturn = {
    play: () => void;
    stop: () => void;
};

export function useSound(src: string): UseSoundReturn {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current == null) {
            audioRef.current = new Audio(src);
            audioRef.current.preload = 'auto';
            audioRef.current.volume = 0.5;
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [src]);

    const play = () => {
        if (audioRef.current == null) return;
        audioRef.current.currentTime = 0;
        audioRef.current.play();
    };

    const stop = () => {
        if (audioRef.current == null) return;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    };

    return {play, stop};
}
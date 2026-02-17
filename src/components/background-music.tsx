import {useEffect, useRef} from "react";
import {MUSIC_PLAY_EVENT} from "@/lib/music-control";

type BackgroundMusicProps = {
    src: string;
    volume?: number;
};

export const BackgroundMusic = ({
    src,
    volume = 0.3,
}: BackgroundMusicProps) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const hasStartedRef = useRef(false);

    useEffect(() => {
        const audio = new Audio(src);
        audio.loop = true;
        audio.volume = volume;
        audio.preload = "auto";

        const tryPlay = () => {
            if (!hasStartedRef.current) {
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            hasStartedRef.current = true;
                        })
                        .catch((error) => {
                            console.warn("Audio play failed:", error);
                        });
                }
            }
        };

        const handleCanPlay = () => {
            if (hasStartedRef.current) {
                tryPlay();
            }
        };

        const handleError = (errorEvent: Event) => {
            const audioElement = errorEvent.target as HTMLAudioElement;
            const error = audioElement?.error;

            console.error("Error loading audio:", {
                src: audio.src,
                errorCode: error?.code,
                errorMessage: error?.message,
            });
        };

        const handleMusicPlayEvent = () => {
            if (audio.readyState >= 2) {
                tryPlay();
            } else {
                audio.addEventListener("canplaythrough", handleCanPlay, {once: true});
            }
        };

        audio.addEventListener("error", handleError);
        window.addEventListener(MUSIC_PLAY_EVENT, handleMusicPlayEvent);

        audioRef.current = audio;

        return () => {
            audio.removeEventListener("canplaythrough", handleCanPlay);
            audio.removeEventListener("error", handleError);
            window.removeEventListener(MUSIC_PLAY_EVENT, handleMusicPlayEvent);
            audio.pause();
            audio.currentTime = 0;
        };
    }, [src, volume]);

    return null;
};

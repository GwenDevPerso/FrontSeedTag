const MUSIC_PLAY_EVENT = "startBackgroundMusic";

export const triggerMusicPlay = () => {
    window.dispatchEvent(new CustomEvent(MUSIC_PLAY_EVENT));
};

export {MUSIC_PLAY_EVENT};

//
//  AudioPlayer.ts
//  app
//
//  Created by d-exclaimation on 3:08 PM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//

import React from 'react';


export const usePlayer = (url: string): [boolean, () => void] => {
    const [audio] = React.useState(new Audio(url));
    const [isPlaying, setPlaying] = React.useState(false);

    const toogleAudio = () => setPlaying(!isPlaying);

    React.useEffect(() => {
        isPlaying ? audio.play() : audio.pause();
    }, [isPlaying]);

    React.useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return [isPlaying, toogleAudio];
};

export const useAudio = (url: string): (() => void) => {
    return usePlayer(url)[1];
};

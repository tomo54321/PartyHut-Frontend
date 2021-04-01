import { useState } from "react";
import { BottomPlayerCurrentlyPlaying } from "./BottomPlayer/CurrentlyPlaying";
import { BottomPlayerDuration } from "./BottomPlayer/Duration";
import { BottomPlayerVolume } from "./BottomPlayer/Volume";

interface BottomPlayerProps {};

export const BottomPlayer: React.FC<BottomPlayerProps> = () => {
    
    const djUsername = "tomo54321";
    const currentSong = "YES - Fox Stevenson Remix [Monstercat Release]";
    const currentArtwork = "http://placehold.it/150x150";
    const currentTime = 78.43;
    const totalDuration = 180.4;
    const [currentVolume, setVolume] = useState(0);

    return (
        <div className="flex justify-between space-x-4 md:space-x-10 items-center bg-gray-800 border-t border-gray-700 py-4 px-3 h-20">
            <BottomPlayerCurrentlyPlaying 
                currentSong={currentSong}
                djUsername={djUsername}
                artwork={currentArtwork}
            />
            <BottomPlayerDuration 
                currentTime={currentTime}
                totalTime={totalDuration}
            />
            <BottomPlayerVolume 
                value={currentVolume}
                onChange={(vol: number) => setVolume(vol)}
            />
        </div>
    )

};
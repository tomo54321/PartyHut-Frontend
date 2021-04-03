import { useState } from "react";
import { BottomPlayerCurrentlyPlaying } from "./BottomPlayer/CurrentlyPlaying";
import { BottomPlayerDuration } from "./BottomPlayer/Duration";
import { BottomPlayerVolume } from "./BottomPlayer/Volume";
import { BottomPlayerReactionControl } from './BottomPlayer/ReactionControl';
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../redux/Store";
import { PlayerPlayingState } from "../redux/reducers/PlayerReducer";
import { setPlayerVolume } from "../redux/actions/PlayerActions";

interface BottomPlayerProps {};

export const BottomPlayer: React.FC<BottomPlayerProps> = () => {
    
    const player = useSelector((state: ApplicationState) => state.player);
    const dispatch = useDispatch();

    if(!player.playing){
        return null;
    }
    
    // const currentReaction = "love";
    const playingPlayer = (player as PlayerPlayingState);

    return (
        <div className="flex justify-between space-x-3 md:space-x-3 lg:space-x-5 xl:space-x-7 items-center bg-gray-800 border-t border-gray-700 py-4 px-3 h-20">
            <BottomPlayerCurrentlyPlaying 
                currentSong={playingPlayer.song.title}
                djUsername={playingPlayer.dj}
                artwork={playingPlayer.song.thumbnailUrl}
            />
            <BottomPlayerDuration 
                currentTime={playingPlayer.current_time}
                totalTime={playingPlayer.song.duration}
            />
            {/* <BottomPlayerReactionControl reaction={currentReaction} /> */}
            <BottomPlayerVolume 
                value={player.volume}
                onChange={(vol: number) => dispatch(setPlayerVolume(vol))}
            />
        </div>
    )

};
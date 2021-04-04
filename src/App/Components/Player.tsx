import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { setPlayerCurrentTime } from "../redux/actions/PlayerActions";
import { PlayerPlayingState } from "../redux/reducers/PlayerReducer";
import { ApplicationState } from "../redux/Store";
import { PlayerWrapper } from "./Players/PlayerWrapper";

interface PlayerProps { }
export const Player: React.FC<PlayerProps> = () => {
    const location = useLocation();
    const playerState = useSelector((state: ApplicationState) => state.player);
    const dispatch = useDispatch();

    const updatePlayerTime = useCallback((progress: any) => {
        if(playerState.playing){
            dispatch(setPlayerCurrentTime(progress.playedSeconds));
        }
    }, [playerState, dispatch]);
    
    const playingPlayerState = (playerState as PlayerPlayingState);
    
    return (
        <div 
            className={`absolute ${ location.pathname.startsWith("/room") ? "block" : "hidden"} w-full h-full top-0 pt-16 left-0`}
            style={{
                zIndex: -1
            }}
        >
            <div className="max-w-xl mx-auto">
                <PlayerWrapper
                    isPlaying={playerState.playing}
                    platform={playerState.playing ? playingPlayerState.song.platform : undefined}
                    platformId={playerState.playing ? playingPlayerState.song.platform_id : undefined}
                    songStartedAt={playerState.playing ? playingPlayerState.song_start_time : undefined}
                    onEnded={() => { }}
                    onDuration={updatePlayerTime}
                    volume={playerState.volume}
                />
            </div>
        </div>
    )
}
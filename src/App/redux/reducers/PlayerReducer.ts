import { Song } from "../../types/Song";
import { SET_PLAYING, STOP_PLAYING, UPDATE_CUR_TIME, UPDATE_VOLUME } from "../actions/PlayerActions";

export interface PlayerNotPlayingState {
    playing: boolean;
    volume: number;
}
export interface PlayerPlayingState extends PlayerNotPlayingState{
    song: Song;
    dj: string;
    current_time: number;
    song_start_time: number;
}

export const initialPlayerState: PlayerNotPlayingState = {
    playing: false,
    volume: 0
};

export const PlayerReducer = (
    state: PlayerNotPlayingState | PlayerPlayingState = initialPlayerState,
    { type, payload }: { type: string, payload: PlayerNotPlayingState | PlayerPlayingState | number }
): PlayerNotPlayingState | PlayerPlayingState => {
    switch(type){
        
        case SET_PLAYING:
            return payload as PlayerPlayingState;

        case STOP_PLAYING:
            return payload as PlayerNotPlayingState;

        case UPDATE_VOLUME:
            const oldState = {...state};
            oldState.volume = payload as number;
            return oldState;

        case UPDATE_CUR_TIME:
            const oldTimeState = {...state};
            if((oldTimeState as PlayerPlayingState).playing){
                (oldTimeState as PlayerPlayingState).current_time = payload as number;
            }
            return oldTimeState;

        default:
            return initialPlayerState;
    }
}
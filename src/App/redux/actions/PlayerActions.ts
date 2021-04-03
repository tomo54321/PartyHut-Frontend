import { PlayerNotPlayingState, PlayerPlayingState } from "../reducers/PlayerReducer";

export const SET_PLAYING = "player:setPlaying";
export const setPlayerPlaying = (state: PlayerPlayingState) => {
    return {
        type: SET_PLAYING,
        payload: state
    }
}

export const STOP_PLAYING = "player:stopPlaying";
export const setPlayerNotPlaying = (state: PlayerNotPlayingState) => {
    return {
        type: STOP_PLAYING,
        payload: state
    }
}

export const UPDATE_VOLUME = "player:updateVolume";
export const setPlayerVolume = (volume: number) => {
    return {
        type: UPDATE_VOLUME,
        payload: volume
    }
}

export const UPDATE_CUR_TIME = "player:updateCurrenTime";
export const setPlayerCurrentTime = (time: number) => {
    return {
        type: UPDATE_CUR_TIME,
        payload: time
    }
}
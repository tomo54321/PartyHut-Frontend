import { PlaylistState } from "../reducers/PlaylistReducer";

export const SET_PLAYLISTS = "playlist:setPlaylists";
export const setPlaylists = (state: PlaylistState) => {
    return {
        type: SET_PLAYLISTS,
        payload: state
    }
}

export const CLEAR_PLAYLISTS = "playlist:clearPlaylists";
export const clearPlaylists = () => {
    return {
        type: CLEAR_PLAYLISTS,
        payload: {
            playlists: [],
            updated_at: Date.now()
        } as PlaylistState
    }
}

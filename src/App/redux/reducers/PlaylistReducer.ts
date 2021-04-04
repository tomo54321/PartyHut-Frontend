import { SimplePlaylistResponse } from "../../types/api/PlaylistResponse";
import { CLEAR_PLAYLISTS, SET_PLAYLISTS } from "../actions/PlaylistActions";

export interface PlaylistState {
    playlists: SimplePlaylistResponse[];
    updated_at: number;
}
export const initialPlaylistState: PlaylistState = {
    playlists: [],
    updated_at: Date.now()
};

export const PlaylistReducer = (
    state: PlaylistState = initialPlaylistState,
    { type, payload }: { type: string, payload: PlaylistState }
): PlaylistState => {
    switch(type){
        case SET_PLAYLISTS:
            return {...state, ...payload};
        case CLEAR_PLAYLISTS:
            return payload;
        default:
            return state;
    }
}
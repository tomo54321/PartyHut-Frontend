import { combineReducers, createStore } from 'redux';
import { PlayerNotPlayingState, PlayerPlayingState, initialPlayerState, PlayerReducer } from './reducers/PlayerReducer';
import { initialPlaylistState, PlaylistReducer, PlaylistState } from './reducers/PlaylistReducer';
import { initialUserState, UserState, UserReducer } from './reducers/UserReducer';
export interface ApplicationState {
    player: PlayerNotPlayingState | PlayerPlayingState,
    user: UserState,
    playlist: PlaylistState
}

const initialState: ApplicationState = {
    player: initialPlayerState,
    user: initialUserState,
    playlist: initialPlaylistState
}
const allReducers = combineReducers({
    player: PlayerReducer,
    user: UserReducer,
    playlist: PlaylistReducer
});

export const ApplicationStore = createStore(allReducers, initialState);
import { combineReducers, createStore } from 'redux';
import { PlayerNotPlayingState, PlayerPlayingState, initialPlayerState, PlayerReducer } from './reducers/PlayerReducer';
import { initialPlaylistState, PlaylistReducer, PlaylistState } from './reducers/PlaylistReducer';
import { initialRoomState, RoomReducer, RoomState } from './reducers/RoomReducer';
import { initialUserState, UserState, UserReducer } from './reducers/UserReducer';
export interface ApplicationState {
    player: PlayerNotPlayingState | PlayerPlayingState,
    user: UserState,
    playlist: PlaylistState,
    room: RoomState
}

const initialState: ApplicationState = {
    player: initialPlayerState,
    user: initialUserState,
    playlist: initialPlaylistState,
    room: initialRoomState
}
const allReducers = combineReducers({
    player: PlayerReducer,
    user: UserReducer,
    playlist: PlaylistReducer,
    room: RoomReducer
});

export const ApplicationStore = createStore(allReducers, initialState);
import { combineReducers, createStore } from 'redux';
import { PlayerNotPlayingState, PlayerPlayingState, initialPlayerState, PlayerReducer } from './reducers/PlayerReducer';
import { initialUserState, UserState, UserReducer } from './reducers/UserReducer';
export interface ApplicationState {
    player: PlayerNotPlayingState | PlayerPlayingState,
    user: UserState
}

const initialState: ApplicationState = {
    player: initialPlayerState,
    user: initialUserState
}
const allReducers = combineReducers({
    player: PlayerReducer,
    user: UserReducer
});

export const ApplicationStore = createStore(allReducers, initialState);
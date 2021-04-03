import { combineReducers, createStore } from 'redux';
import { PlayerNotPlayingState, PlayerPlayingState, initialPlayerState, PlayerReducer } from './reducers/PlayerReducer';
export interface ApplicationState {
    player: PlayerNotPlayingState | PlayerPlayingState
}

const initialState: ApplicationState = {
    player: initialPlayerState
}
const allReducers = combineReducers({
    player: PlayerReducer
});

export const ApplicationStore = createStore(allReducers, initialState);
import { combineReducers, createStore } from "redux";
import { AuthFormReducer, AuthFormState } from "./Reducers/AuthFormReducer";
import { UserReducer, UserState } from "./Reducers/UserReducer";

export interface ApplicationState {
    authForm: AuthFormState,
	user: UserState,
}
const initialState: ApplicationState = {
	authForm: {
		shown: false
	},
	user: {
		logged_in: false
	}
};


const allReducers = combineReducers<any>({
	authForm: AuthFormReducer,
	user: UserReducer
});
export const ApplicationStore = createStore(allReducers, initialState as any);
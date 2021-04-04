import { LoginUserResponse } from "../../types/api/LoginUserResponse";
import { SET_LOGOUT, SET_USER_STATE } from "../actions/UserActions";

export interface UserState {
    logged_in: boolean;
    user?: LoginUserResponse
}
export const initialUserState: UserState = {
    logged_in: false
};

export const UserReducer = (
    state: UserState = initialUserState,
    { type, payload }: { type: string, payload: UserState }
): UserState => {
    switch(type){
        case SET_USER_STATE:
            return {...state, ...payload};
        case SET_LOGOUT:
            return payload;
        default:
            return initialUserState;
    }
}
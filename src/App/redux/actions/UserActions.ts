import { UserState } from "../reducers/UserReducer";

export const SET_USER_STATE = "user:setUserState";
export const setUserState = (state: UserState) => {
    return {
        type: SET_USER_STATE,
        payload: state
    }
}

export const SET_LOGOUT = "user:setLogout";
export const setLogout = () => {
    return {
        type: SET_USER_STATE,
        payload: {
            logged_in: false
        } as UserState
    }
}

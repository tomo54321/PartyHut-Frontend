import { APIUserResponse } from "../../Modules/API/d.types";
import { USER_LOGGEDIN, USER_LOGGEDOUT, USER_PROFILECHANGE } from "../Actions/UserActions";

export interface UserState {
    logged_in: boolean;
    id?: string;
    username?: string;
    createdAt?: Date;
}

export const UserReducer = (state: UserState, { type, payload }: { type: string, payload?: any }): UserState => {
    switch (type) {
        case USER_LOGGEDIN:
            return {
                logged_in: true,
                id: (payload! as APIUserResponse).id,
                username: (payload! as APIUserResponse).username,
                createdAt: (payload! as APIUserResponse).createdAt,
            };
        case USER_LOGGEDOUT:
            return {
                logged_in: false
            };
        case USER_PROFILECHANGE:
            const oldState = { ...(payload! as APIUserResponse), ...state };
            return oldState;
        default:
            return {
                logged_in: false
            };
    }
}
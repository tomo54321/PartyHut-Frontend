import { APIPlaylistListResponse, APIUserResponse } from "../../Modules/API/d.types";

export const USER_LOGGEDIN = "user:onLoggedIn";
export const userLoggedIn = (data: APIUserResponse, playlists?: APIPlaylistListResponse[]) => {
    return {
        type: USER_LOGGEDIN,
        payload: {
            user: data,
            playlists
        }
    }
}

export const USER_PROFILECHANGE = "user:onProfileChange";
export const userProfileChanged = (data: any) => {
    return {
        type: USER_PROFILECHANGE,
        payload: data
    }
}

export const USER_LOGGEDOUT = "user:onLoggedOut";
export const userLoggedOut = (data: APIUserResponse) => {
    return {
        type: USER_LOGGEDOUT
    }
}
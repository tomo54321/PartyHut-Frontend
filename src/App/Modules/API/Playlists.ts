import axios, { CancelTokenSource } from "axios";
import { API } from "../Axios";
import { APIErrorResponse, APIPlaylistListResponse, APIPlaylistResponse } from "./d.types";

export const fetchAllPlaylists = (
    cancel_token: CancelTokenSource
): Promise<APIPlaylistListResponse[]> => {
    return new Promise(async (resolve, reject) => {

        try{
            const { data } = await API.get('/playlist', {
                cancelToken: cancel_token.token
            });

            resolve(data.playlists);

        } catch (e) {
            if(axios.isCancel(e)){ return; }

            if(e.response){
                reject(e.response.data as APIErrorResponse);
            } else {
                reject({
                    errors: [{
                        param: "internet",
                        msg: "Failed to connect, please try again."
                    }]
                } as APIErrorResponse)
            }
        }

    });
}
export const fetchSinglePlaylist = (
    id: string,
    cancel_token: CancelTokenSource
): Promise<APIPlaylistResponse> => {
    return new Promise(async (resolve, reject) => {

        try{
            const { data } = await API.get('/playlist/' + id, {
                cancelToken: cancel_token.token
            });

            resolve(data.playlist);

        } catch (e) {
            if(axios.isCancel(e)){ return; }

            if(e.response){
                reject(e.response.data as APIErrorResponse);
            } else {
                reject({
                    errors: [{
                        param: "internet",
                        msg: "Failed to connect, please try again."
                    }]
                } as APIErrorResponse)
            }
        }

    });
}

export const createPlaylist = (
    title: string,
    cancel_token: CancelTokenSource
): Promise<APIPlaylistListResponse> => {
    return new Promise(async (resolve, reject) => {

        try{
            const { data } = await API.post('/playlist', {
                title
            }, {
                cancelToken: cancel_token.token
            });

            resolve(data.playlist);

        } catch (e) {
            if(axios.isCancel(e)){ return; }

            if(e.response){
                reject(e.response.data as APIErrorResponse);
            } else {
                reject({
                    errors: [{
                        param: "internet",
                        msg: "Failed to connect, please try again."
                    }]
                } as APIErrorResponse)
            }
        }

    });
}
export const updatePlaylist = (
    id: string,
    name: string,
    cancel_token: CancelTokenSource
): Promise<Boolean> => {
    return new Promise(async (resolve, reject) => {

        try{
            await API.put('/playlist/' + id, {
                title: name
            },{
                cancelToken: cancel_token.token
            });

            resolve(true);

        } catch (e) {
            if(axios.isCancel(e)){ return; }

            if(e.response){
                reject(e.response.data as APIErrorResponse);
            } else {
                reject({
                    errors: [{
                        param: "internet",
                        msg: "Failed to connect, please try again."
                    }]
                } as APIErrorResponse)
            }
        }

    });
}
export const deletePlaylist = (
    id: string,
    cancel_token: CancelTokenSource
): Promise<Boolean> => {
    return new Promise(async (resolve, reject) => {

        try{
            await API.delete('/playlist/' + id, {
                cancelToken: cancel_token.token
            });

            resolve(true);

        } catch (e) {
            if(axios.isCancel(e)){ return; }

            if(e.response){
                reject(e.response.data as APIErrorResponse);
            } else {
                reject({
                    errors: [{
                        param: "internet",
                        msg: "Failed to connect, please try again."
                    }]
                } as APIErrorResponse)
            }
        }

    });
}



export const addSong = (
    id: string,
    platform: "YouTube" | "SoundCloud",
    playlistId: string,
    cancel_token: CancelTokenSource
): Promise<Boolean> => {
    return new Promise(async (resolve, reject) => {

        try{
            await API.put('/playlist/' + playlistId + "/song/", {
                songId: id,
                platform
            }, {
                cancelToken: cancel_token.token
            });

            resolve(true);

        } catch (e) {
            if(axios.isCancel(e)){ return; }

            if(e.response){
                reject(e.response.data as APIErrorResponse);
            } else {
                reject({
                    errors: [{
                        param: "internet",
                        msg: "Failed to connect, please try again."
                    }]
                } as APIErrorResponse)
            }
        }

    });
}

export const deleteSong = (
    id: string,
    playlistId: string,
    cancel_token: CancelTokenSource
): Promise<Boolean> => {
    return new Promise(async (resolve, reject) => {

        try{
            await API.delete('/playlist/' + playlistId + "/song/" + id, {
                cancelToken: cancel_token.token
            });

            resolve(true);

        } catch (e) {
            if(axios.isCancel(e)){ return; }

            if(e.response){
                reject(e.response.data as APIErrorResponse);
            } else {
                reject({
                    errors: [{
                        param: "internet",
                        msg: "Failed to connect, please try again."
                    }]
                } as APIErrorResponse)
            }
        }

    });
}
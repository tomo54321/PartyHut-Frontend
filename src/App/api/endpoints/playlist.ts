import axios, { CancelToken } from "axios";
import { PartyHutAPI } from "../../types/api/ErrorResponse";
import { PlaylistResponse, SimplePlaylistResponse } from "../../types/api/PlaylistResponse";
import { api } from "../api";

export const all = (
    cancelToken: CancelToken
): Promise<SimplePlaylistResponse[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await api.get("/playlist", {
                cancelToken: cancelToken
            });
            resolve(data.playlists);
        } catch (e) {
            if(!axios.isCancel(e)){
                if(e.response) {
                    reject(e.response.data as PartyHutAPI.ErrorResponse);
                } else {
                    reject({
                        errors: [{
                            param: "local",
                            msg: "Failed to connect, please check your internet connection."
                        }]
                    } as PartyHutAPI.ErrorResponse)
                }
            }
        }
    });
};

export const get = (
    id: string,
    cancelToken: CancelToken
): Promise<PlaylistResponse> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await api.get("/playlist/" + id, {
                cancelToken: cancelToken
            });
            resolve(data.playlist);
        } catch (e) {
            if(!axios.isCancel(e)){
                if(e.response) {
                    reject(e.response.data as PartyHutAPI.ErrorResponse);
                } else {
                    reject({
                        errors: [{
                            param: "local",
                            msg: "Failed to connect, please check your internet connection."
                        }]
                    } as PartyHutAPI.ErrorResponse)
                }
            }
        }
    });
};

export const create = (
    name: string,
    cancelToken: CancelToken
): Promise<SimplePlaylistResponse> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await api.post("/playlist", 
            {
                name
            },{
                cancelToken: cancelToken
            });
            resolve(data.playlist);
        } catch (e) {
            if(!axios.isCancel(e)){
                if(e.response) {
                    reject(e.response.data as PartyHutAPI.ErrorResponse);
                } else {
                    reject({
                        errors: [{
                            param: "local",
                            msg: "Failed to connect, please check your internet connection."
                        }]
                    } as PartyHutAPI.ErrorResponse)
                }
            }
        }
    });
};

export const rename = (
    id: string,
    name: string,
    cancelToken: CancelToken
): Promise<{ name: string }> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await api.put("/playlist/" + id, 
            {
                name
            },{
                cancelToken: cancelToken
            });
            resolve(data.playlist);
        } catch (e) {
            if(!axios.isCancel(e)){
                if(e.response) {
                    reject(e.response.data as PartyHutAPI.ErrorResponse);
                } else {
                    reject({
                        errors: [{
                            param: "local",
                            msg: "Failed to connect, please check your internet connection."
                        }]
                    } as PartyHutAPI.ErrorResponse)
                }
            }
        }
    });
};

export const remove = (
    id: string,
    cancelToken: CancelToken
): Promise<Boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            await api.delete("/playlist/" + id, {
                cancelToken: cancelToken
            });
            resolve(true);
        } catch (e) {
            if(!axios.isCancel(e)){
                if(e.response) {
                    reject(e.response.data as PartyHutAPI.ErrorResponse);
                } else {
                    reject({
                        errors: [{
                            param: "local",
                            msg: "Failed to connect, please check your internet connection."
                        }]
                    } as PartyHutAPI.ErrorResponse)
                }
            }
        }
    });
};

export const addSong = (
    playlistId: string,
    songId: string,
    platform: "YouTube" | "SoundCloud",
    cancelToken: CancelToken
): Promise<Boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            await api.put(`/playlist/${playlistId}/song`, 
            {
                songId,
                platform
            },{
                cancelToken: cancelToken
            });
            resolve(true);
        } catch (e) {
            if(!axios.isCancel(e)){
                if(e.response) {
                    reject(e.response.data as PartyHutAPI.ErrorResponse);
                } else {
                    reject({
                        errors: [{
                            param: "local",
                            msg: "Failed to connect, please check your internet connection."
                        }]
                    } as PartyHutAPI.ErrorResponse)
                }
            }
        }
    });
};
export const removeSong = (
    playlistId: string,
    songId: string,
    cancelToken: CancelToken
): Promise<Boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            await api.delete(`/playlist/${playlistId}/song/${songId}`, 
            {
                cancelToken: cancelToken
            });
            resolve(true);
        } catch (e) {
            if(!axios.isCancel(e)){
                if(e.response) {
                    reject(e.response.data as PartyHutAPI.ErrorResponse);
                } else {
                    reject({
                        errors: [{
                            param: "local",
                            msg: "Failed to connect, please check your internet connection."
                        }]
                    } as PartyHutAPI.ErrorResponse)
                }
            }
        }
    });
};
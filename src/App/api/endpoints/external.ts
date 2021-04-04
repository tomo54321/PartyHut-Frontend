import axios, { CancelToken } from "axios";
import { PartyHutAPI } from "../../types/api/ErrorResponse";
import { Song } from "../../types/Song";

import { api, SoundCloudAPI } from "../api";

export const searchYouTube = (
    query: string, 
    cancelToken: CancelToken, 
): Promise<Song[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await api.get("/external/youtube/search", {
                params: {
                    query
                },
                cancelToken: cancelToken
            });
            resolve(data.songs);
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

export const searchSoundCloud = (
    query: string, 
    cancelToken: CancelToken, 
): Promise<Song[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await SoundCloudAPI.get("/tracks", {
                params: {
                    q: query
                },
                cancelToken: cancelToken
            });

            let collection = data;
            if(data.next_href !== undefined){
                collection = data.collection;
            }

            const songs = collection.map((song: any) => ({
                id: song.id.toString(),
                title: song.title,
                artist: song.user.username,
                artwork: song.artwork_url,
                platform: "SoundCloud",
                platform_id: song.id.toString(),
                duration: song.duration / 1000,
                platform_url: song.permalink_url
            } as Song));

            resolve(songs);
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
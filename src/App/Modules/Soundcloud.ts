import axios, { CancelTokenSource } from "axios";
import { SoundCloudSearchAPIResponse } from "../@types/Soundcloud";
import { APIErrorResponse } from "./API/d.types";
import { SoundCloudAPI } from "./Axios";

export const searchSoundCloud = (
    query: string, 
    cancel_token: CancelTokenSource
): Promise<SoundCloudSearchAPIResponse> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await SoundCloudAPI.get('/tracks', {
                params: {
                    q: query
                },
                cancelToken: cancel_token.token
            });

            if(data.next_href === undefined){
                resolve({
                    collection: data,
                    next_href: ""
                })
            } else {
                resolve(data);
            }


        } catch (e) {
            if (axios.isCancel(e)) { return; }
            if (e.response) {
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
};
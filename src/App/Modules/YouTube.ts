import axios, { CancelTokenSource } from "axios";
import { APIErrorResponse, APISong } from "./API/d.types";
import { API } from "./Axios";

export const searchYouTube = (
    query: string,
    cancel_token: CancelTokenSource
): Promise<APISong[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await API.get('/external/youtube/search', {
                params: {
                    query
                },
                cancelToken: cancel_token.token
            });

            resolve(data.songs);

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
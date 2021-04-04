import axios, { CancelToken } from "axios";
import { SimpleRoomResponse } from "../../types/api/SimpleRoomResponse";
import { PartyHutAPI } from "../../types/api/ErrorResponse";
import { RoomResponse } from "../../types/api/RoomResponse";
import { api } from "../api";

export const get = (
    category: string, 
    cancelToken: CancelToken, 
    query?: string
): Promise<RoomResponse[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await api.get("/room", {
                params: {
                    category,
                    query
                },
                cancelToken: cancelToken
            });
            resolve(data.rooms);
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
    cancelToken: CancelToken, 
): Promise<SimpleRoomResponse> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await api.post("/room", {
                name
            }, {
                cancelToken
            })
            resolve(data.room);
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
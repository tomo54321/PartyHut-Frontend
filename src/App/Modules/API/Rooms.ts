import axios, { CancelTokenSource } from "axios";
import { API } from "../Axios";
import { APIErrorResponse, APIBasicRoomResponse, APIRoomLayoutResponse } from "./d.types";

export const getRooms = (
    cancel_token: CancelTokenSource
): Promise<APIRoomLayoutResponse[]> => {
    return new Promise(async (resolve, reject) => {

        try{
            const { data } = await API.get("/room");

            resolve(data.layout);

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

export const createRoom = (
    name: string,
    cancel_token: CancelTokenSource
): Promise<APIBasicRoomResponse> => {
    return new Promise(async (resolve, reject) => {

        try{
            const { data } = await API.post('/room', {
                name
            }, {
                cancelToken: cancel_token.token
            });

            resolve(data.room);

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
import axios, { CancelToken } from "axios";
import { AccountResponse } from "../../types/api/AccountResponse";
import { PartyHutAPI } from "../../types/api/ErrorResponse";
import { api } from "../api";

export const get = (
    cancelToken: CancelToken
): Promise<AccountResponse> => {
    return new Promise(async (resolve, reject) => {
        try {

            const { data } = await api.get("/account", { cancelToken: cancelToken });

            resolve(data.user);
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

export const update = (
    username: string,
    email: string,
    cancelToken: CancelToken
): Promise<AccountResponse> => {
    return new Promise(async (resolve, reject) => {
        try {

            const { data } = await api.put("/account", {
                username,
                email
            }, { cancelToken: cancelToken });

            resolve(data.user);
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
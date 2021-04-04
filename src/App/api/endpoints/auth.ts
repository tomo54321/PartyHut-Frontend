import axios, { CancelToken } from "axios";
import { PartyHutAPI } from "../../types/api/ErrorResponse";
import { LoginUserResponse } from "../../types/api/LoginUserResponse";
import { api } from "../api";

export const signup = (
    username: string,
    email: string,
    password: string,
    cancelToken: CancelToken
): Promise<Boolean> => {
    return new Promise(async (resolve, reject) => {
        try {

            const { data } = await api.post("/auth/signup", {
                username,
                email,
                password
            }, { cancelToken: cancelToken });

            resolve(data.ok);
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

export const login = (
    email: string,
    password: string,
    cancelToken: CancelToken
): Promise<LoginUserResponse> => {
    return new Promise(async (resolve, reject) => {
        try {

            const { data } = await api.post("/auth/login", {
                email,
                password
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
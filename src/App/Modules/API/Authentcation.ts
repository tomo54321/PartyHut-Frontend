import axios, { CancelTokenSource } from "axios";
import { API } from "../Axios";
import { APIErrorResponse } from "./d.types";

export const onSignUp = (
    username: string,
    email: string,
    password: string,
    confirm_password: string,
    cancel_token: CancelTokenSource
): Promise<Boolean | APIErrorResponse> => {
    return new Promise(async (resolve, reject) => {

        try{
            await API.post('/auth/signup', {
                username,
                email,
                password,
                confirm_password
            }, {
                cancelToken: cancel_token.token
            });

            resolve(true);

        } catch (e) {
            if(e.response && !axios.isCancel(e)){
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

export const onLogin = (
    email: string,
    password: string,
    cancel_token: CancelTokenSource
): Promise<Boolean | APIErrorResponse> => {
    return new Promise(async (resolve, reject) => {

        try{
            await API.post('/auth/login', {
                email,
                password,
            }, {
                cancelToken: cancel_token.token
            });

            resolve(true);

        } catch (e) {
            if(e.response && !axios.isCancel(e)){
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

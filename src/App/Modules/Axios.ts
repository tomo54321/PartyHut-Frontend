import axios from "axios";

export const API = axios.create({
    baseURL: "http://192.168.68.134:4000",
    withCredentials: true
})